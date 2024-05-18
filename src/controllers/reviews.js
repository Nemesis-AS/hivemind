const { Client, DatabaseAPI, PrivateKey } = require("@hiveio/dhive");
const { BroadcastAPI } = require("@hiveio/dhive/lib/helpers/broadcast");
const client = new Client("https://api.hive.blog", {
    // chainId: "18dcf0a285365fc58b71f18b3d3fec954aa0c141c44e4e5cb4cf777b9eab274e"
});

const Review = require("../models/reviews");

async function fetchReviews(req, res) {
    const reviews = await Review.find();

    res.json(reviews);
}

async function addReview(req, res) {
    const { devID, jobID, title, review } = req.body;

    if (!(devID && jobID && title && review)) {
        res.status(400).send("Malformed parameters!");
        return;
    }

    const timestamp = Date.now();

    const broadcaster = new BroadcastAPI(client);
    const pvtKey = PrivateKey.from(process.env.POSTING_KEY);

    const confirmation = await broadcaster.json(
        {
            required_auths: [],
            required_posting_auths: ["nemesisas"],
            id: "testapp",
            json: JSON.stringify({
                dev_id: devID,
                job_id: jobID,
                title,
                review,
                created_at: timestamp,
            }),
        },
        pvtKey
    );

    console.log(confirmation);
    await Review.create({
        id: confirmation.id,
        dev_id: devID,
        job_id: jobID,
        title,
        review,
        created_at: timestamp,
    });
    res.json(confirmation);
}

module.exports = {
    fetchReviews,
    addReview,
};

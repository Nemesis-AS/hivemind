const Review = require("../models/reviews");
const { broadcastJSON } = require("../utils/hive");

async function fetchReviewsByProfile(req, res) {
    const { devID } = req.query;

    if (!devID) {
        res.status(400).send("Malformed Parameters");
        return;
    }

    const reviews = await Review.find().where({ dev_id: devID });

    res.json(reviews);
}

async function addReview(req, res) {
    const { devID, jobID, title, review } = req.body;

    if (!(devID && jobID && title && review)) {
        res.status(400).send("Malformed parameters!");
        return;
    }

    const timestamp = Date.now();

    const json = {
        dev_id: devID,
        job_id: jobID,
        title,
        review,
        created_at: timestamp,
    };

    const confirmation = await broadcastJSON(json);

    await Review.create({
        id: confirmation.id,
        ...json
    });
    res.json({
        id: confirmation.id,
        ...json
    });
}

module.exports = {
    fetchReviewsByProfile,
    addReview,
};

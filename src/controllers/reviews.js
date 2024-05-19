const Review = require("../models/reviews");
const { broadcastJSON } = require("../utils/hive");

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
    fetchReviews,
    addReview,
};

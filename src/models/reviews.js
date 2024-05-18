const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    id: String,
    dev_id: String,
    job_id: String,
    title: String,
    review: String,
    created_at: Date,
});

const Review = new mongoose.model("Reviews", reviewSchema);

module.exports = Review;

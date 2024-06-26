const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
    id: String,
    job_id: String,
    customer_id: String,
    created_at: Date,
    status: { type: String, enum: ["Pending", "Approved", "Rejected"] },
});

const Offer = new mongoose.model("Offers", offerSchema);

module.exports = Offer;
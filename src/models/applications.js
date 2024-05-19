const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    id: String,
    job_id: String,
    dev_id: String,
    created_at: Date,
    status: { type: String, enum: ["Pending", "Approved", "Rejected"] },
});

const Application = new mongoose.model("Applications", applicationSchema);

module.exports = Application;

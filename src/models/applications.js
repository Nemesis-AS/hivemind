const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    id: String,
    job_id: String,
    dev_id: String,
    created_at: Date
});

const Application = new mongoose.model("Applications", applicationSchema);

module.exports = Application;
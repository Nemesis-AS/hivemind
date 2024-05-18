const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    id: String,
    job_creator: String,
    salary: Number,
    location: String,
    title: String,
    description: String,
    openings: Number,
    skills: Array,
    job_type: String,
    created_at: Date,
});

const Job = new mongoose.model("Jobs", jobSchema);

module.exports = Job;

const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema({
    id: String,
    username: String,
    about: String,
    profile_image: String,
    posting_key: String,
    skills: Array,
    created_at: Date
});

const Developer = new mongoose.model("Developers", developerSchema);

module.exports = Developer;
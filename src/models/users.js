const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: String,
    username: String,
    profile_image: String,
    posting_key: String,
    created_at: Date
});

const User = new mongoose.model("Users", userSchema);

module.exports = User;
const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema({
    id: String,
    gig_creator: String,
    price: Number,
    title: String,
    description: String,
    skills: Array,
    created_at: Date,
});

const Gig = new mongoose.model("Gig", gigSchema);

module.exports = Gig;

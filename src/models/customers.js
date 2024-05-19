const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    id: String,
    username: String,
    profile_image: String,
    about: String,
    posting_key: String,
    created_at: Date
});

const Customer = new mongoose.model("Customers", customerSchema);

module.exports = Customer;
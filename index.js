require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const PORT = 3000;

const { getJobListings, addJobListing } = require("./src/controllers/jobs");
const { getGigs, addGig } = require("./src/controllers/gigs");
const { fetchReviews, addReview } = require("./src/controllers/reviews");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/jobs", getJobListings);
app.post("/jobs", addJobListing);

app.get("/gigs", getGigs);
app.post("/gigs", addGig);

app.get("/reviews", fetchReviews);
app.post("/reviews", addReview);

app.listen(PORT, async () => {
    console.log("Running on PORT " + PORT);
    await mongoose.connect("mongodb://127.0.0.1:27017/hivemind");
    console.log("Connected with DB");
});

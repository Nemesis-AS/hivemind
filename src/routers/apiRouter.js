const express = require("express");
const router = express.Router();

const { getJobListings, addJobListing } = require("../controllers/jobs");
const { getGigs, addGig } = require("../controllers/gigs");
const { fetchReviews, addReview } = require("../controllers/reviews");
const { getOffersForJob, createOffer } = require("../controllers/offers");
const { getApplicationsForJob, createApplication } = require("../controllers/applications");

router.get("/jobs", getJobListings);
router.post("/jobs", addJobListing);

router.get("/gigs", getGigs);
router.post("/gigs", addGig);

router.get("/reviews", fetchReviews);
router.post("/reviews", addReview);

router.get("/applications", getApplicationsForJob);
router.post("/applications", createApplication);

router.get("/offers", getOffersForJob);
router.post("/offers", createOffer);

module.exports = router;
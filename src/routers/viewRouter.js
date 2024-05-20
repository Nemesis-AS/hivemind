const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile("./src/views/index.html", { root: "." });
});

router.get("/gigs/create", (req, res) => {
    res.sendFile("./src/views/createGig.html", { root: "." });
});

router.get("/jobs/create", (req, res) => {
    res.sendFile("./src/views/createJob.html", { root: "." });
});

router.get("/jobs", (req, res) => {
    res.sendFile("./src/views/jobs.html", { root: "." });
});

router.get("/gigs", (req, res) => {
    res.sendFile("./src/views/gigs.html", { root: "." });
});

router.get("/profile", (req, res) => {
    res.sendFile("./src/views/profile.html", { root: "." });
});


module.exports = router;

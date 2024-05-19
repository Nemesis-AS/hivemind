const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile("./src/views/jobs.html", { root: "." });
});

router.get("/gigs", (req, res) => {
    res.sendFile("./src/views/gigs.html", { root: "." });
});

module.exports = router;
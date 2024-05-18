const { Client, DatabaseAPI, PrivateKey } = require("@hiveio/dhive");
const { BroadcastAPI } = require("@hiveio/dhive/lib/helpers/broadcast");
const client = new Client("https://api.hive.blog", {
    // chainId: "18dcf0a285365fc58b71f18b3d3fec954aa0c141c44e4e5cb4cf777b9eab274e"
});

const Job = require("../models/jobs");

async function getJobListings(req, res) {
    const jobs = await Job.find();

    res.json(jobs);
}

async function addJobListing(req, res) {
    const {
        creator,
        salary,
        location,
        title,
        description,
        openings,
        skills,
        jobType,
    } = req.body;

    if (
        !(
            creator &&
            salary &&
            location &&
            title &&
            description &&
            openings &&
            skills &&
            jobType
        )
    ) {
        res.status(400).send("Malformed parameters!");
        return;
    }

    const timestamp = Date.now();

    const broadcaster = new BroadcastAPI(client);
    const pvtKey = PrivateKey.from(process.env.POSTING_KEY);

    const confirmation = await broadcaster.json(
        {
            required_auths: [],
            required_posting_auths: ["nemesisas"],
            id: "testapp",
            json: JSON.stringify({
                job_creator: creator,
                salary,
                location,
                title,
                description,
                openings,
                skills,
                job_type: jobType,
                created_at: timestamp,
            }),
        },
        pvtKey
    );

    console.log(confirmation);
    await Job.create({
        id: confirmation.id,
        job_creator: creator,
        salary,
        location,
        title,
        description,
        openings,
        skills,
        job_type: jobType,
        created_at: timestamp,
    });
    res.json(confirmation);
}

module.exports = {
    getJobListings,
    addJobListing,
};

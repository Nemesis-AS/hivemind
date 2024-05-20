const Job = require("../models/jobs");
const Customer = require("../models/customers");
const { broadcastJSON } = require("../utils/hive");

async function getJobListings(req, res) {
    const { position } = req.query;

    let queryObj = {};
    if (position) {
        queryObj.skills = position;
    }

    const jobs = await Job.find().where(queryObj);

    const data = await Promise.all(
        jobs.map(async (job) => {
            const creator = await Customer.findOne().where({
                id: job.job_creator,
            });

            return {
                job,
                creator,
            };
        })
    );

    res.json(data);
}

async function getJobByID(req, res) {
    const { id } = req.params;

    if (!id) {
        res.status(400).send("Malformed Parameters");
        return;
    }

    const job = await Job.findOne().where({ id });
    const creator = await Customer.findOne().where({ id: job.job_creator });

    res.json({ job, creator });
}

async function searchJobByTitle(req, res) {
    // @todo!
    const { search } = req.query;

    if (!search) {
        res.status(400).send("Malformed Parameters");
        return;
    }

    const jobs = await Job.find().where({ title: { $regex: search } });

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

    const json = {
        job_creator: creator,
        salary,
        location,
        title,
        description,
        openings,
        skills,
        job_type: jobType,
        created_at: timestamp,
    };

    // const confirmation = await broadcastJSON(json);

    await Job.create({
        // id: confirmation.id,
        ...json,
    });
    res.json({
        // id: confirmation.id,
        ...json,
    });
}

module.exports = {
    getJobListings,
    addJobListing,
    getJobByID,
    searchJobByTitle,
};

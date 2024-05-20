const Application = require("../models/applications");
const { broadcastJSON } = require("../utils/hive");

async function getApplicationsForJob(req, res) {
    const { jobID } = req.params;
    console.log(jobID);

    if (!jobID) {
        res.status(400).send("Malformed Parameters!");
        return;
    }

    const applications = await Application.find().where({ job_id: jobID });
    console.log(applications);
    res.json(applications);
}

async function getApplicationsByUser(req, res) {
    const { id } = req.params;

    if (!id) {
        res.status(400).send("Malformed Parameters!");
        return;
    }

    const applications = await Application.find().where({ dev_id: id });
    res.json(applications);
}

async function createApplication(req, res) {
    const { jobID, devID } = req.body;

    if (!(jobID && devID)) {
        res.status(400).send("Malformed Parameters!");
        return;
    }

    const timestamp = Date.now();

    const json = {
        dev_id: devID,
        job_id: jobID,
        created_at: timestamp,
    };

    const confirmation = await broadcastJSON(json);

    await Application.create({
        id: confirmation.id,
        ...json,
    });

    res.json({
        id: confirmation.id,
        ...json,
    });
}

module.exports = {
    getApplicationsForJob,
    createApplication,
    getApplicationsByUser,
};

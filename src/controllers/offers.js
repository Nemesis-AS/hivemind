const Offer = require("../models/offers");
const { broadcastJSON } = require("../utils/hive");

async function getOffersForJob(req, res) {
    const { jobID } = req.query;

    if (!jobID) {
        res.status(400).send("Malformed Parameters!");
        return;
    }

    const offers = await Offer.find().where({ job_id: jobID });
    res.json(offers);
}

async function createOffer(req, res) {
    const { jobID, customerID } = req.body;

    if (!(jobID && customerID)) {
        res.status(400).send("Malformed Parameters!");
        return;
    }

    const timestamp = new Date.now();

    const json = {
        customer_id: customerID,
        job_id: jobID,
        created_at: timestamp,
    };

    const confirmation = await broadcastJSON(json);

    await Offer.create({
        id: confirmation.id,
        ...json,
    });

    res.json({
        id: confirmation.id,
        ...json,
    });
}

module.exports = {
    getOffersForJob,
    createOffer,
};

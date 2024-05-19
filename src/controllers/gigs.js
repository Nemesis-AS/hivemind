const Gig = require("../models/gigs");
const { broadcastJSON } = require("../utils/hive");

async function getGigs(req, res) {
    const gigs = await Gig.find();
    
    res.json(gigs);
}

async function addGig(req, res) {
    const { devID, price, title, description, skills } = req.body;

    if (!(devID && price && title && description && skills)) {
        res.status(400).send("Malformed parameters!");
        return;
    }

    const timestamp = Date.now();

    const json = {
        gig_creator: devID,
        price,
        title,
        description,
        skills,
        created_at: timestamp,
    };

    const confirmation = await broadcastJSON(json);

    await Gig.create({
        id: confirmation.id,
        ...json
    });
    res.json({
        id: confirmation.id,
        ...json
    });
}

module.exports = {
    getGigs,
    addGig,
};

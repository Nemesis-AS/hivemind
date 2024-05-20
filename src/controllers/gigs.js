const Gig = require("../models/gigs");
const Customer = require("../models/customers");
const { broadcastJSON } = require("../utils/hive");

async function getGigs(req, res) {
    const gigs = await Gig.find();

    const data = await Promise.all(
        gigs.map(async (gig) => {
            const creator = await Customer.findOne().where({
                id: gig.gig_creator,
            });

            return {
                gig,
                creator,
            };
        })
    );

    res.json(data);
}

async function getGigByID(req, res) {
    const { id } = req.params;

    if (!id) {
        res.status(400).send("Malformed Parameters");
        return;
    }

    const gig = await Gig.findOne().where({ id });
    const creator = await Customer.findOne().where({ id: gig.gig_creator });

    res.json({ gig, creator });
}

async function addGig(req, res) {
    const { devID, price, title, description, skills } = req.body;
    // console.log(devID, price, title, description, skills);

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
        ...json,
    });
    res.json({
        id: confirmation.id,
        ...json,
    });
}

module.exports = {
    getGigs,
    addGig,
    getGigByID,
};

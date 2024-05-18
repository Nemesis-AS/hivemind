const { Client, DatabaseAPI, PrivateKey } = require("@hiveio/dhive");
const { BroadcastAPI } = require("@hiveio/dhive/lib/helpers/broadcast");
const client = new Client("https://api.hive.blog", {
    // chainId: "18dcf0a285365fc58b71f18b3d3fec954aa0c141c44e4e5cb4cf777b9eab274e"
});

const Gig = require("../models/gigs");

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

    const broadcaster = new BroadcastAPI(client);
    const pvtKey = PrivateKey.from(process.env.POSTING_KEY);

    const confirmation = await broadcaster.json(
        {
            required_auths: [],
            required_posting_auths: ["nemesisas"],
            id: "testapp",
            json: JSON.stringify({
                gig_creator: devID,
                price,
                title,
                description,
                skills,
                created_at: timestamp,
            }),
        },
        pvtKey
    );

    console.log(confirmation);
    await Gig.create({
        id: confirmation.id,
        gig_creator: devID,
        price,
        title,
        description,
        skills,
        created_at: timestamp,
    });
    res.json(confirmation);
}

module.exports = {
    getGigs,
    addGig,
};

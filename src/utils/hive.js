const { Client, PrivateKey } = require("@hiveio/dhive");
const { BroadcastAPI } = require("@hiveio/dhive/lib/helpers/broadcast");

const client = new Client("https://api.hive.blog", {
    // chainId: "18dcf0a285365fc58b71f18b3d3fec954aa0c141c44e4e5cb4cf777b9eab274e"
});

async function broadcastJSON(json) {
    const broadcaster = new BroadcastAPI(client);
    const pvtKey = PrivateKey.from(process.env.POSTING_KEY);

    const confirmation = await broadcaster.json(
        {
            required_auths: [],
            required_posting_auths: ["nemesisas"],
            id: "testapp",
            json: JSON.stringify(json),
        },
        pvtKey
    );

    return confirmation;
}

module.exports = {
    broadcastJSON,
};

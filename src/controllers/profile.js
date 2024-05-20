const Developer = require("../models/developers");

async function getDeveloperByID(req, res) {
    const { id } = req.params;

    if (!id) {
        res.status(400).send("Malformed Paramters");
        return;
    }

    const dev = await Developer.findOne().where({ id });

    res.json(dev);
}

module.exports = {
    getDeveloperByID,
};

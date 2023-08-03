const playersRouter = require("express").Router();
const config = require("../utils/config");
const { default: mongoose } = require("mongoose");
const { Player } = require("../models/Player");

playersRouter.get("/", async (request, response) => {
    const players = await Player.find({});
    response.json(players);
});

playersRouter.get("/:id", async (request, response) => {
    const { id } = request.params;
    if(mongoose.isValidObjectId(id)) {
        const player = await Player.findById(id);
        response.json(player);
    } else {
        response.status(400).send({error: "invalid UID"})
    }
});

playersRouter.post("/", async (request, response) => {
    const { givenName, tag } = request.body;

    if(!givenName) {
        response.status(400).send({error: "givenName is required"});
    } else if(!tag) {
        response.status(400).send({error: "tag is required"});
    } else {
        const newPlayer = new Player({
            givenName,
            tag
        })
        const savedPlayer = await newPlayer.save();
        response.status(201).json(savedPlayer);
        config.MMRCache.flushAll();
    }
});

playersRouter.delete("/:id", async (request, response) => {
    await Player.findByIdAndRemove(request.params.id);
    reponse.status(204).end();
})

module.exports = playersRouter;
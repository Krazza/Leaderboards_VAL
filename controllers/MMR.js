const MMRRouter = require("express").Router();
const HenrikValorantAPI = require("unofficial-valorant-api")
const config = require("../utils/config")

MMRRouter.get("/", async (request, response) => {
    //DO NEXT
})

MMRRouter.get("/:name/:tag", async (request, response) => {
    const { name, tag } = request.params;
    name.replace(" ", "%20");
    const version = "v2"
    const region = config.REGION;
    const VAPI = new HenrikValorantAPI();
    const playerData = await VAPI.getMMR({ version, region, name, tag });
    response.status(200).json(playerData);
});

module.exports = MMRRouter;
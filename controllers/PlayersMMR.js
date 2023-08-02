const playersMMRRouter = require("express").Router();
const HenrikValorantAPI = require("unofficial-valorant-api")

playersMMRRouter.get("/", async (request, response) => {

});

playersMMRRouter.get("/:name/:tag", async (request, response) => {
    const { name, tag } = request.params;
    const version = "v2"
    const region = "eu" // extract to a .env file
    const VAPI = new HenrikValorantAPI();
    const playerData = await VAPI.getMMR({ version, region, name, tag });
    response.status(200).json(playerData);
});

playersMMRRouter.post("/", async (request, response) => {
    
})

module.exports = playersMMRRouter;
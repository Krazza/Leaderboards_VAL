const MMRRouter = require("express").Router();
const HenrikValorantAPI = require("unofficial-valorant-api")
const config = require("../utils/config");
const { Player } = require("../models/Player");

MMRRouter.get("/", async (request, response) => {
    if(config.MMRCache.has("playersData")) {
        response.status(200).json(config.MMRCache.get("playersData"));
    } else {
        const playersMMRData = [];
        const version = "v2";
        const region = config.REGION;
        const players = await Player.find({});

        for(const player of players) {
            const { givenName, tag } = player;
            givenName.replace(" ", "%20");
            const VAPI = new HenrikValorantAPI();
            const playerData = await VAPI.getMMR({ version, region, name : givenName, tag});

            playersMMRData.push({
                givenName : playerData.data.name,
                tag : playerData.data.tag,
                MMRData : {
                    currentTier : playerData.data.current_data.currenttier,
                    currentTierPatched : playerData.data.current_data.currenttierpatched,
                    elo : playerData.data.current_data.elo,
                    images : playerData.data.current_data.images,
                    highestRank : {
                        tier : playerData.data.highest_rank.tier,
                        patchedTier : playerData.data.highest_rank.patched_tier,
                        season : playerData.data.highest_rank.season
                    },
                    seasons : playerData.data.by_season
                }
            });
        }
        config.MMRCache.set("playersData", playersMMRData, 300);
        response.status(200).json(playersMMRData);
    }
})

MMRRouter.get("/:name/:tag", async (request, response) => {
    const { name, tag } = request.params;
    const playerInQuestion = await Player.findOne({givenName : name});
    if(playerInQuestion === null) {
        response.status(400).json({ error: "player must be added to the db first"})
    } else {
        if(config.MMRCache.has("playersData")) {
            const playerData = config.MMRCache.get("playersData");
            for(const player of playerData) {
                if(Object.values(player).includes(name)) {
                    response.status(200).json(player)
                }
            }
        } else {
            name.replace(" ", "%20");
            const version = "v2"
            const region = config.REGION;
            const VAPI = new HenrikValorantAPI();
            const newPlayerData = await VAPI.getMMR({ version, region, name, tag });
            const formattedPlayer = {
                givenName : newPlayerData.data.name,
                tag : newPlayerData.data.tag,
                MMRData : {
                    currentTier : newPlayerData.data.current_data.currenttier,
                    currentTierPatched : newPlayerData.data.current_data.currenttierpatched,
                    elo : newPlayerData.data.current_data.elo,
                    highestRank : {
                        tier : newPlayerData.data.highest_rank.tier,
                        patchedTier : newPlayerData.data.highest_rank.patched_tier,
                        season : newPlayerData.data.highest_rank.season
                    },
                    seasons : newPlayerData.data.by_season
                }
            }
            response.status(200).json(formattedPlayer);
        }
    }
});

module.exports = MMRRouter;
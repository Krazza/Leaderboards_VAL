require("dotenv").config();
const NodeCache = require("node-cache");

const MMRCache = new NodeCache();
const PORT = process.env.PORT || 3005;
const REGION = process.env.REGION;
const username = encodeURIComponent(process.env.ATLAS_U);
const password = encodeURIComponent(process.env.ATLAS_P);

const MONGO_URI = `mongodb+srv://${username}:${password}@val.5wclqoc.mongodb.net/Leaderboards?retryWrites=true&w=majority`;

module.exports = {
    PORT,
    URI : MONGO_URI,
    REGION,
    MMRCache
}
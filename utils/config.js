require("dotenv").config();

const PORT = process.env.PORT;
const username = encodeURIComponent(process.env.ATLAS_U);
const password = encodeURIComponent(process.env.ATLAS_P);

const MONGO_URI = `mongodb+srv://${username}:${password}@val.5wclqoc.mongodb.net/Leaderboards?retryWrites=true&w=majority`;

module.exports = {
    PORT,
    URI : MONGO_URI
}
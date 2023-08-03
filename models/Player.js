const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const playerSeasonSchema = new mongoose.Schema({
    season : {
        seasonID : {
            type : String
        },
        wins : {
            type : Number,
        },
        numberOfGames : {
            type : Number
        },
    }
}) 

const playerMMRSchema = new mongoose.Schema({
    currentTier : {
        type : Number,
        required : true
    },
    currentTierPatched : {
        type : String,
        required : true
    },
    elo : {
        type : Number,
        required : true
    },
    highestRank : {
        tier : {
            type : Number
        },
        patchedTier : {
            type : String
        },
        season : {
            type : String
        }
    }
})

const playerSchema = new mongoose.Schema({
    givenName : {
        type : String,
        required : true,
        unique : true,
        maxLength : 16
    },
    tag : { 
        type : String,
        required : true,
        maxLength : 5
    },
    // puuid : {
    //     type : String,
    //     required : true,
    // }
})

playerSchema.plugin(uniqueValidator)
playerSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
})

const Player = mongoose.model("Player", playerSchema);

module.exports = {
    Player : Player
}
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

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
    }
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
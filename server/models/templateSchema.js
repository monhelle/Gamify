const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const gameSchema = new Schema({

})

const Game = model("Game", gameSchema);

module.exports = Game;
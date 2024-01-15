const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    authID: String,
    name: String,
    email: String,
    totalMoney: Number,
    plus: Number,
    minus: Number,
    win: Number,
    newGame: Number,
    numberChosen: Number,

});

const UserModel = mongoose.model("usersCollection",UserSchema);
module.exports = UserModel

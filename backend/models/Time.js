const mongoose = require('mongoose');

const TimeSchema = new mongoose.Schema({

    time: Number,
    random1: Number,
    random2: Number

});

const TimeModel = mongoose.model("TimeCollection",TimeSchema);
module.exports = TimeModel

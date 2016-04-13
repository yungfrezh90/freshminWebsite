var mongoose = require("mongoose"), Schema = mongoose.Schema;

var hottestModel = new Schema({Link: {type: String, required: true}, date: {type: Date, default: Date.now}});

module.exports = mongoose.model("Hottest", hottestModel, "HottestOfWeek");
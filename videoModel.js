var mongoose = require("mongoose"), Schema = mongoose.Schema;

var videoSchema = new Schema({Title: {type: String, unique: true}, Likes: { users: {type: [String]} , number: {type: Number}}, Link: String, Commentary: String, date: {type: Date, default: Date.now}});

module.exports = mongoose.model("Videos", videoSchema, "Videos");
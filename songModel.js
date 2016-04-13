var mongoose = require("mongoose"), Schema = mongoose.Schema;

var songSchema = new Schema({Title: {type:String, required: true, unique: true}, Artist: {}, Likes: Number, File: {type: String, required: true}, CoverImg: {type: String, required: true}, DateAdded: {type: Date, default: Date.now}, VideoLink: String});

module.exports = mongoose.model("Songs", songSchema, "Songs");
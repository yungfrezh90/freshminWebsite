var mongoose = require("mongoose"), Schema = mongoose.Schema, originalSchema = new Schema({date: {type:Date, default: Date.now}, Commentary: String, Title: {type:String, unique: true}, Likes: {users: {type: [String]}, number: {type: Number}}, VideoLink: String, Type: String});

module.exports = mongoose.model("Post", originalSchema, "Xclusives");
var mongoose = require("mongoose"), Schema = mongoose.Schema;

var blogSchema = new Schema({Author: {type: String, unique: true}, CoverImg: String, Likes: { users: {type:[String]}, number:{type: Number} }, Commentary: String, VideoLink: String, Title: {type: String, unique: true}, date: {type: Date, default: Date.now}, AdditionalImages: [String]});

module.exports = mongoose.model("Blog", blogSchema, "BlogRequests");
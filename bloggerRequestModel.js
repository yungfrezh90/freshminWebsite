var mongoose = require("mongoose"), Schema = mongoose.Schema;

var bloggerSchema = Schema({Article: String, date: Date, User: {type:String, unique: true}, Email: {type: String, unique: true}});

module.exports = mongoose.model("Bloggers", bloggerSchema, "BloggerRequests");
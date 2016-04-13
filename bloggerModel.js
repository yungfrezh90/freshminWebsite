var mongoose = require("mongoose"), Schema = mongoose.Schema;

var bloggerSchema = new Schema({User: {type:String, unique: true}, Email: String, date: {type: Date, default: Date.now}});

module.exports = mongoose.model("Blogger", bloggerSchema, 'Bloggers');
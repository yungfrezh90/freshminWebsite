var mongoose = require("mongoose"), Schema = mongoose.Schema;

var newsModel = new Schema({Title: String, Commentary: String, date: {type: Date, default: Date.now}, Img: String});

module.exports = mongoose.model("News", newsModel, "News");
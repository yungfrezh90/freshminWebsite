var mongoose  = require("mongoose"), Schema = mongoose.Schema;
	
var userSchema = new Schema({Name: String, Email: {type: String, unique: true}, Confirmed: String, DOB: String, User: {type: String, unique: true}, Pass: String, MembershipDate: Date });
	
module.exports = mongoose.model('Users', userSchema, 'Users');
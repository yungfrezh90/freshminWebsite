function addUser(req, res, mongoose)
{
	//var db = mongoose.connection.db;

	//console.log(req.body.user);
	
	//console.log(req.body);
	
	var checkUsername = require("./checkUsernamePostController");
	
	var add = checkUsername(req, res, mongoose);
}

module.exports = addUser;
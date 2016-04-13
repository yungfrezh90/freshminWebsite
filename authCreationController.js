var fs = require("fs");

function adminCreation(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var mongoose = db.collection("Users");
	
	mongoose.insert({User: req.body.user, Pass: req.body.pass, Auth: true, Email: req.body.email, Confirmed: "Y"} , function(err, results)
	{
		if(err)
		{
			console.log(err);
			
			if(err.code != "11000")
			{
				res.status(400).send("Db error, try again.");
			}
			
			else
			{
				res.status(400).send("This email seems to be currently in use. Contact the site developer as soon as possible.");
			}
		}
		
		else
		{
			fs.unlink(__dirname + "/authForm.html", function(err)
			{
				if(err)
				{
					res.status(200).send("Admin account created, but file deletion error occured. Contact site developer for notification of  auth document deleltion error.");
				}
				
				else
				{
					res.status(200).send("Admin account successfully created.");
				}
			});
		}
	});
}

module.exports = adminCreation;
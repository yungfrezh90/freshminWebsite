function checkExistence(req, res, mongoose)
{
	var db = mongoose.connection.db;
	var collection = db.collection("Users");
	
	//console.log(req.body);
			
	collection.findOne({User: req.body.user, Pass: req.body.password}, function(err, result)
	{
		//console.log(result);
				
		if(err)
		{
			console.log(err);
			res.status(500).send("Read Error");
		}
				
		else
		{
			if(result == null)
			{
				res.status(200).json({"message": "You supplied invalid username and/or password."}); //irname + "/logInInvalid.html;
			}
					
			else
			{
				if(result.Auth)
					res.status(200).json({"message": "Hello sir, welcome back."});
				
				else if(result.Confirmed == "Y")
					res.status(200).json({"message": "Logged In"}); // (__dirname + "/home.html");
			
				else
					res.status(200).json({"message": "You have not confirmed you account as of yet, please check your email account and do so."});
			}
		}
	});
	
	//addUser(req,res, mongoose);
}

module.exports = checkExistence;
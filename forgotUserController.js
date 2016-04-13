var mailer = require("nodemailer");

function checkEmail(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection("Users");
	
	//console.log(req.query);
	
	if(req.query.email)
	{
		collection.findOne({Email: req.query.email}, {Email: 1, User: 1}, function(err, result)
		{
			if(err)
			{
				console.log(err);
				res.status(500).send("Error, try again.");
			}
			
			else
			{	
				if(result == null)
				{
					res.status(200).send("This email is not in our records.");
				}
				
				else
				{
					var transport = mailer.createTransport({service: "Gmail", auth: {user: "yungfrezh90@gmail.com", pass: "1deepC90"}});
					
					transport.sendMail({from: 'Freshmin.com', to: result.Email, subject: 'Forgot Username', text: 'Your username is ' + result.User + '.', html: '<b>Your username is ' + result.User + ". </b>"}, function(err)
					{
						if(err)
						{
							console.log(err);
							res.status(200).send("Error, try again.");
						}
						
						else
						{
							res.status(200).send("Email sent.")
						}
					});	
				}
			}
		});			
	}
	
	else
	{
		collection.findOne({User: req.query.user}, {Email: 1, User: 1}, function(err, result)
		{
			if(err)
			{
				console.log(err);
				res.status(500).send("Error, try again.");
			}
			
			else
			{	
				if(result == null)
				{
					res.status(200).send("This username is not in our records.");
				}
				
				else
				{
					var transport = mailer.createTransport({service: "Gmail", auth: {user: "yungfrezh90@gmail.com", pass: "1deepC90"}});
					
					transport.sendMail({from: 'Freshmin.com', to: result.Email, subject: 'Forgot Username', text: 'Your username is ' + result.User + '.', html: '<b>Your username is ' + result.User + ". </b>"}, function(err)
					{
						if(err)
						{
							console.log(err);
							res.status(200).send("Error, try again.");
						}
						
						else
						{
							res.status(200).send("Email sent.")
						}
					});	
				}
			}
		});	
	}
}

module.exports = checkEmail;
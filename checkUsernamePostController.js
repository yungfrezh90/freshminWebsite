var mail = require("nodemailer");

function checkUsername (req, res, mongoose)
{
	if(req.body.user.toLowerCase().search("admin") != -1)
	{
		res.status(200).send("Username unavailable");
		return 0;
	}
	
	console.log(req.body.user.toLowerCase());
	
	var db = mongoose.connection.db;
	
	var collection = db.collection("Users");
	
	collection.findOne({User: req.body.user}, function(err, result)
	{
		//console.log(result);
		
		if(err)
		{
			console.log(err);
			res.status(500).send();
		}
		
		else
		{
			if(result == null)
			{
				dOB = req.body.birthdayD + "/" + req.body.birthdayM + "/" + req.body.birthdayY;
			
				var Users = require("./userModel");
			
				var newUser = new Users({Name: req.body.firstN + " " + req.body.lastN, Email: req.body.email, User: req.body.user, Confirmed: "N", Pass: req.body.pass, DOB: dOB, MembershipDate: req.body.date}).save(function(err)
				{
					if(err)
					{
						console.log( "MongoDB Error: " + err.code);
			
						if(err.code == 11000)
						{
							res.status(200).send("There is an active account with this email address.");	
						}
			
						else
						{		
							res.status(500).send("Insertion Error");
						}
					}
				
					else
					{
						var mailer = require("./mailer");
						
						//console.log(req.body.user);
						
						var mailOptions = 
						{
							from:'Freshmin.com',
							to: req.body.email,
							subject: 'Confirm Membership',
							html: '<form action = "http://freshminlifestyle-westcoast.rhcloud.com/confirmMembership" enctype = "multipart/form-data" method = "POST"> <input type = "hidden" name = "user" value = "' + req.body.user + '"> <button type = "submit"> Confirm </button>  </form>'
						};
						
						mailer(req, res, mail, mailOptions, mongoose);
					}
				});
			}
			
			else
			{
				res.status(200).send("Username unavailable");
			}
		}
	});
}

module.exports = checkUsername;
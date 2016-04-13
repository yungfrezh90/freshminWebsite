var mailer = require("nodemailer");

function initiate(req,res, mongoose)
{
	var valid = validateRequest(req,res,mongoose);
}

function validateRequest(req,res,mongoose)
{
	var db = mongoose.connection.db;
	var collection = db.collection("BloggerRequests");
			
	collection.findOne({User: req.body.user}, function(err, result)
	{
		if(err)
		{
			console.log(err);
			
			if(err.code == 11000)
			{
				res.status(200).send("Your blogger request is on record and is in the the process of either being respectfully confirmed or declined.");
			}
			
			else
			{
				res.status(500).send("Insertion Error");
			}
		}
				
		else
		{
			//console.log(result);
					
			if(result == null)
			{
				addToDB(req,res,mongoose);
			}
					
			else
			{
				res.status(200).send("Your blogger request is pending. Please allow us more time to confirm your request.");
			}
		}
	});
}

function addToDB(req, res, mongoose)
{		
	var Blogger = require("./bloggerRequestModel");
			
	var newBlogger = new Blogger({Article: req.body.article, date: req.body.date, Email: req.body.email, User: req.body.user}).save(function(err)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Insert Error");
		}
				
		else
		{
			res.status(200).send("Uploaded");
		}
	});
}

function sendEmail(req, res, mongoose)
{
		
}

module.exports = initiate;

var mongoose = require('mongoose'), fs = require("fs"), mailer = require("nodemailer"),smtpTransport = require("nodemailer-smtp-transport");

function checkEmailDirectory(req, res)
{
	fs.readdir(__dirname + "/Uploads/EmailImages", function(err)
	{
		if(err)
		{
			fs.mkdir(__dirname + "/Uploads/EmailImages", function(err)
			{
				if(err)
				{
					res.status(500).send("File system error.");
					deleteFiles(req, res);
				}
				
				else
				{
					renameFiles(req, res);
				}
			});
		}
		
		else
		{
			renameFiles(req, res);
		}
	});
}

function renameFiles(req, res)
{
	fs.rename(__dirname + "/Uploads/" + req.files.image[0].filename, __dirname + "/Uploads/EmailImages/" + req.files.image[0].originalname, function(err)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("File system error, try again.");
			deleteFiles(req, res);
		}

		else
		{
			//console.log("Rename Succesful");
			queryUsers(req, res);
		}
		
	});

}

function deleteFiles(req, res)
{
	fs.unlink(__dirname + "/Uploads/" + req.files.image[0].filename, function(err)
	{
		if(err)
		{
			console.log(err);
		}
		
	});
}


function queryUsers(req, res)
{
	var emailAccounts = [];
	
	var db = mongoose.connection.db;
	
	var collection = db.collection("Users");

			// Select users
	collection.find({}).toArray(function(err, results)
	{
		if(err)
		{
			res.status(500).send("Query error.");
			deleteNewFile(req, res); 
		}

		else
		{
			if(results.length != 0)
			{
				//console.log(JSON.stringify(results));
				sendEmails(req, res, results);
			}

			else
			{
				//nsole.log("No users");
				res.status(200).send("There are currently no users to email.");
				deleteNewFile(req, res);
			}
		}
	});
}

function sendEmails(req, res, results)
{
	var transporter = mailer.createTransport(smtpTransport('smtps://yungfrezh90%40gmail.com:1deepC90@smtp.gmail.com'));
	
	var error = false;
	
	//console.log(results[0].Email);

	// Email users
	for(var count = 0; count < results.length; count++)
	{
		var mailOptions =
		{
			from: 'Freshmin.com',
			to: results[count].Email,
			subject: req.body.subject,
			html: '<h3>' + req.body.message + '</h3> <img src = "http://freshminlifestyle-westcoast.rhcloud.com/EmailImages?image=' + req.files.image[0].originalname + '"/>'
		};
	
		transporter.sendMail(mailOptions, function(err, info)
		{
			if(err)
			{
				console.log(err);
				deleteNewFile(req, res);
				error = true;
			}
		});
	}
	
	if(error == true)
	{
		res.status(200).send("Email error, try again");
	}
	
	else
	{
		res.status(200).send("Emails sent.");
	}
	
}

function deleteNewFile(req, res)
{
	fs.rmdir(__dirname + "/Uploads/EmailImages/" + req.files.image[0].originalname, function(err)
	{
		if(err)
		{
			console.log(err);
		}
	});
}

module.exports = checkEmailDirectory;
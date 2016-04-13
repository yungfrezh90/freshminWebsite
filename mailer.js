var smtpTransport = require("nodemailer-smtp-transport");

function mailer(req, res, mailer, mailOptions, mongoose)
{
	var transporter = mailer.createTransport(smtpTransport('smtps://yungfrezh90%40gmail.com:1deepC90@smtp.gmail.com'));
	
	transporter.sendMail(mailOptions, function(err, info)
	{
		if(err)
		{
			console.log(err);
			
			res.status(500).send(err);
			
			var db = mongoose.connection.db;
			
			var collection = db.collection("Users");
			
			collection.remove({User: req.body.user}, function(err)
			{
				
			});
		}
		
		else
		{
			console.log(info.response);
			res.status(200).send("Welcome");
		}
	});
}

module.exports = mailer;
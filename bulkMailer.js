function bulkMailer(req, res, mailer, mailOptions, mailList)
{
	var errors = 0;
	
	var transport = mailer.createTransport({service: "Gmail", auth: {user: "yungfrezh90@gmail.com", pass: "1deepC90"}});
	
	for( var count = 0; count < mailList.length; count++)
	{	
		mailOptions.to = mailList[count];
		
		transport.sendMail(mailOptions, function(err, info)
		{
			if(err)
			{	
				console.log(err);
				errors++;
			}
		
			else
			{
				console.log(info.response);
			}
		});
	}
	
	if(errors == 0)
	{
		res.status(200).send("Emails sent.")
	}
	
	else
	{
		res.status(200).send("Email sent " + "with " + String(numbers) + " errors.");
	}
}

module.exports = bulkMailer;
function checkBloggerStatus(user, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = mongoose.collection("Bloggers");
	
	collection.findOne({User: " "}, function(err, result)
	{
		if(err)
		{
			console.log(err);
			res.sendStatus(500);
		}
		
		else
		{
			if(result == null)
			{
				res.status(200).send("You do not have blogger status. To aquire this status, submit a request. The link is located in the page footer.");
			}
			
			else
			{
				res.status(200).send("Blogger");
			}
		}
	});
}

module.exports = checkBloggerStatus;
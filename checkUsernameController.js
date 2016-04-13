function checkUsername (req, res, mongoose)
{
	if(req.query.user.toLowerCase().search("admin") != -1)
	{
		res.status(200).send("Username unavailable");
		return 0;
	}
	
	var db = mongoose.connection.db;
	
	var collection = db.collection("Users");
	
	collection.findOne({User: req.query.user}, function(err, result)
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
				res.status(200).send("Username free");
			}
			
			else
			{
				res.status(200).send("Username unavailable");
			}
		}
	});
}

module.exports = checkUsername;
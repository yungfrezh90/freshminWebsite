function removeRequest(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection("BloggerRequests");
	
	collection.remove({User: req.query.user}, function(err)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Deletion error, try again");
		}
		
		else
		{
			res.status(200).send("Deletion successful.");
		}
	});
}

module.exports = removeRequest;
function selectBloggerRequest(res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection("BloggerRequests")
	
	collection.find({}).sort({date: -1}).toArray(function(err, results)
	{
		//console.log(JSON.stringify(results));
		
		if(err)
		{
			console.log(err);
			res.status(500).send("Query Error");
		}
		
		else
		{
			res.status(200).json(JSON.stringify(results));
		}
	});
}

module.exports = selectBloggerRequest;
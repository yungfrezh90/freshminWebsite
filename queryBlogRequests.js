function queryBlogs(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection("BlogRequests");
	
	collection.find({}).limit(6).sort({date: -1}).toArray(function(err, results)
	{
		if(err)
		{
			console.log(err);
			res.status(200).send("Query error, try again.")
		}
		
		else
		{
			//console.log(err);
			res.status(200).json(results);
		}
	});
}

module.exports = queryBlogs;
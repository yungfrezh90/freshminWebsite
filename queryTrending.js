function getTrending(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection("Blogs");
	
	collection.find({}).sort({date: -1}).limit(3).toArray(function(err, results)
	{
		if(err)
		{
			res.status(500).send("Error");
		}
		
		else
		{
			res.status(200).json(JSON.stringify(results));
		}
	});
}

module.exports = getTrending;
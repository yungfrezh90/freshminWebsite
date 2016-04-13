function readNews(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection("News");
	
	collection.find({}).sort({date: -1}).limit(5).toArray(function(err, results)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Query error.");
		}
		
		else
		{
			if(results.length == 0)
			{
				res.status(200).send("No new records");
			}
			
			else
			{
				res.status(200).json(JSON.stringify(results));
			}
		}
	});
}

module.exports = readNews;
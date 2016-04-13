function queryContent(req, res, mongoose, contentType)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection(contentType);
	
	if(contentType != "Blogs")
	{
	
		collection.find({}).sort({date: 1}).toArray(function(err, results)
		{
			if(err)
			{
				console.log(err);
				res.status(500).send("Query error, reload page.");
			}
		
			else
			{
				res.status(200).json(JSON.stringify(results));
			}
		});
	}
	
	else
	{
		collection.find({Confirmed: "Y"}).sort({date: 1}).toArray(function(err, results)
		{
			if(err)
			{
				console.log(err);
				res.status(500).send("Query error, reload page.");
			}
			
			else
			{
				res.status(200).json(JSON.stringify(results));
			}
		});
	}
}

module.exports = queryContent;
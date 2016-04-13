function readVideos(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection("Videos");

	if(req.query.skip != undefined)
	{
		collection.find({}).sort({date: -1}).skip(Number( 10 * (Number(req.query.skip) - 1))).limit(10).toArray(function(err, results)
		{
			if(err)
			{
				console.log(err);
				res.status(500).send("Query error.");
			}
			
			else
			{
				if(results == null)
				{
					res.status(200).send("Currently no videos in database.");
				}
			
				else
				{
					res.status(200).json(results);
				}
			}
		});
	
	}
	
	else
	{
		collection.find({}).sort({date: -1}).limit(10).toArray(function(err, results)
		{
			if(err)
			{
				console.log(err);
				res.status(500).send("Query error.");
			}
			
			else
			{
				if(results == null)
				{
					res.status(200).send("Currently no videos in database.");
				}
			
				else
				{
					res.status(200).json(results);
				}
			}
		});	
	}
}

module.exports = readVideos;
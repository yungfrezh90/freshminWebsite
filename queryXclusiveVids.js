function readXclusivesVids(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection("Xclusives");
	
	if(req.query.skip)
	{
		collection.find({Type: {$ne: "Interview"}}).sort({date: -1}).skip(Number( 10 * (Number(req.query.skip) - 1))).limit(10).toArray(function(err, results)
		{
			if(err)
			{
				console.log(err);
				
				res.status(500).send("Query error.");
			}
			
			else
			{
				res.status(200).json(results);
			}
		});	
	}
	
	else
	{
	
		collection.find({Type: {$ne: "Interview"}}).sort({date: -1}).limit(10).toArray(function(err, results)
		{
			if(err)
			{
				console.log(err);
				
				res.status(500).send("Query error.");
			}
			
			else
			{
				console.log(results.length);
				res.status(200).json(results);
			}
		});
	}
}

module.exports = readXclusivesVids;
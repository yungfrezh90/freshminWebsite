function collectionSize(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection(req.query.collection);
	
	if(req.query.type)
	{
		if(req.query.type == "Interview")
		{
			collection.find({Type: "Interview"}).toArray(function(err, results)
			{
				if(err)
				{
					console.log(err);
					res.status(500).send("Query Error.");
				}
				
				else
				{
					res.status(200).json(JSON.stringify(results));
				}
			});
		}
		
		else
		{
			collection.find({Type: "Music"}).toArray(function(err, results)
			{
				if(err)
				{
					console.log(err);
					res.status(500).send("Query Error.");
				}
				
				else
				{
					res.status(200).json(JSON.stringify(results));
				}
			});	
		}
	}
	
	else
	{
		collection.find({}).toArray(function(err, results)
		{
			if(err)
			{
				console.log(err);
				res.status(500).send("Query Error.");
			}
			
			else
			{
				res.status(200).json(JSON.stringify(results));
			}
		});
	}
}

module.exports = collectionSize;
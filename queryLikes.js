function readLikes(req, res, mongoose)
{
	var whichCollection;
	
	//console.log(req.query.collection);
	
	if(req.query.collection == "Xclusives")
	{
		whichCollection = "Xclusives";
	}
	
	else if(req.query.collection == "Videos")
	{
		whichCollection = "Videos";
	}
	
	else if(req.query.collection == "Blogs")
	{
		whichCollection = "Blogs";
	}
		
	var db = mongoose.connection.db;
	
	var collection = db.collection(whichCollection);
	
	//console.log(req.query.type);
	
	if(req.query.collection == "Xclusives")
	{
		if(req.query.type == "Interviews")
		{
			collection.find({Type: "Interview"}).sort({"Likes.number": -1}).toArray(function(err, results)
			{
				if(err)
				{
					console.log(err);
					res.status(500).send("Query error.");
				}
				
				else
				{
					res.status(200).json(JSON.stringify(results));
				}
			});			
		}
		
		else if(req.query.type == undefined || req.query.type == null)
		{
			collection.find({}).sort({"Likes.number": -1}).toArray(function(err, results)
			{
				if(err)
				{
					console.log(err);
					res.status(500).send("Query error.");
				}
				
				else
				{
					res.status(200).json(JSON.stringify(results));
				}
			});		
		}
		
		else
		{
			collection.find({Type: {$ne: "Interview"}}).sort({"Likes.number": -1}).toArray(function(err, results)
			{
				if(err)
				{
					console.log(err);
					res.status(500).send("Query error.");
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
		collection.find({}).sort({"Likes.number": -1}).toArray(function(err, results)
		{
			if(err)
			{
				console.log(err);
				res.status(500).send("Query error.");
			}
			
			else
			{
				res.status(200).json(JSON.stringify(results));
			}
		});	
	}
}

module.exports = readLikes;
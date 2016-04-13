function searchVideos(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection("Videos");
	
	collection.find({Title: {$regex: req.query.search, $options: 'i'}}).sort({date: 1}).toArray(function(err, results)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Query error, try again.");
		}
		
		else
		{
			//console.log(results);
			
			if(results == null)
			{
				searchXclusives(req, res, mongoose, results);
			}
			
			else
			{
				searchXclusives(req, res, mongoose, results);
			}
		}
	});
}

function searchXclusives(req, res, mongoose, results)
{
	var db = mongoose.connection.db;
		
	var collection = db.collection("Xclusives");
		
	collection.find({Title: {$regex: req.query.search, $options: 'i'}}).sort({date: 1}).toArray(function(err, moreResults)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Query error, try again");
		}
			
		else
		{
			//console.log(moreResults);
			
			if(moreResults == null)
			{
				searchBlogs(req, res, mongoose, results);
			}
				
			else
			{
				if(results == null)
				{
					results = [];
				}
				
				//add new results to array
				for(var count = 0; count < moreResults.length; count++)
				{
					results.push(moreResults[count]);
				}	
				
				searchBlogs(req, res,mongoose, results);
			}
		}
	});
}

function searchBlogs(req, res, mongoose, results)
{
	var db = mongoose.connection.db;
		
	var collection = db.collection("Blogs");
		
	collection.find({Title: {$regex: req.query.search, $options: 'i'}}).sort({date: 1}).toArray(function(err, moreResults)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Query error, try again");
		}
			
		else
		{
			//console.log(moreResults);
			
			if(moreResults == null)
			{
				res.status(200).json(JSON.stringify(results));
			}
				
			else
			{
				if(results == null)
				{
					results = [];
				}
				
				//add new results to array
				for(var count = 0; count < moreResults.length; count++)
				{
					results.push(moreResults[count]);
				}	
					
				res.status(200).json(JSON.stringify(results));
			}
		}
	});
}

module.exports = searchVideos;
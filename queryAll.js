var completeResponse = null, numBlogs, numVideos, numXclusives;

function queryContent(req, res, mongoose)
{
	//console.log(req.query.search);
	queryVideos(req, res, mongoose);
}

function queryVideos(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection("Videos");
	
	collection.find({Title: {$regex: req.query.search, $options: 'im'}}).sort({date: -1}).toArray(function(err, results)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Video query error, try again.");
			completeResponse = null;
		}
		
		else
		{	
			//console.log(results.length);
			//console.log(results);
		
			if(results.length != 0)
			{
				for(var count = 0; count < results.length; count++)
				{
					results[count].mediaType = "Video";
				}
				
				completeResponse = results;
				numVideos = results.length;
				queryXclusives(req, res, mongoose, db);			
			}
			
			else
			{
				queryXclusives(req, res, mongoose, db);
				completeResponse = null;
			}
		}
		
		//console.log(results);
	});
}

function queryXclusives(req, res, mongoose, db)
{
	var collection = db.collection("Xclusives");
	
	collection.find({Title: {$regex: req.query.search, $options: 'im'}}).sort({date: -1}).toArray(function(err, results)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Video query error, try again.");
			completeResponse = null;
		}
		
		else
		{
			//console.log(results.length);
			//console.log(results);
			
			if(results.length != 0)
			{
				if(completeResponse == null)
				{
					for(var count = 0; count < results.length; count++)
					{
						results[count].mediaType = "Xclusive";
					}
					completeResponse = results;
					numXclusives = results.length;
					queryBlogs(req, res, mongoose, db);
				}
				
				else
				{
					for(var count = 0; count < results.length; count++)
					{
						results[count].mediaType = "Xclusive";
					}
					
					for(var count = 0; count < results.length; count++)
					{
						completeResponse.push(results[count]);
					}

					numXclusives = results.length;
					
					queryBlogs(req, res, mongoose, db);
				}
			}

			else
			{
				queryBlogs(req, res, mongoose, db);
				completeResponse = null;
			}
		}
		
		//console.log(results);
	});
}

function queryBlogs(req, res, mongoose, db)
{
	var collection = db.collection("Blogs");
	
	collection.find({Title: {$regex: req.query.search, $options: 'im'}}).sort({date: -1}).toArray(function(err, results)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Video query error, try again.");
			completeResponse = null;
		}
		
		else
		{
			//console.log(results.length);
			//console.log(results);
			
			if(results.length != 0)
			{
				if(completeResponse == null)
				{
					
					for(var count = 0; count < results.length; count++)
					{
						results[count].mediaType = "Blog";
					}
					
					completeResponse = results;
					numBlogs = results.length;

					completeResponse.push([numVideos, numXclusives, numBlogs]);
					
					res.status(200).json(JSON.stringify(completeResponse));
					
					completeResponse = null;
				}
				
				else
				{
					for(var count = 0; count < results.length; count++)
					{
						results[count].mediaType = "Blog";
					}
					
					for(var count = 0; count < results.length; count++)
					{
						completeResponse.push(results[count]);
					}
					
					numBlogs = results.length;
					
					completeResponse.push([numVideos, numXclusives, numBlogs]);
					
					res.status(200).json(JSON.stringify(completeResponse));
					
					completeResponse = null;
				}
			}

			else
			{
				if(completeResponse == null)
				{
					res.status(200).send("No results");
					
					completeResponse = null;
				}
				
				else
				{
					numBlogs = results.length;
					
					completeResponse.push([numVideos, numXclusives, numBlogs]);
					
					res.status(200).json(JSON.stringify(completeResponse));
					completeResponse = null;
				}
			}
			
			//console.log(results);
		}
	});
}

module.exports = queryContent;
function checkTitle(req, res, mongoose)
{	
	//console.log(req.body);
	
	if(req.body.type == "Video")
	{
		checkVideoTitle(req, res, mongoose);
	}
	
	else if(req.body.type == "Blog")
	{
		checkBlogTitle(req, res, mongoose);
	}
	
	else
	{
		checkXclusiveTitle(req, res, mongoose);
	}
}

function checkBlogTitle(req, res, mongoose)
{
	var db = mongoose.connection.db;
		
	var collection = db.collection("Blogs");
		
	collection.findOne({Title: req.body.title}, function(err, result)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Query error, try again");
		}
			
		else
		{
			//console.log(result);
	
			if(result == null)
			{
				res.status(200).send("There is no record of a blog by that name.");
			}
				
			else
			{
				deleteContent(req, res, mongoose, db, collection);
			}
		}
	});
}

function checkVideoTitle(req, res, mongoose)
{
	var db = mongoose.connection.db;
		
	var collection = db.collection("Videos");
		
	collection.findOne({Title: req.body.title}, function(err, result)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Query error, try again");
		}
			
		else
		{
			//console.log(result);
	
			if(result == null)
			{
				res.status(200).send("There is no record of a video by that name.");
			}
				
			else
			{
				deleteContent(req, res, mongoose, db, collection);
			}
		}
	});
}

function checkXclusiveTitle(req, res, mongoose, db, collection)
{
	var db = mongoose.connection.db;
		
	var collection = db.collection("Xclusives");
		
	collection.findOne({Title: req.body.title}, function(err, result)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Query error, try again");
		}
			
		else
		{
			if(result == null)
			{
				res.status(200).send("There is no record of a video by that name.");
			}
				
			else
			{
				deleteContent(req, res, mongoose, db, collection);
			}		
		}
	});
}

function deleteContent(req, res, mongoose, db, collection)
{
	collection.remove({Title: req.body.title}, function(err)
	{
		if(err)
		{
			console.log(err);
		}
		
		else
		{
			res.status(200).send("Content deletion.");
		}
	});
}

module.exports = checkTitle;
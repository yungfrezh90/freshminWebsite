function checkTitle(req, res, mongoose)
{	
	//console.log(req.body);
	
	if(req.body.type == "Video")
	{
		checkVideoTitle(req, res, mongoose);
	}
	
	else
	{
		checkXclusiveTitle(req, res, mongoose);
	}
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
				updateContent(req, res, mongoose, db, collection);
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
				updateContent(req, res, mongoose, db, collection);
			}		
		}
	});
}

function updateContent(req, res, mongoose, db, collection)
{
	if(req.body.type == "Video")
	{	
		if(req.body.updateType == "Video Link")
		{
			updateLink(req, res, mongoose, db, collection);
		}
		
		else if(req.body.updateType == "Commentary")
		{
			updateCommentary(req, res, mongoose, db, collection);
		}
		
		else if(req.body.updateType == "Title")
		{
			updateTitle(req, res, mongoose, db, collection);
		}
	}
	
	else
	{
		if(req.body.updateType == "Video Link")
		{
			updateLink(req, res, mongoose, db, collection);
		}
		
		else if(req.body.updateType == "Commentary")
		{
			updateCommentary(req, res, mongoose, db, collection);
		}
		
		else if(req.body.updateType == "Title")
		{
			updateTitle(req, res, mongoose, db, collection);
		}
	}
}


function updateLink(req, res, mongoose,db, collection)
{
	if(req.body.type == "Video")
	{
		collection.update({Title: req.body.title}, {$set: {Link: req.body.update}}, function(err)
		{
			if(err)
			{
				console.log(err);
				res.status(500).send("Update error, try again.");
			}
				
			else
			{
				res.status(200).send("Content updated.");
			}
		});
	}
	
	else
	{
		collection.update({Title: req.body.title}, {$set: {VideoLink: req.body.update}}, function(err)
		{
			if(err)
			{
				console.log(err);
				res.status(500).send("Update error, try again.");
			}
				
			else
			{
				res.status(200).send("Content updated.");
			}
		});	
	}
}

function updateCommentary(req, res, mongoose, db, collection)
{
	collection.update({Title: req.body.title}, {$set: {Commentary: req.body.update}}, function(err)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Update error, try again.");
		}
				
		else
		{
			res.status(200).send("Content updated.");
		}
	});
}

function updateTitle(req, res, mongoose, db, collection)
{
	collection.update({Title: req.body.title}, {$set: {Title: req.body.update}}, function(err)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Update error, try again.");
		}
				
		else
		{
			res.status(200).send("Content updated.");
		}
	});
}

module.exports = checkTitle;
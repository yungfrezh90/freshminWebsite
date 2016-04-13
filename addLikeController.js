function incrementLikes(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection(req.query.collection);
	
	//console.log(req.query);
	
	collection.update({Title: req.query.title}, {$inc: {"Likes.number": 1}, $push:{"Likes.users": req.query.user}} , function(err)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Update error.");
		}
		
		else
		{
			res.status(200).send("Updated.");
		}
	});
}

function checkUser(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection(req.query.collection);
	
	collection.findOne({Title: req.query.title, "Likes.users": req.query.user}, function(err, result)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Query error.");
		}
		
		else
		{
			//console.log(result);
			
			if(result == null)
			{
				incrementLikes(req, res, mongoose, collection);
			}
			
			else
			{
				res.status(200).send("Previous like.");
			}
		}
	});
}

module.exports = checkUser;
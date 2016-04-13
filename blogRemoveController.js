var fs = require("fs");

function removeBlog(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection("BlogRequests");
	
	collection.remove({Title: req.body.title}, function(err)
	{
		if(err)
		{
			collection.remove({Title: req.body.title}, function(err)
			{
				if(err)
				{
					console.log(err);
					res.status(500).send("Deletion error, try again.");
				}
				
				else
				{
					res.status(200).send("Blog removed.");
					removeFiles(req, res, fs);
				}
			});
		}
		
		else
		{
			res.status(200).send("Blog removed.");
			removeFiles(req, res, fs);
		}
	});
}

function removeFiles(req, res, fs)
{
	fs.readdir(__dirname + "/Uploads/Blogs/" + req.body.title, function(err, files)
	{
		if(err)
		{
			fs.readdir(__dirname + "/Uploads/Blogs/" + req.body.title, function(err, files)
			{
				if(err)
				{
					console.log(err);
					//res.status(500).send("Blog removed but with file system error.");
				}
				
				else
				{
					for(var count = 0; count < files.length; count++)
					{
						fs.unlink(__dirname + "/Uploads/Blogs/" + req.body.title + "/" + files[count], function(err)
						{
							if(err)
							{
								console.log(err);
							}
						});
					}
				}
			});
		}
		
		else
		{
			for(var count = 0; count < files.length; count++)
			{
				fs.unlink(__dirname + "/Uploads/Blogs/" + req.body.title + "/" + files[count], function(err)
				{
					if(err)
					{
						console.log(err);
					}
				});
			}
		}
	});
}

module.exports = removeBlog;
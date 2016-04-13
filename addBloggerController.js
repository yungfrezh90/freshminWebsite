function addBlogger (req, res, mongoose)
{
	var blogger = new Object();
	
	blogger.Email = req.query.email;
	
	blogger.User = req.query.user;
	
	blogger.date = req.query.date;
	
	var Blogger = require("./bloggerModel.js");
	
	var newBlogger = new Blogger(blogger).save(function(err)
	{
		if(err)
		{
			console.log(err);
			
			if(err.code == 11000)
			{
				res.status(200).send("This user has previous blog membership privileges.");
				
				var db = mongoose.connection.db;
			
				var collection = db.collection("BloggerRequests");
			
				collection.remove({User: req.query.user}, function(err)
				{
					if(err)
					{
						collection.remove({User: req.query.user}, function(err)
						{
							
						});
					}
				});
			}
			
			else
			{
				res.status(500).send("Insertion Error, try again.");
			}
		}
		
		else
		{
			res.status(200).send("Blogger added.");
			
			var db = mongoose.connection.db;
			
			var collection = db.collection("BloggerRequests");
			
			collection.remove({User: req.query.user}, function(err)
			{
				if(err)
				{
					collection.remove({User: req.query.user}, function(err)
					{
							
					});
				}
			});
		}
	});
}

module.exports = addBlogger;
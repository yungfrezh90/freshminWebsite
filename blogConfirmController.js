var fs = require("fs"), mailer = require("nodemailer");

function confirmBlog(req, res, mongoose)
{	
	if(req.body != undefined)
	{
		adminBlog(req, res, mongoose);
	}
	
	else
	{
		var db = mongoose.connection.db;
		
		var collection = db.collection("BlogRequests");

		collection.findOne({Title: req.query.title}, function(err, result)
		{	
			if(err)
			{
				console.log(err);
				res.status(500).send("Query error, try again.");
			}
			
			else
			{
				if(result == null)
				{
					res.status(200).send("Blog entry not found.");
				}
				
				else
				{
					db = mongoose.connection.db;
					
					collection = db.collection("Blogs");
					
					collection.insert({Title: result.Title, Author: result.Author, CoverImg: result.CoverImg, Likes: result.Likes, Commentary: result.Commentary, VideoLink: result.VideoLink, date: result.date, AdditionalImages: result.AdditionalImages}, function(err)
					{
						if(err)
						{
							console.log(err);
							
							if(err.code == 11000)
							{
								res.status(200).send("There is a blog stored with this title, rename blog and try again.");
							}
							
							else	
								res.status(500).send("Insertion error, try again");
						}
						
						else
						{
							db = mongoose.connection.db;
					
							collection = db.collection("BlogRequests");
					
							collection.remove({Title: req.query.title}, function(err)
							{
								if(err)
								{
									collection.remove({Title: req.query.title}, function(err)
									{
										if(err)
										{
											console.log(err);
											res.status(200).send("Blog added but with blog request deletion error.");
										}
									});
								}
						
								else
								{
									res.status(200).send("Blog confirmed and added.");
									emailBlogger(req, res, mongoose, result.Author);
								}
							});
						}
					});
				}
			}
		});
	}
}

function adminBlog(req, res,mongoose, author)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection("Blogs");

	collection.findOne({Title: req.query.title}, function(err, result)
	{	
		if(err)
		{
			console.log(err);
			res.status(500).send("Query error, try again.");
		}
		
		else
		{
			if(result == null)
			{
				var additional = [];
				
				for(var count = 0; count < req.files.additionalImages.length; count++)
				{
					additional.push(req.files.additionalImages[count].originalname);
				}
				
				var likes = 
				{
					number: 0,
					users: []
				}
				
				db = mongoose.connection.db;
				
				collection = db.collection("Blogs");
				
				collection.insert({Title: req.body.title, Author: req.body.user, CoverImg: req.files.coverImg[0].originalname, Likes: likes, Commentary: req.body.commentary, date: new Date(), AdditionalImages: additional}, function(err)
				{
					if(err)
					{
						console.log(err);
						res.status(500).send("Insertion error, try again");
					}
					
					else
					{
						res.status(200).send("Blog added");
					}
				});
			}
			
			else
			{
				res.status(200).send("There is a blog on recorod with this title, rename blog and try again.");
			}
		}
	});
}

function emailBlogger(req, res, mongoose, author)
{
	//console.log(result.Author);
	
	var db = mongoose.connection.db;
	
	var collection = db.collection("Users");
	
	collection.findOne({User: author}, {Email: 1}, function(err, result)
	{
		if(err)
		{
			console.log(err);
		}
		
		else
		{
			//console.log(result.Email);
			
			var transport = mailer.createTransport({service: 'Gmail', auth: {user: 'yungfrezh90@gmail.com', pass:'1deepC90' }});
			
			var mailOptions = 
			{
				from: 'yungfrezh90@gmail.com',
				to: result.Email,
				subject: "Blog Confirmed",
				text: "Your blog " + req.query.title + " was confirmed.",
				html: '<p> Your blog ' + req.query.title + " was confirmed."
			};
			
			transport.sendMail(mailOptions, function(err, info)
			{
				if(err)
				{
					console.log(err);
				}
			});
		}
	});
}

module.exports = confirmBlog;


function newBlog(req, res, mongoose, fs)
{
	//console.log(req.body);
	//console.log(req.files.additionalImages.length);
	checkBloggerStatus(req, res, mongoose, fs);
}

function checkBloggerStatus(req, res, mongoose, fs)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection("Bloggers");
	
	if(req.body.admin)
	{
		var adminBlog = require("./blogConfirmController");
		
		var fs = require("fs");
		
		createUploadsDirectory(req, res, fs, mongoose);
		
		adminBlog(req, res, mongoose);
	}
	
	else
	{	
		collection.findOne({User: req.body.user}, function(err, result)
		{
			if(err)
			{
				console.log(err);
				res.status(400).send("Query error, try again.");
				deleteFiles(req, res, fs, mongoose);	
			}
				
			else
			{
				if(result == null)
				{
					res.status(200).send("You are not an approved blogger.");
					deleteFiles(req, res, fs, mongoose);
				}
					
				else
				{
					checkBlogRequests(req, res, fs, mongoose);
				}
			}
		});
	}
}

function checkBlogRequests(req, res, fs, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection("BlogRequests");
	
	collection.findOne({Author: req.body.user}, function(err, result)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Query error, try again.");
			deleteFiles(req, res, fs, mongoose);
		}
		
		else
		{
			if(result != null)
			{
				res.status(200).send("You have a blog request that has yet to be confirmed or declined. No further blog requests of yours will be saved to database until a decision is made on your previous blog.");
				deleteFiles(req, res,fs, mongoose);
			}
			
			else
			{
				createUploadsDirectory(req, res, fs, mongoose);
			}
		}
	});
}

function createUploadsDirectory(req, res, fs, mongoose)
{
	fs.readdir(__dirname + "/Uploads", function(err)
	{
		if(err)
		{
			fs.mkdir(__dirname + "/Uploads", function(err)
			{
				if(err)
				{
					console.log(err);
					res.status(500).send("File system error, try again");
					deleteFile(req, res, fs, mongoose);
				}
				
				else
				{
					createBlogDirectory(req, res, fs, mongoose);
				}
			});
		}
		
		else
		{
			createBlogDirectory(req, res, fs, mongoose);
		}
	});
}

function createBlogDirectory(req, res, fs, mongoose)
{
	fs.readdir(__dirname + "/Uploads/Blogs", function(err)
	{
		if(err)
		{
			fs.mkdir(__dirname + "/Uploads/Blogs", function(err)
			{
				if(err)
				{
					console.log(err);	
					res.status(500).send("File system error, try again.")
					deleteFiles(req, res, fs, mongoose);
				}
		
				else
				{
					createPostDirectory(req, res, fs, mongoose);
				}
			});
		}
		
		else
		{
			//directory already exists
			createPostDirectory(req, res, fs, mongoose);
		}	
	});
}

function deleteFiles(req, res, fs, mongoose)
{
	fs.unlink(__dirname + "/Uploads/" + req.files.coverImg[0].filename, function(err)
	{
		if(err)
		{
			console.log(err);
			//res.status(500).send("Error, try again.");
		}
	});	
	
	for(var count = 0; count < req.files.additionalImages.length; count++)
	{	
		fs.unlink(__dirname + "/Uploads/" + req.files.additionalImages[count].filename, function(err)
		{
			if(err)
			{
				console.log(err);
			}	
		});
	}
	
	return 0;
}

function createPostDirectory(req, res, fs, mongoose)
{
	fs.readdir(__dirname + "/Uploads/Blogs/" + req.body.title, function(err)
	{
		if(err)
		{
			fs.mkdir(__dirname + "/Uploads/Blogs/" + req.body.title, function(err)
			{
				if(err)
				{
					console.log(err);
					res.status(500).send("Directory creation error, try again.");
					deleteFiles(req, res, mongoose, fs, mongoose);
				}
				
				else
				{
					renameCoverImage(req, res, fs, mongoose);
				}
			});
		}
		
		else
		{
			
			if(req.body.admin == "true")
			{	
				renameCoverImage(req, res, fs, mongoose);
			}
			
			else
			{
				res.status(200).send("This title is taken, rename the blog and resubmit.");
				deleteFiles(req,res,fs,mongoose);
			}
		}
	});
}

function renameCoverImage(req, res, fs, mongoose)
{
	fs.rename(__dirname + "/Uploads/" + req.files.coverImg[0].filename, __dirname + "/Uploads/Blogs/" + req.body.title + "/" + req.files.coverImg[0].originalname, function(err)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Rename error, try again.");
			deleteFiles(req, res, fs, mongoose);
		}
		
		else
		{
			renameAdditionalImages(req, res, fs, mongoose);
		}
	});	
}

function deleteCover(req, res, fs, mongoose)
{
	fs.unlink(__dirname + "/Uploads/" + req.files.coverImg[0].filename, function(err)
	{
		if(err)
		{
			console.log(err);
			//res.status(500).send("Error, try again.");
		}
	});	
	
	deleteAdditional(req, res, fs, mongoose);
}

function renameAdditionalImages(req, res, fs, mongoose)
{
	var error = false;
			
	for(var count = 0; count < req.files.additionalImages.length; count++)
	{	
		fs.rename(__dirname + "/Uploads/" + req.files.additionalImages[count].filename, __dirname + "/Uploads/Blogs/" + req.body.title + "/" + req.files.additionalImages[count].originalname, function(err)
		{
			if(err)
			{
				console.log(err);
				res.status(500).send("Rename error, try again.");
				error = true;
			}	
		});
	}
			
	if(error)
	{
		deleteAdditional(req, res, fs, mongoose);
		deleteFiles(req, res, fs, mongoose);
	}
	
	else
	{
		if(req.body.admin == 'true')
		{
			
		}
		
		else
		{
			addToDB(req, res, fs, mongoose);
		}
	}
}

function deleteAdditional(req,res,fs, mongoose)
{
	for(var count = 0; count < req.files.additionalImages.length; count++)
	{	
		fs.unlink(__dirname + "/Uploads/" + req.files.additionalImages[count].filename, function(err)
		{
			if(err)
			{
				console.log(err);
			}	
		});
	}
	
	deleteCover(req, res, fs, mongoose);
	
	return 0;
}

function addToDB(req, res, fs, mongoose)
{
	var additionalPics = collectAdditionalImages(req, res);
	
	var Blog = require("./blogModel");
	
	var newBlog = new Blog({Author: req.body.user, Title: req.body.title, Commentary: req.body.commentary, "Likes.number": 0, VideoLink: req.body.videoLink, CoverImg: req.files.coverImg[0].originalname, AdditionalImages: additionalPics, Author: req.body.user}).save(function(err)
	{
		if(err)
		{
			console.log(err);
			
			if(err.code == 11000)
			{
				res.status(200).send("Duplicate blog entry in database, please enter another title.");
				deleteFiles(req, res, fs, mongoose);			}
			
			else
			{
				res.status(500).send("Insertion Error");
				deleteFiles(req, res, fs, mongoose);
			}
		}
		
		else
		{
			res.status(200).send("Blog uploaded and awaiting confirmation by the site administrator.");
		}
	});
}

function collectAdditionalImages(req, res)
{
	var images = [];
	
	for(var count = 0; count < req.files.additionalImages.length; count++)
	{
		images.push(req.files.additionalImages[count].originalname);
	}
	
	return images;
}
module.exports = newBlog;
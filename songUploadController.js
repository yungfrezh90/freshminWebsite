var fs = require("fs")

function initiate(req, res, mongoose)
{
	//console.log(req.body);
	createSongsDirectory(req,res,mongoose);
}

function createUploadsDirectory(req, res, mongoose)
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
					res.status(500).send("File system error, try again.");
					deleteFiles(req, res);
				}
					
				else
				{
					createSongsDirectory(req, res,mongoose);
				}
			});
		}
		
		else
		{
			createSongsDirectory(req, res, mongoose);
		}
	});
}

function createSongsDirectory(req, res, mongoose)
{
	fs.readdir(__dirname + "/Uploads/Songs", function(err)
	{
		if(err)
		{
			fs.mkdir(__dirname + "/Uploads/Songs", function(err)
			{
				if(err)
				{
					console.log(err);
					res.status(500).send("File system error, try again.");
					deleteFiles(req, res);
				}
					
				else
				{
					checkSingleDirectory(req, res,mongoose);
				}
			});
		}
		
		else
		{
			checkSingleDirectory(req, res, mongoose);
		}
	});
}

function checkSingleDirectory(req, res, mongoose)
{
		fs.readdir(__dirname + "/Uploads/Songs/" + req.body.songTitle, function(err)
		{
			if(err)
			{
				fs.mkdir(__dirname + "/Uploads/Songs/" + req.body.songTitle, function(err)
				{
					if(err)
					{
						res.status(500).send("File system error, try again.");
						deleteFiles(req, res);
					}
					
					else
					{
						renameFiles(req, res, mongoose);
					}
				});
			}
			
			else
			{
				res.status(200).send("Rename your song title and try again.");
				deleteFiles(req, res);
			}
		});
}

function deleteFiles(req, res)
{
	fs.unlink(__dirname + "/Uploads/" + req.files.song[0].filename, function(err)
	{
		if(err)
		{
			console.log(err);
		}
	});
	
	fs.unlink(__dirname + "/Uploads/" + req.files.songCoverImg[0].filename, function(err)
	{
		if(err)
		{
			console.log(err);
		}
	});
}

function renameFiles(req, res, mongoose)
{
	//console.log(req.files.song[0]);
	
	fs.rename(__dirname + "/Uploads/" + req.files.song[0].filename, __dirname + "/Uploads/Songs/" + req.body.songTitle + "/" + req.files.song[0].originalname, function(err)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Rename Error");
			deleteFiles(req, res);
		}
		
		else
		{
			//console.log("Song Rename Successful");
			
			fs.rename(__dirname + "/Uploads/" + req.files.songCoverImg[0].filename, __dirname + "/Uploads/Songs/" + req.body.songTitle + "/" + req.files.songCoverImg[0].originalname, function(err)
			{
				if(err)
				{
					console.log(err);
					res.status(500).send("Rename Error");
					deleteFiles(req, res);
				}
				
				else
				{
					newSong(req, res, mongoose);
				}
			});
		}
	});
}

function newSong(req,res,mongoose)
{
	var error =  null;
	
	var postData = {};
	
	postData.Title = req.body.songTitle;
	
	postData.Artist = {};
		
	postData.Artist.Name = req.body.artistName;
		
	postData.Artist.MediaContacts = checkSocial(req,res);
	
	postData.Likes = 0;

	postData.File = req.files.song[0].originalname;
		
	postData.CoverImg = req.files.songCoverImg[0].originalname;
		
	if(req.body.videoLink == "" || req.body.videoLink == " ")
	{
		postData.VideoLink = null;
	}
		
	else
	{
		postData.VideoLink = req.body.videoLink;
	}
		
	addToDB(req, res, mongoose, postData);
}

function checkSocial(req, res)
{
	var social = {};
	
	if(req.body.artistMediaFB == "" || req.body.artistMediaFB == " ")
	{
		social.FB = null;
	}
	
	else
	{
		social.FB = req.body.artistMediaFB;
	}
	
	if(req.body.artistMediaInsta == "" || req.body.artistMediaInsta == " ")
	{
		social.Insta = null;
	}
	
	else
	{
		social.Insta = req.body.artistMediaInsta;
	}
	
	if(req.body.artistMediaSC == "" || req.body.artistMediaSC == " ")
	{
		social.SC = null;
	}
	
	else
	{
		social.SC = req.body.artistMediaSC;
	}
	
	if(req.body.artistMediaTwit == "" || req.body.artistMediaTwit == " ")
	{
		social.Twit = null;
	}
	
	else
	{
		social.Twit = req.body.artistMediaTwit;
	}
	
	return social;
}

function addToDB(req, res, mongoose, postData)
{
	var Song = require("./songModel");
	
	var newSong = new Song(postData).save(function(err)
	{		
		if(err)
		{
			console.log(err);
			
			if(err.code == 11000)
				res.status(200).send("Rename song title and try again.");
			else
			{
				res.status(500).send("Insertion Error");
				deleteFiles(req, res);
			}
		}
						
		else
		{
			res.status(200).send("Song Added");
		}
	});
}

module.exports = initiate;
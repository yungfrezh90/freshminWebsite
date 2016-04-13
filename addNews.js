function checkDirectory(req, res,fs)
{
	var fs = require("fs");
	
	fs.readdir(__dirname + "/Uploads/News", function(err)
	{
		if(err)
		{	
			if(err.code == "ENOENT")
			{
				createNewsDirectory(req, res, fs);
			}
			
			else
			{
				res.status(500).send("File system error, try again.");
			}
		}
		
		else
		{
			createNewsEntryDirectory(req, res, fs);
		}
	});
}

function createNewsDirectory(req, res, fs)
{
	fs.mkdir(__dirname + "/Uploads/News", function(err)
	{
		if(err)
		{
			//console.log(err);
			if(err.code = "EEXIST")
			{
				//renameFile(req, res, fs);
				createNewsEntryDirectory(req, res, fs)
			}
						
			else
			{
				res.status(500).send("File system error, try again.");
			}
		}

		else
		{
			createNewsEntryDirectory(req, res, fs);
		}
	});
}

function createNewsEntryDirectory(req, res, fs)
{
	fs.mkdir(__dirname + "/Uploads/News/" + req.body.title, function(err)
	{
		if(err)
		{
			//console.log(err);
			if(err.code = "EEXIST")
			{
				res.status(200).send("News title taken, choose new title.");
			}
						
			else
			{
				res.status(500).send("File system error, try again.");
			}
		}

		else
		{
			renameFile(req, res, fs);
		}
	});	
}

function renameFile(req, res, fs)
{
	//var fs = require("fs");
	
	//console.log("Here");

	fs.rename(__dirname + "/Uploads/" + req.file.filename, __dirname + "/Uploads/News/" + req.body.title + "/" + req.file.originalname, function(err)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("File system error, try again.");
			deleteFile(req, res, fs);
		}
		
		else
		{
			addNews(req, res);
		}
	});
}

function addNews(req, res)
{
	//console.log("Here now");
	
	var News = require("./newsModel");
	
	var newNews = new News({Title: req.body.title, date: req.body.date, Commentary: req.body.commentary, Img: req.file.originalname}).save(function(err)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Insertion error, try again");
			//deleteFile(req, res, fs);
		}
		
		else
		{
			res.status(200).send("News added.");
		}
	});
}

function deleteFile(req, res, fs)
{
	
	fs.unlink(__dirname + "/Uploads/" + req.file.filename, function(err)
	{
		if(err)
		{
			console.log(err);
		}
	});
}

module.exports = checkDirectory;
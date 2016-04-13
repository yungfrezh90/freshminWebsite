function newVideo(req, res, mongoose)
{
	var Video = require("./videoModel");
	
	var newVideo = new Video({Title: req.body.title, "Likes.number": 0, Link: req.body.link, Commentary: req.body.commentary}).save(function(err)
	{
		if(err)
		{
			console.log(err);
			
			if(err.code == 11000)
			{
				res.status(200).send("There is a duplicate video entry, please enter another title.");
			}
			
			else
			{
				res.status(500).send("Insertion Error");
			}
		}
		
		else
		{
			res.status(200).send("Video Added");
		}
	});
}

module.exports = newVideo;
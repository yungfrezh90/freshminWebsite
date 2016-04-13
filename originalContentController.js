function addToDB(req, res, mongoose)
{
	//console.log(req.body);
	
	var Post = require("./originalModel");
		
	var newPost = new Post({Commentary: req.body.commentary, "Likes.number": 0, Title: req.body.title, VideoLink: req.body.content, Type: req.body.type}).save(function(err)
	{
		if(err)
		{
			if(err.code == 11000)
			{
				res.status(200).send("Duplicate title in database, please enter another name.");
			}
			
			else
			{
				res.status(500).send("Insertion errror, try to resubmit request.");
			}
		}
				
		else
		{
			res.status(200).send("Post inserted.");
		}
	});
}

module.exports = addToDB;
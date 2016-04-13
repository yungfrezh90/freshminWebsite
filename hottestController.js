
function addToDB(req, res, mongoose)
{
	console.log(req.body.video);
	
	var Hottest = require("./hottestModel");
	
	var newHottest = new Hottest({Link: req.body.video}).save(function(err)
	{		
		if(err)
		{
			console.log(err);
			res.status(500).send("Insertion error.");
		}
						
		else
		{
			res.status(200).send("Hottest added.");
		}
	});
}

module.exports = addToDB;
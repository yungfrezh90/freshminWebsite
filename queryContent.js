function queryContent(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection(req.query.media + "s");
	
	collection.findOne({Title: req.query.title}, function(err, results)
	{
		if(err)
		{
			res.send("Error").status(500);
		}
		
		else
		{
			res.send(results).status(200);
			//console.log(results);
		}
	});
}

module.exports = queryContent;
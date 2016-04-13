function getSingles(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection("Songs");
	
	collection.find({}).sort({DateAdded: -1}).toArray(function(err, results)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Query error, try again.");
		}
		
		else
		{
			res.status(200).json(JSON.stringify(results));
		}
	});
}

module.exports = getSingles;
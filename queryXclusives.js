function readXclusives(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection("Xclusives");
	
	collection.find({}).sort({date: -1}).toArray(function(err, results)
	{
		if(err)
		{
			console.log(err);
			
			res.status(500).send("Query error.");
		}
		
		else
		{
			res.status(200).json(results);
		}
	});
}

module.exports = readXclusives;
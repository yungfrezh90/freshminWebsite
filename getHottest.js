function readHottest(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection("HottestOfWeek");
	
	collection.find({}).sort({date: -1}).limit(1).toArray(function(err, result)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Error");
		}
		
		else
		{
			res.status(200).json(result);
		}
	});
}

module.exports = readHottest;
function queryBlogs(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection("Blogs");
	
	if(req.query.skip)
	{
	
		collection.find({}).sort({'date': -1}).skip(Number( 10 * (Number(req.query.skip) - 1))).limit(10).toArray(function(err, results)
		{
			if(err)
			{
				console.log(err);
				res.status(200).send("Query error, try again.")
			}
			
			else
			{
				//console.log(err);
				res.status(200).json(results);
			}
		});
	}
	
	else
	{
		collection.find({}).sort({'date': -1}).limit(10).toArray(function(err, results)
		{
			if(err)
			{
				console.log(err);
				res.status(200).send("Query error, try again.")
			}
			
			else
			{
				//console.log(err);
				console.log(results);
				res.status(200).json(results);
			}
		});		
	}
}

module.exports = queryBlogs;
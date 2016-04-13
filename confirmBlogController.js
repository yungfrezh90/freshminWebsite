function confirmBlog(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	var collection = db.collection("Blogs");
	
	collection.update({Title: ""}, {$set: {Confirmed: "Y"}, function(err)
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Blog confirmed.");
		}
		
		else
		{
			res.status(200).send("Update error.");
		}
	});
}
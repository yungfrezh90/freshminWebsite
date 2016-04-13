function confirm(req, res, mongoose)
{
	var db = mongoose.connection.db;
	
	console.log(req.body.user);
	
	var collection = db.collection("Users");
	
	collection.update({User: req.body.user}, {$set: {Confirmed: "Y"}}, function(err)	
	{
		if(err)
		{
			console.log(err);
			res.status(500).send("Update error, try again");
		}
		
		else
		{
		
			res.status(200).send("Membership confirmed.");
		}
	});
}

module.exports = confirm;
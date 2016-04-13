var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080, mongodb_connection_string = '127.0.0.1:27017/freshminlifestyle', server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1', http = require('http'), express = require('express'), app = express(), fs = require("fs"), mongoose = require("mongoose"), multer = require('multer'), uploader = multer({dest: "Uploads/"});

app.listen(server_port, server_ip_address, function()
{
	console.log("Listening on " + server_ip_address + ", server_port " + server_port);
	
			
			app.get("/", function(req, res)
			{
				res.sendFile(__dirname + "/home.html");
			});
	
});
		

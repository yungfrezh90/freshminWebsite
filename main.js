var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080, mongodb_connection_string = '127.0.0.1:27017/freshminlifestyle', server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1', http = require('http'), express = require('express'), app = express(), fs = require("fs"), mongoose = require("mongoose"), multer = require('multer'), uploader = multer({dest: "Uploads/"}), singles = require("./songUploadController"), authCreation = require("./authCreationController"), collectionSize = require("./collectionSizeController"), favicon = require("serve-favicon"), getNews = require("./queryNews"), getXclusiveVids = require("./queryXclusiveVids"), getInterviews = require("./queryInterviews"), queryTrending = require("./queryTrending"),queryLikes = require("./queryLikes"), queryContent = require("./queryContent"), deleteContent = require("./deleteContentController"), forgotPass = require("./forgotPasswordController"), forgotUser = require("./forgotUserController"), updateContent = require("./updateContentController"), addLike = require("./addLikeController"), newNews = require("./addNews"), getVideos = require("./queryVideos"), getXclusives = require("./queryXclusives"), bloggerRequests = require("./queryRequestsController"), getBlogRequests = require("./queryBlogRequests"), confirmBlog = require("./blogConfirmController"), removeBlog = require("./blogRemoveController"), confirmBlogger = require("./addBloggerController"), removeBlogger = require("./removeBloggerController"), checkUsername = require("./checkUsernameController"), getHottest = require("./getHottest"), newVideo = require("./videoController"), confirmMember = require("./confirmMemberController"), getBlogs = require("./queryBlogs"), newUser = require("./signUpController"), newBlog = require("./blogController"), logIn = require("./logInController"), bulkEmail = require("./emailController"), newHottest = require("./hottestController"), bloggerRequest = require("./bloggerRequestController.js"), queryAll = require("./queryAll"), addOriginalContent = require("./originalContentController");

app.listen(server_port, server_ip_address, function()
{
	console.log("Listening on " + server_ip_address + ", server_port " + server_port);
	
	mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" + process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +process.env.OPENSHIFT_APP_NAME, function(err)
	{
		if(err)
		{
			console.log(err);
		}
		
		else
		{
			app.get("/copyRightImage", function(req, res)
			{
				res.sendFile(__dirname + "/copyright.png");
			});
			
			app.get("/getSingle", function(req, res)
			{
				res.sendFile(__dirname + "/Uploads/Songs/" + req.query.title + "/" + req.query.track);
			});
			
			app.get("/getSingleCover", function(req, res)
			{
				res.sendFile(__dirname + "/Uploads/Songs/" + req.query.title + "/" + req.query.image);
			});
			
			app.get("/player", function(req, res)
			{
				res.sendFile(__dirname + "/trackPlayer.html");
			});
			
			app.get("/getSingles", function(req, res)
			{
				var getSingles = require("./querySingles");
				
				getSingles(req, res, mongoose);
			});
			
			app.get("/about", function(req, res)
			{
				res.sendFile(__dirname + "/about.html");
			});
			
			app.get("/searchPage", function(req, res)
			{
				res.sendFile(__dirname + "/searchPage.html");
			});
			
			app.get("/collectionSize", function(req, res)
			{
				collectionSize(req, res, mongoose);
			});
			
			app.get("/authForm", function(req, res)
			{
				res.sendFile(__dirname + "/authForm.html");
			});
			
			app.get("/trending", function(req, res)
			{
				queryTrending(req, res, mongoose);
			});
			
			app.get("/", function(req, res)
			{
				res.sendFile(__dirname + "/home.html");
			});
			
			app.get("/forgotPassword", function(req, res)
			{
				forgotPass(req, res, mongoose);
			});

			app.get("/forgotUser", function(req, res)
			{
				forgotUser(req, res, mongoose);
			});
			
			app.get("/siteLogo", function(req, res)
			{
				res.sendFile(__dirname + "/3-2.jpg");
			});
			
			app.get("/signUp", function(req, res)
			{
				res.sendFile(__dirname + "/signUp.html");
			});
			
			app.get("logIn/", function(req, res, mongoose)
			{
				res.sendFile(__dirname + "/logIn");
			});
			
			app.get("/queryLikes", function(req, res)
			{
				queryLikes(req, res, mongoose);
			});
			
			app.get("/news", function(req, res)
			{
				res.sendFile(__dirname + "/newsTemplate.html");
			});
			
			app.get("/getNews", function(req, res)
			{
				getNews(req, res, mongoose);
			});
			
			app.get("/searchAll", function(req, res)
			{
				queryAll(req, res, mongoose);
			});
			
			app.get("/updateContent", function(req, res)
			{
				res.sendFile(__dirname + "/updateContent.html");
			});
			
			app.get("/forgotPass", function(req, res)
			{	
				res.sendFile(__dirname + "/forgotPassword.html");
			});
			
			app.get("/forgotUsername", function(req, res)
			{	
				res.sendFile(__dirname + "/forgotUsername.html");
			});
			
			app.get("/hottestImage", function(req, res)
			{
				res.sendFile(__dirname + "/Uploads/Hottest/" + req.query.image);
			});
			
			app.get("/socialImages", function(req, res)
			{
				res.sendFile(__dirname + "/Social Media/" + req.query.image);
			});
			
			app.get("/getNewsImage", uploader.array(), function(req, res)
			{
				//console.log(req.query);
				
				res.sendFile(__dirname + "/Uploads/News/" + req.query.title + "/" + req.query.img);
			});
			
			app.get("/getBlogFiles", function(req, res)
			{
				var blogDirectoryName = req.query.title;
				
				var file = req.query.file;
				
				res.sendFile(__dirname + "/Uploads/Blogs/" + blogDirectoryName + "/" + req.query.file);
			});
			
			app.get("/addLike", uploader.array(), function(req, res)
			{
				//console.log(req.query);
				addLike(req, res, mongoose);
			});
			
			app.get("/searchContent", function(req, res)
			{
				var searchContent = require("./searchContent");
				
				searchContent(req, res, mongoose);
			});
			
			app.get("/newsAdmin", function(req, res)
			{
				res.sendFile(__dirname + "/newsAdmin.html");
			});
			
			app.get("/getBlogImage", uploader.array(), function(req, res)
			{
				res.sendFile(__dirname + "/Uploads/Blogs/" + req.query.title + "/" + req.query.file);
			});
			
			app.get("/EmailImages", uploader.array(), function(req, res)
			{
				//console.log(req.query.image);
				res.sendFile(__dirname + "/Uploads/EmailImages/" + req.query.image);
			});
			
			app.get("/checkUsername", uploader.array(), function(req,res)
			{
				checkUsername(req, res, mongoose);
			});

			app.get("/logIn", function(req, res)
			{
				res.sendFile(__dirname + "/logIn.html");
			});
			
			
			app.get("/logInInvalid", function(req, res)
			{
				res.sendFile(__dirname + "/logInInvalid.html" );
			});
			
			app.get("/logInConfirm", function(req, res)
			{
				res.sendFile(__dirname + "/logInConfirm.html" );
			});
			
			app.get("/logInError", function(req, res)
			{
				res.sendFile(__dirname + "/logInError.html" );
			});
			
			app.get("/blogUpload", function(req, res)
			{
				res.sendFile(__dirname + "/blogUpload.html");
			});

			app.get("/bloggerRequest", function(req, res)
			{
				res.sendFile(__dirname + "/bloggerRequest.html");
			});

			app.get("/emailUsers", function(req,res)
			{
				res.sendFile(__dirname + "/emailUsers.html");
			});

			app.get("/originalAdmin", function(req, res)
			{
				res.sendFile(__dirname + "/originalContent.html");
			});

			app.get("/hottest", function(req, res)
			{
				res.sendFile(__dirname + "/hottestAdmin.html");
			});
			
			app.get("/hottestTest", function(req, res)
			{
				res.sendFile(__dirname + "/hottestTemplate.html");
			});
			
			app.get("/getImage", uploader.array(), function(req, res)
			{
				var image = req.query.image;
				
				res.sendFile(__dirname + "/" + image);
			});
			
			app.get("/getXclusives", function(req, res)
			{
				getXclusives(req, res, mongoose);
			});
			
			app.get("/getInterviews", function(req, res)
			{
				getInterviews(req, res, mongoose);
			});
			
			app.get("/xclusiveVideos", function(req, res)
			{
				res.sendFile(__dirname + "/xclusiveVids.html");
			});
			
			app.get("/getXclusiveVids", function(req, res)
			{
				getXclusiveVids(req, res, mongoose);
			});
			
			app.get("/interviews", function(req, res)
			{
				res.sendFile(__dirname + "/interviews.html");
			});
			
			app.get("/content", function(req, res)
			{
				res.sendFile(__dirname + "/contentTemplate.html")
			});

			app.get("/contentQuery", uploader.array(), function(req, res)
			{
				//console.log(req.query.title + " " + req.query.media);
				queryContent(req, res, mongoose);
				//res.sendFile(__dirname + "/content.html");
			});
			
			app.get("/videos", function(req, res)
			{
				res.sendFile(__dirname + "/videos.html");
			})
			
			app.get("/getVideos", function(req, res)
			{
				getVideos(req, res, mongoose);
			});
			
			app.get("/blogImages", function(req, res)
			{
				//console.log(req.query.image + " " + req.query.title);
				
				res.sendFile(__dirname + "/Uploads/Blogs/" + req.query.title + "/" + req.query.image);
			
			});
			
			app.get("/bloggersAdmin", function(req, res)
			{
				res.sendFile(__dirname + "/bloggersAdmin.html");
			});
			
			app.get("/previouslyRegistered", function(req, res)
			{
				res.sendFile(__dirname + "/previouslyRegistered.html");
			});
			
			app.get("/blogs", function(req, res)
			{
				res.sendFile(__dirname + "/blogs.html");
			});
			
			app.get("/getBlogRequests", function(req, res)
			{
				getBlogRequests(req, res, mongoose);
			});
			
			app.get('/bloggerQuery', function(req, res)
			{
				bloggerRequests(res,mongoose);
			});
			
			app.get("/videoAdmin", function(req, res)
			{
				res.sendFile(__dirname + "/videoAdmin.html");
			});
			
			app.get("/confirmBlogger", uploader.array(), function(req, res)
			{
				confirmBlogger(req, res, mongoose);
			});
			
			app.get("/deleteContent", function(req, res)
			{
				res.sendFile(__dirname + "/deleteContent.html");
			});
			
			app.get("/removeBlogger", function(req, res)
			{
				removeBlogger(req, res, mongoose);
			});
			
			app.get("/blogAdmin", uploader.array(), function(req, res)
			{
				res.sendFile(__dirname + "/blogAdmin.html");
			});
			
			app.get("/getBlogs", function(req, res)
			{	
				getBlogs(req, res, mongoose);
			});
			
			app.get("/getHottest", function(req, res)
			{
				//console.log("hit");
				getHottest(req, res, mongoose);
			});
			
			app.get("/singles", function(req, res)
			{
				res.sendFile(__dirname + "/songUpload.html");
			});
			
			app.get("/confirmBlog", uploader.array(), function(req, res)
			{
				confirmBlog(req, res, mongoose);
			});
			
			app.post("/authCreation", uploader.array(), function(req, res)
			{
				console.log("Chea");
				authCreation(req, res, mongoose);
			});

			app.post("/logIn", uploader.array(), function(req, res)
			{
				logIn(req, res, mongoose);
			});

			app.post("/signUp", uploader.array(), function(req, res)
			{
				//console.log("Hit");
				newUser(req,res,mongoose);
			});

			app.post('/emailUsers', uploader.fields([{name: 'image', maxCount: 1}]), function(req,res)
			{
				bulkEmail(req, res);	
			});
			
			app.post("/forgotPass", uploader.array(), function(req, res)
			{
				forgotPass(req, res, mongoose);
			});
			
			app.post("/forgotUser", uploader.array(), function(req, res)
			{
				forgotUser(req, res, mongoose);	
			});
			
			app.post("/videoAdmin", uploader.array(), function(req, res)
			{
				newVideo(req,res,mongoose);
			});

			app.post("/originalContent", uploader.array(), function(req,res)
			{
				addOriginalContent(req, res, mongoose);
			});	

			app.post("/hottestUpload", uploader.array(), function(req, res)
			{
				//console.log("Chea");
				
				newHottest(req, res, mongoose);
			});
			
			app.post("/blogUpload", uploader.fields([{name: 'coverImg', maxCount: 1}, {name: 'additionalImages', maxCount: 4}]), function(req, res)
			{
				newBlog(req, res, mongoose, fs);
			});

			app.post("/bloggerRequest", uploader.array(), function(req, res)
			{
				//console.log(req.body);
				bloggerRequest(req, res, mongoose);
			});
			
			app.post("/confirmMembership", uploader.array(), function(req, res)
			{
				confirmMember(req, res, mongoose);
			});
			
			app.post("/removeBlog", uploader.array(), function(req, res)
			{
				removeBlog(req, res, mongoose);
			});
			
			app.post("/news", uploader.single("img"), function(req, res)
			{
				//console.log(req.file);
				newNews(req, res);
			});
			
			app.post("/updateContent", uploader.array(), function(req, res)
			{
				updateContent(req, res, mongoose);
			});

			app.post("/singleUpload", uploader.fields([{name: 'song', maxCount: 1}, {name: 'songCoverImg', maxCount: 1}]),  function(req, res)
			{
				//console.log(req.body);
				singles(req, res, mongoose);
			});
			
			app.post("/deleteContent", uploader.array(), function(req, res)
			{
				deleteContent(req, res, mongoose);
			});
		}
	});
	
});
		

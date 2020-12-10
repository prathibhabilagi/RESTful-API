const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const articleSchema = {
	title: String,
	content: String
};

const Article = mongoose.model("Article", articleSchema);

///////////////////////////////////Requests Targetting All Articles/////////////////////////////////
app.route("/articles")
	
	.get(function (req, res) {
		if(!err){
			Article.find(function(err, foundArticles){
			res.send(foundArticles);
			});
		}else{
			res.send(err);
		}
	})

	.post(function(req, res){
		const newArticle = new Article({
			title: req.body.title,
			content: req.body.content 
		});

		newArticle.save(function(err){
			if(!err){
				res.send("Sucessfully added new article");
			}else{
				res.send(err);
			}
		});
	})

	.delete(function(req, res){
		Article.deleteMany(function(err){
			if(!err){
				res.send("Sucessfully deleted all articles");
			}else{
				res.send(err);
			}
		});
	});

///////////////////////////////////Requests Targetting A Specific Article/////////////////////////////////



app.listen(process.env.PORT || 3000, function(){
	console.log("Server Started");
});
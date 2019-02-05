var express = require('express');
var router = express.Router();

var isAuthenticated = require('../functions/isAuthenticated.js');
var handleError = require('../functions/handleError.js');

var User = require('../models/user');
var Info = require('../models/info');
var Infosys = require('../models/infosys');


module.exports = function(passport){

	router.get('/', function(req,res){

		if (!req.query["search"] || req.query["search"].length < 3){
			res.render("index")
		}

		else {
			var query = {data: {'$regex': req.query["search"], "$options": "i"}}

			Infosys.findOne({}, function (err, infosys){
				if (err) return handleError(err,req,res);
				if (infosys){
					//console.log(infosys)

					Info.find(query, function(err, info){
						if (err) return handleError(err,req,res);
						//console.log(info)
						res.render("index", {info: info, infosys: infosys})
					});

				}
				else{

					res.send("Contact admin, INFOSYS not found.")

				}
			});
		}
		
	})

	router.get('/init', function(req,res){
		User.remove({}, function(err) {
			var newUser = new User();
			newUser.username = "admin";
			newUser.password = newUser.generateHash("admin");

			newUser.save(function(err) {
				if (err) return handleError(err,req,res);
				res.redirect("/");
			});
		});
	});

	router.get('/updatedb',function(req, res) {
		res.render("updatedb")
	});

	router.post('/updatedb', function(req, res) {
		//console.log(req.body.data)
		var data = req.body.data;

		Infosys.remove({}, function(err) { 
			var newInfosys = new Infosys();
			newInfosys.data = data[0];
			newInfosys.size = data[0].length;
			newInfosys.save(function(err) {
				if (err) return handleError(err,req,res);
			});
		});

		Info.remove({}, function(err) { 
			for (var i = 1; i < data.length; i++){
				var newInfo = new Info();
				newInfo.data = data[i];
				newInfo.save(function(err) {
					if (err) return handleError(err,req,res);
				});
			}
		});

		res.send({message: "updated"})

	});

	router.get('/teste',function(req, res) {
		res.render("teste")
	});

	return router;
}

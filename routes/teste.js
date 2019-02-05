var express = require('express');
var router = express.Router();

var isAuthenticated = require('../functions/isAuthenticated.js');
var handleError = require('../functions/handleError.js');
var isModerator = require('../functions/isModerator.js');

var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto')

var User = require('../models/user');
var Infosys = require('../models/infosys');
var Suggestion = require('../models/suggestion');

module.exports = function(passport){

	//#region /TESTE
	
	router.get('/a', function(req, res) {

		var newInfosys = new Infosys();
		newInfosys.usernames = {};

		newInfosys.categories = ["Film", "Music"];
		newInfosys.types = {
			"IMDb" : {
				fontAwesome: "fab fa-imdb",
				color: {color: "goldenrod"},
				size: {"font-size": "35px"},
				category: ["Film"]
			},
			"YouTube" : {
				fontAwesome: "fab fa-youtube",
				color: {color: "red"},
				size: {"font-size": "35px"},
				category: ["Film", "Music"]
			},
			"Spotify" : {
				fontAwesome: "fab fa-spotify",
				color: {color: "green"},
				size: {"font-size": "35px"},
				category: ["Music"]
			},
		}

		res.render("teste3", {infosys:newInfosys})
	});

	router.get('/teste2', isModerator, function(req, res) {

		console.log("a")

		var infosys = {
			categories: ["fruta", "legume"],
			types: {
				"batata" : {
					category: ["legume"]
				},
				"abacaxi" :{
					category: ["fruta"]
				},
				"tomate": {
					category: ["fruta", "legume"]
				}

			}
		}
		res.render("teste2", {infosys:infosys})
	});

	router.get('/teste', function(req, res) {
		res.render("teste")
	});

	router.post('/teste', function(req, res) {
		console.log(req.body.data)
		res.send(req.body.data)
	});

	//#endregion

    return router;

}
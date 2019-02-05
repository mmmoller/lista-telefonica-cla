var express = require('express');
var router = express.Router();
var isAuthenticated = require('../functions/isAuthenticated.js');
var handleError = require('../functions/handleError.js');

var User = require('../models/user');
var Infosys = require('../models/infosys');
var Suggestion = require('../models/suggestion');

module.exports = function(passport){

    // System 
    router.get('/infosys', function(req, res) {
        var newInfosys = new Infosys();
        newInfosys.usernames = {};
        newInfosys.categories = ["Film", "Music"];
        newInfosys.types = {
            "IMDb" : {
                fontAwesome: "fab fa-imdb",
                color: {color: "goldenrod"},
                size: {"font-size": "35px"},
                category: "Film"
            },
            "YouTube" : {
                fontAwesome: "fab fa-youtube",
                color: {color: "red"},
                size: {"font-size": "35px"},
                category: "Music"
            },
            "Spotify" : {
                fontAwesome: "fab fa-spotify",
                color: {color: "green"},
                size: {"font-size": "35px"},
                category: "Music"
            },
        }

        newInfosys.save(function (err) {
            if (err) return handleError(err,req,res);
            res.send("teste");
        });
    })

    router.get('/delete', function(req, res){
        User.remove({}, function(err) { 
            console.log('Users removed')
        });
        Infosys.remove({}, function(err) { 
            console.log('Infosys removed')
        });
        Suggestion.remove({}, function(err) { 
            console.log('Suggestions removed')
        });
        res.send("Deletado");
    });

    router.get('/r', function(req, res){
        
        Suggestion.remove({}, function(err) { 
            console.log('Suggestions removed')
        });

        Infosys.remove({}, function(err) {

            User.remove({}, function(err) { 

                console.log('Users removed')
                var newUser = new User();
                newUser.local.email = "admin";
                newUser.local.password = newUser.generateHash("admin");
                newUser.username = "admin"
                newUser.permission = 2;

                console.log('Infosys removed')
                var newInfosys = new Infosys();
                newInfosys.usernames = {};
                newInfosys.usernames[newUser._id] = newUser.username;
                newInfosys.markModified("usernames");

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

                newUser.save(function(err) {
                    if (err) return handleError(err,req,res);
                    newInfosys.save(function (err) {
                        if (err) return handleError(err,req,res);
                        res.redirect("/");
                    });
                });

                

                

            });

            
        });
    });
    
    return router;
}
var mongoose = require('mongoose');

var infoSchema = mongoose.Schema({

    data: {type: [String], default: []},
    

}, {minimize: false});

module.exports = mongoose.model('Info', infoSchema);
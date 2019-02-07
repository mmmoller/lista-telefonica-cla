var mongoose = require('mongoose');

var infosysSchema = mongoose.Schema({

	data: {type: [String], default: []},

}, {minimize: false});

module.exports = mongoose.model('Infosys', infosysSchema);
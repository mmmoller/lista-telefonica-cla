var mongoose = require('mongoose');

var infosysSchema = mongoose.Schema({

	data: {type: [String], default: []},
	size: Number

}, {minimize: false});

module.exports = mongoose.model('Infosys', infosysSchema);
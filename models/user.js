var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

    username: String,
    password: String
    
}, {minimize: false});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// checking if token is valid
userSchema.methods.validToken = function(token){
	return bcrypt.compareSync(token, this.google.token);
}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
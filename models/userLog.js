const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserLogSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserLog = mongoose.model('userlog', UserLogSchema);

module.exports = UserLog;

module.exports.createUser = function(newUserLog, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUserLog.password, salt, function(err, hash) {
            // Store hash in your password DB.
            newUserLog.password = hash;
            newUserLog.save(callback);
        });
    });
}

module.exports.getUserByUsername = function(username, callback){
    UserLog.findOne({username : username}, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    // Load hash from your password DB.
    // isMatch is Respond
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        // res === true
        if(err) throw err;
        callback(null, isMatch);
    });
}
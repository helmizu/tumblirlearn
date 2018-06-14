var express = require('express');
var router = express.Router();
var UserLog = require('../models/userLog');

// GET users listing
router.get('/', function(req, res, next) {
    res.render('register', {title: 'Register'});
});
//Create to MongoDB
router.post('/', function(req, res, next) {
    var newUser = new UserLog({
        username : req.body.username,
        password : req.body.password
    });

    UserLog.createUser(newUser, function(err, user){
        if(err) throw err;
        console.log(user);
    });
    
    req.flash('success_msg', 'You\'re registered');
    res.redirect('/login');
});
module.exports = router;

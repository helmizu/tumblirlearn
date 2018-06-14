var express = require('express');
var router = express.Router();
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var UserLog = require('../models/userLog');

function cekLogin(req, res, next){
  if(!req.isAuthenticated()){
    return next();
  } else{
    res.redirect('/');
  }
}

// GET page
router.get('/', cekLogin, function(req, res, next) {
  res.render('login', {title: 'Login'});
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    UserLog.getUserByUsername(username, function (err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      UserLog.comparePassword(password, user.password, function(err, isMatch){
        if (err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  UserLog.findById(id, function(err, user) {
    done(err, user);
  });
});

//Login to Web
router.post('/', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.redirect('/');
});
module.exports = router;

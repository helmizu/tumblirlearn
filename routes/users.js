var express = require('express');
var router = express.Router();
var User = require('../models/users');

function cekLogin(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else{
    res.redirect('/login');
  }
}

// GET users listing
router.get('/', cekLogin, function(req, res, next) {
  User.find({}).then(function(result){
    res.render('users', {title: 'User Data', data : result});
  }).catch(next);
});
// GET user by Id
router.get('/:id', function(req, res, next) {
  User.findOne({_id: req.params.id}).then(function(result){
    res.send(result);
  }).catch(next);
});

//Create to MongoDB
router.post('/', function(req, res, next) {
  User.create(req.body).then(function(result){
    res.send(result);
  }).catch(next);
});

// Edit user
router.put('/:id', function(req, res, next) {
  User.findOneAndUpdate({_id: req.params.id}, req.body).then(function(result){
    User.findOne({_id:req.params.id}).then(function(data){
      res.send(data);
    }).catch(next);
  }).catch(next);
});

//Delete User
router.delete('/:id', function(req, res, next) {
  User.findOneAndRemove({_id: req.params.id}).then(function(result){
      res.send(result);
      console.log(result);
    }).catch(next);
});

module.exports = router;

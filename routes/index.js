var express = require('express');
var router = express.Router();

function cekLogin(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else{
    res.redirect('/login');
  }
}

/* GET home page. */
router.get('/', cekLogin, function(req, res, next) {
  res.render('index', { title: 'Express'});
});

// LOGOUT
router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/login');
})

module.exports = router;

var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

router.get('/create', function (req, res, next) {
  res.render('pages/user_register', { title: 'Register', error: "", user : req.user });
});

router.post('/login', passport.authenticate('local'), function (req, res) {
  res.redirect('/');
});

router.get('/disconnect', function (req, res, next) {
  req.session.destroy();
  res.redirect('/');
});


router.post('/create', function (req, res, next) {
  username = req.body.username;
  password = req.body.password;
  pwd2 = req.body.pwd2;

  if (password != pwd2) {
    //res.redirect('/account/create?error=same_pass');
    res.render('pages/user_register', {
      title: 'Register',
      error: "pass_not_same",
      user : req.user
    });
  }

  Account.register(new Account({ username: username }), password, function (err, account) {
    if (err) {
      // return res.render('register', { account : account });
      console.debug(err);
      res.render('pages/user_register', {
        title: 'Register',
        error: err.name,
        user : req.user
      });
    } else {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
    }

  });

});

module.exports = router;

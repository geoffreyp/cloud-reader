var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/create', function (req, res, next) {
  res.render('pages/user_register', { title: 'Register', error: "" });
});

router.post('/create', function (req, res, next) {
  username = req.body.username;
  mail = req.body.mail;
  pwd1 = req.body.pwd1;
  pwd2 = req.body.pwd2;

  if (pwd1 != pwd2) {
    //res.redirect('/account/create?error=same_pass');
    res.render('pages/user_register', {
      title: 'Register',
      error: "pass_not_same"
    });
  }

});

module.exports = router;

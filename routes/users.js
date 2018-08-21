var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/create', function(req, res, next) {
  res.render('pages/user_register', { title: 'Register' });
});

router.post('/create', function(req, res, next) {
res.send("ok");
});

module.exports = router;

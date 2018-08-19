var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Cloud Reader' });
});

router.get('/viewer', function(req, res, next) {
  res.render('pages/viewer', { title: 'Viewer', file: 'files/test.pdf' });
});

module.exports = router;

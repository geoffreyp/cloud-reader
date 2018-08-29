var express = require('express');
var router = express.Router();
var multer = require('multer');
var File = require('../models/file');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/files')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
});
var upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('pages/index', { title: 'Cloud Reader', user: req.user });
});


router.post('/upload', upload.single('pdf'), (req, res, next) => {
  var f = new File({name:req.file.filename, url:req.file.path, is_public:true, user:req.user._id});
  f.save(function (err) {
    if (err) return handleError(err);
  });

  res.redirect('/');
});

router.get('/viewer', function (req, res, next) {
  res.render('pages/viewer', { title: 'Viewer', file: 'files/test.pdf', user: req.user });
});

module.exports = router;

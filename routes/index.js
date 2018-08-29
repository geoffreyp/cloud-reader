var express = require('express');
var router = express.Router();
var multer = require('multer');
var File = require('../models/file');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/files')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/ /g, "_"))
  }
});
var upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function (req, res, next) {
  File.find({ is_public: true }, function (err, docs) {
    res.render('pages/index', { title: 'Cloud Reader', user: req.user, files: docs });
  });
});


router.post('/upload', upload.single('pdf'), (req, res, next) => {
  var f = new File({ name: req.file.filename, url: req.file.path.replace(/ /g, "_"), is_public: true, user: req.user._id });
  f.save(function (err) {
    if (err) return handleError(err);
  });

  res.redirect('/');
});

router.get('/viewer/:id', function (req, res, next) {
  var id = req.params.id;

  File.findById(id, function (err, doc) {
    res.render('pages/viewer', { title: 'Viewer', file: 'files/test.pdf', user: req.user, url: doc.url });
  });
});

module.exports = router;

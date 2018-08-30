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

router.post('/viewer/save', function (req, res, next) {
  var id = req.body.id;
  var page = req.body.page;
  if (!id || !page) {
    res.json({ error: "parameters undefined", code: "para_undef" });
  }
  if (!req.user) {
    res.json({ error: "user not connected", code: "no_connected" });
  }
});

module.exports = router;

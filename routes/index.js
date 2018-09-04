var express = require('express');
var router = express.Router();
var multer = require('multer');
var File = require('../models/file');
var Progress = require('../models/progress');

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
    if (req.user === undefined) {
      // no action when user is not logged
      res.render('pages/viewer', { title: 'Viewer', user: req.user, url: doc.url, progress: -1 });
    } else {
      doc_url = doc.url;
      // get progress or save a new progress if the user is connected
      Progress.findOne({ user: req.user._id, file: id }, function (err, doc) {
        if (doc == null) {
          Progress.create({ user: req.user._id, file: id, page: 1 }, function (err, small) {
            if (err) return handleError(err);
          });
          page_progress = 1
        } else {
          page_progress = doc.page
        }

        res.render('pages/viewer', { title: 'Viewer', user: req.user, url: doc_url, progress: page_progress });
      });

    }

  });
});

router.post('/viewer/save', function (req, res, next) {
  var id = req.body.id;
  var page_nb = req.body.page;
  if (!id || !page_nb) {
    res.json({ error: "parameters undefined", code: "para_undef" });
  }
  if (!req.user) {
    res.json({ error: "user not connected", code: "no_connected" });
  }

  Progress.findOneAndUpdate({ user: req.user._id, file: id }, { page: page_nb }, function (err, doc) {
    res.json({ message: "success", progress: doc })
  })
});

module.exports = router;

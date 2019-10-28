const express = require('express');
const expressJwt = require('express-jwt');
const fs = require('fs');
const multer = require('multer');
const config = require('../../config');

const authRoute = require('./auth.route');
const entryRoute = require('./entry.route');
const userRoute = require('./user.route');
const profileRoute = require('./profile.route');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();
const authMiddleware = expressJwt({ secret: config.jwtSecret });

router.use('/auth', authRoute);
router.post('/fileupload', function(req, res) {
  console.log(req);
  console.log(req.file);
  if (req.files == null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  console.log('hello');
  const { file } = req.files;
  file.mv(`${__dirname}/public/${file.name}`, err => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: 'public uploaded' });
  });
});
router.use('/entries', authMiddleware, entryRoute);
router.use('/users', authMiddleware, userRoute);
router.use('/profile', authMiddleware, profileRoute);

module.exports = router;

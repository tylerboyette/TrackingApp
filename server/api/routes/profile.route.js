const express = require('express');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

router.use(userCtrl.getProfile);

router
  .route('/me')
  .get(userCtrl.read)
  .put(userCtrl.updateProfile);

module.exports = router;

/* eslint-disable prettier/prettier */
const express = require('express');
const memberCtrl = require('../controllers/member.controller');

const router = express.Router();

router.route('/').post(memberCtrl.upgrade);

module.exports = router;

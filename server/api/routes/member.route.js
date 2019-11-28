/* eslint-disable prettier/prettier */
const express = require('express');
const memberCtrl = require('../controllers/member.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
router.use(policies.checkRoles([ROLES.ADMIN, ROLES.USER, ROLES.MANAGER]));

router.route('/').post(memberCtrl.upgrade);

module.exports = router;

/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const express = require('express');
const memberCtrl = require('../controllers/member.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
// router.use(policies.checkRoles([ROLES.ADMIN, ROLES.USER, ROLES.MANAGER]));

router.route('/').post(memberCtrl.upgrade);
router.route('/stripe').post(memberCtrl.stripeWebHooks);

module.exports = router;

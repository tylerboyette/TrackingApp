/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const User = require('../models/user.model');

function upgrade(req, res) {
  console.log(req.body);
  res.json(req.userModel);
}
module.exports = { upgrade };

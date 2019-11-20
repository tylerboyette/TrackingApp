/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const User = require('../models/user.model');
const ROLES = require('../constants/role');
const config = require('../../config');

function create(req, res, next) {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  if (req.user.role === ROLES.ADMIN && req.body.role) {
    user.role = req.body.role;
  }

  user
    .save()
    .then(newUser => {
      res.json(newUser);
    })
    .catch(next);
}

function update(req, res, next) {
  Object.assign(req.userModel, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  if (req.body.password) {
    req.userModel.password = req.body.password;
  }

  if (req.user.role === ROLES.ADMIN && req.body.role) {
    req.userModel.role = req.body.role;
  }

  req.userModel
    .save()
    .then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(next);
}

function updateProfile(req, res, next) {
  const form = new formidable.IncomingForm();
  form.uploadDir = `${process.cwd()}/server/public/img`;
  console.log('form.uploadDir', form.uploadDir);
  const fileCropName = `/public/img/crop_${Date.now()}.jpg`;

  form.parse(req, function(err, fields, files) {});
  form.on('file', function(field, file) {
    const filename = file.name;
    const fileName = `${Date.now()}__${file.name}`;
    req.userModel.imageUrl = `/public/img/${fileName}`;
    fs.rename(file.path, path.join(form.uploadDir, fileName), function(err) {});
  });

  form.on('field', function(name, value) {
    if (name === 'preview') {
      const filePath = `${process.cwd()}/server/${fileCropName}`;
      const base64Image = value.split(';base64,').pop();
      fs.writeFile(filePath, base64Image, { encoding: 'base64' }, function(
        err,
      ) {});
    } else {
      const data = JSON.parse(value);
      Object.assign(req.userModel, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
      if (data.password) {
        req.userModel.password = data.password;
      }
    }
  });

  form.on('end', function() {
    req.userModel.avatar = fileCropName;
    req.userModel
      .save()
      .then(updatedUser => {
        const token = jwt.sign(
          {
            _id: updatedUser._id, // eslint-disable-line
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            role: updatedUser.role,
          },
          config.jwtSecret,
          { expiresIn: config.jwtExpires },
        );
        res.json({
          _id: updatedUser._id, // eslint-disable-line
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          role: updatedUser.role,
          imageUrl: updatedUser.imageUrl,
          avatar: updatedUser.avatar,
          isActived: updatedUser.isActived,
          token,
        });
      })
      .catch(next);
  });
}

function read(req, res) {
  res.json(req.userModel);
}

function list(req, res, next) {
  let where = {};
  if (req.user.role === ROLES.MANAGER) {
    where = { role: { $ne: ROLES.ADMIN } };
  }

  User.find(where)
    .then(users => {
      res.json(users);
    })
    .catch(next);
}

function remove(req, res) {
  req.userModel.remove(() => {
    res.json(req.userModel);
  });
}

function getUserByID(req, res, next, id) {
  User.findById(id)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      req.userModel = user;
      next();
    })
    .catch(next);
}

function getProfile(req, res, next) {
  User.findById(req.user._id)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      req.userModel = user;
      next();
    })
    .catch(next);
}

module.exports = {
  create,
  update,
  read,
  list,
  remove,
  getUserByID,
  getProfile,
  updateProfile,
};

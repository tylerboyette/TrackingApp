/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../models/user.model');

function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .select(
      '_id password email firstName lastName role imageUrl avatar isActived',
    )
    .exec()
    .then(user => {
      if (!user) {
        return res
          .status(500)
          .json({ message: 'Email or password does not match' });
      }
      if (!user.isActived) {
        return res
          .status(500)
          .json({ message: 'Please confirm your email address to login!' });
      }

      return user
        .authenticate(req.body.password)
        .then(() => {
          const token = jwt.sign(
            {
              _id: user._id, // eslint-disable-line
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role,
            },
            config.jwtSecret,
            { expiresIn: config.jwtExpires },
          );

          res.json({
            _id: user._id, // eslint-disable-line
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            imageUrl: user.imageUrl,
            avatar: user.avatar,
            token,
          });
        })
        .catch(() => {
          res.status(500).json({ message: 'Email or password does not match' });
        });
    })
    .catch(next);
}

function signup(req, res, next) {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  user
    .save()
    .then(newUser => {
      res.json(newUser);
    })
    .catch(next);
}
function socialLogin(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      const token = jwt.sign(
        {
          _id: user._id, // eslint-disable-line
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
        config.jwtSecret,
        { expiresIn: config.jwtExpires },
      );

      res.json({
        _id: user._id, // eslint-disable-line
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        imageUrl: user.imageUrl,
        avatar: user.avatar,
        isActived: user.isActived,
        token,
      });
    })
    .catch(() => {
      console.log('You should create one!');
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        imageUrl: req.body.avatar,
        avatar: req.body.avatar,
      });

      user
        .save()
        .then(newUser => {
          const token = jwt.sign(
            {
              _id: newUser._id, // eslint-disable-line
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: newUser.email,
              role: newUser.role,
            },
            config.jwtSecret,
            { expiresIn: config.jwtExpires },
          );

          res.json({
            _id: newUser._id, // eslint-disable-line
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            role: newUser.role,
            imageUrl: newUser.imageUrl,
            avatar: newUser.avatar,
            isActived: newUser.isActived,
            token,
          });
        })
        .catch(next);
    });
}

function verifyEmail(req, res) {
  try {
    const { _id } = jwt.verify(req.body.data, config.jwtSecret);
    console.log(_id);
    User.findOne({ _id }).then(user => {
      console.log('user found', user);
      if (!user) res.json({ message: 'Can not find user!' });
      else {
        user.isActived = true;
        user.save();
        res.json({ message: 'Email is verified!' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
module.exports = {
  login,
  socialLogin,
  signup,
  verifyEmail,
};

const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../models/user.model');

function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .select('_id password email firstName lastName role imageUrl avatar')
    .exec()
    .then(user => {
      if (!user) {
        return res
          .status(500)
          .json({ message: 'Email or password does not match' });
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
            token,
          });
        })
        .catch(next);
    });
}

module.exports = {
  login,
  socialLogin,
  signup,
};

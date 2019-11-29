/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECURITY_KEY);
const config = require('../../config');
const User = require('../models/user.model');

const charge = (token, amt) => {
  return stripe.charges.create({
    amount: amt * 100,
    currency: 'usd',
    source: token,
    description: 'Jogging MemberShip upgrade',
  });
};
function upgrade(req, res) {
  if (req.body.amount >= 0) {
    charge(req.body.token.token.id, req.body.amount)
      .then(result => {
        User.findById(req.user._id).then(user => {
          user.membership = 'basic';
          user.save().then(newUser => {
            const token = jwt.sign(
              {
                _id: newUser._id, // eslint-disable-line
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role,
                membership: newUser.membership,
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
              membership: newUser.membership,
              token,
            });
          });
        });
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({ message: 'Stripe API call error' });
      });
  } else {
    User.findById(req.user._id).then(user => {
      user.membership = 'free';
      user.save().then(newUser => {
        const token = jwt.sign(
          {
            _id: newUser._id, // eslint-disable-line
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            role: newUser.role,
            membership: newUser.membership,
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
          membership: newUser.membership,
          token,
        });
      });
    });
  }
}
module.exports = { upgrade };

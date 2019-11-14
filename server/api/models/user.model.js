/* eslint-disable no-console */
/* eslint-disable import/order */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const ip = require('ip');

const ROLES = require('../constants/role');
const config = require('../../config');

const { Schema } = mongoose;
const SALT_ROUNDS = 10;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yukisanada1992@gmail.com',
    pass: 'A$$assin0',
  },
  tls: {
    rejectedUnauthorized: false,
  },
});

const userSchema = new Schema({
  firstName: { type: String, required: true, trim: true, default: '' },
  lastName: { type: String, required: true, trim: true, default: '' },
  email: { type: String, unique: true, required: true, trim: true },
  isActived: { type: Boolean, default: false },
  password: { type: String, select: false },
  imageUrl: { type: String },
  avatar: { type: String },
  role: {
    type: String,
    required: true,
    enum: Object.values(ROLES),
    default: ROLES.USER,
  },
});

userSchema.methods.hashPassword = function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
      if (err) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject('Failed to generate hash');
      }
      return resolve(hash);
    });
  });
};

userSchema.methods.authenticate = function authenticate(password) {
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(password, this.password)
      .then(allow => {
        if (!allow) return reject();
        return resolve();
      })
      .catch(reject);
  });
};

userSchema.pre('save', function preSave(next) {
  this.$locals.wasNew = this.isNew;
  if (this.password && this.isModified('password')) {
    this.password = this.hashPassword(this.password)
      .then(password => {
        this.password = password;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});
userSchema.post('save', function emailVerification(item) {
  if (
    this.email &&
    (this.$locals.wasNew || this.isModified('email') || !this.isActived)
  ) {
    const token = jwt.sign(
      {
        _id: item._id, // eslint-disable-line
      },
      config.jwtSecret,
      { expiresIn: config.jwtExpires },
    );
    const url = `http://${ip.address()}:3000/email-verification/${token}`;
    try {
      transporter.sendMail(
        {
          to: item.email,
          subject: 'Confirm your email!',
          html: `Hello, <b>${item.firstName} ${
            item.lastName
          }!</b> <br/>Please click this email to confirm your email. <br/><a href = "${url}">Confirm your Email</a><br/><span>Thanks</span>`,
        },
        (err, info) => {
          // eslint-disable-next-line no-console
          if (err) console.log('err', err);
          else {
            console.log('Message sent', info);
          }
        },
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
    }
  }
});

module.exports = mongoose.model('User', userSchema);

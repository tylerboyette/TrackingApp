/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
const nodemailer = require('nodemailer');
console.log(process.env.GMAIL_USER, process.env.GMAIL_PASSWORD);
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
  tls: {
    rejectedUnauthorized: false,
  },
});

module.exports = { transporter };

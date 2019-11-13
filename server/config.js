const dotenv = require('dotenv');

// initializing env variables
try {
  dotenv.config();
} catch (e) {
  console.log('Could not find .env file. Continuing..'); // eslint-disable-line
}

module.exports = {
  mongoURL: 'mongodb://127.0.0.1:27017/jogging-tracker',
  jwtSecret: 'ajlksjdflkaklsjdfkljakl',
  jwtExpires: '30d',
  emailExpires: '1d',
};

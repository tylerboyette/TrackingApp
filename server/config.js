const dotenv = require('dotenv');

// initializing env variables
try {
  dotenv.config();
} catch (e) {
  console.log('Could not find .env file. Continuing..'); // eslint-disable-line
}

module.exports = {
  mongoURL: `mongodb+srv://${process.env.MONGO_USENAME}:${
    process.env.MONGO_PASSWORD
  }@react-boilerplate-djfgx.mongodb.net/jogging-track?retryWrites=true&w=majority`,
  jwtSecret: 'ajlksjdflkaklsjdfkljakl',
  jwtExpires: '30d',
  emailExpires: '1d',
};

/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
// set up backend
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECURITY_KEY);
const config = require('../config');
const apiRoutes = require('../api/routes');
module.exports = (app, cb) => {
  mongoose.Promise = global.Promise;
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);
  mongoose.connect(config.mongoURL, error => {
    if (error) {
      console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
      throw error;
    }
    console.log('Connected to MongoDB'); // eslint-disable-line

    if (typeof cb === 'function') {
      cb();
    }
  });

  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.raw({ type: 'application/json' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
  app.use('/api', apiRoutes);
  app.post('/webhook', bodyParser.raw({ type: '*/*' }), (request, response) => {
    const sig = request.headers['stripe-signature'];
    console.log('header---------', request.headers);
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
      console.log(event);

      // Handle the event
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          // handlePaymentIntentSucceeded(paymentIntent);
          break;
        case 'payment_method.attached':
          const paymentMethod = event.data.object;
          // handlePaymentMethodAttached(paymentMethod);
          break;
        // ... handle other event types
        default:
          // Unexpected event type
          return response.status(400).end();
      }

      // Return a response to acknowledge receipt of the event
      response.json({ received: true });
    } catch (err) {
      console.log(err);
      response.status(400).send(`Webhook Error: ${err.message}`);
    }
  });
};

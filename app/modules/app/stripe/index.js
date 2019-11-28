/* eslint-disable react/prefer-stateless-function */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';

import Form from './Form';

class Stripe extends Component {
  render() {
    return (
      <>
        <StripeProvider apiKey="pk_test_Gaeo8NvNMInyMnPxR5ZQ84aE00Kp9ZevCY">
          <Elements>
            <Form />
          </Elements>
        </StripeProvider>
      </>
    );
  }
}
export default Stripe;

/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  CardElement,
  injectStripe,
  // eslint-disable-next-line no-unused-vars
  ReactStripeElements,
} from 'react-stripe-elements';

import { Header, Segment, Form, Button, Link } from 'semantic-ui-react';

import { memberUpgradeRequest } from '../user/redux/actions';

class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      amount: 0,
    };
  }
  onSubmit = async e => {
    const token = await this.props.stripe.createToken({
      name: this.state.name,
      amount: this.state.amount,
    });
    this.props.memberUpgrade({
      body: {
        amount: this.state.amount,
        token,
      },
    });
  };
  // onSubmit = e => {
  //   e.preventDefault();
  //   try {
  //     this.props.stripe
  //       .createToken({
  //         name: this.state.name,
  //         amount: this.state.amount,
  //       })
  //       .then(token => {
  //         this.props.memberUpgrade({
  //           body: {
  //             amount: this.state.amount,
  //           },
  //         });
  //       });
  //   } catch (e) {
  //     throw e;
  //   }
  // };
  render() {
    return (
      <>
        <Form onSubmit={e => this.onSubmit(e)}>
          <Form.Input
            label="Name"
            required
            onChange={e => this.setState({ name: e.target.value })}
          />
          <Form.Input
            label="Amount"
            required
            onChange={e => this.setState({ amount: e.target.value })}
          />
          <CardElement />
          <Button>Charge It!</Button>
        </Form>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {
  memberUpgrade: memberUpgradeRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectStripe(FormPage));

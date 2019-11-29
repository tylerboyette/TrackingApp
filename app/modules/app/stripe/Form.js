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

import { makeSelectCurrentUser } from 'containers/App/selectors';
import { Header, Segment, Form, Button, Card, Icon } from 'semantic-ui-react';
import { memberUpgradeRequest } from '../user/redux/actions';

import './style.scss';

class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      membership: 'free',
    };
  }
  componentDidMount() {
    this.setState({ membership: this.props.currentUser.membership });
  }
  onSubmit = async e => {
    const { membership } = this.state;
    if (membership === this.props.currentUser.membership) return;
    if (membership === 'basic') {
      const token = await this.props.stripe.createToken({
        name:
          this.props.currentUser.firstName + this.props.currentUser.lastName,
        amount: 25,
      });

      this.props.memberUpgrade({
        body: {
          amount: 25,
          token,
        },
      });
    } else {
      this.props.memberUpgrade({
        body: {
          amount: -10,
        },
      });
    }
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
  switchPlan = plan => {
    this.setState({ membership: plan });
  };
  render() {
    const { membership } = this.state;

    return (
      <div style={{ marginTop: '100px' }}>
        <Form onSubmit={e => this.onSubmit(e)} size="large">
          <Segment stacked>
            <Header as="h2" color="blue" textAlign="center">
              Membership Plan
            </Header>
            <CardElement />
            <Card.Group centered>
              <Card
                className={
                  membership === 'free' ? 'memberCard selected' : 'memberCard'
                }
                onClick={() => this.switchPlan('free')}
              >
                <Card.Content textAlign="center" header="Free membership" />
                <Card.Content
                  textAlign="center"
                  description="Limit 5 entries."
                />
                <Card.Content textAlign="center" extra>
                  Free
                </Card.Content>
              </Card>
              <Card
                className={
                  membership === 'basic' ? 'memberCard selected' : 'memberCard'
                }
                onClick={() => this.switchPlan('basic')}
              >
                <Card.Content textAlign="center" header="Basic membership" />
                <Card.Content
                  textAlign="center"
                  description="Allow add more than 5 entries."
                />
                <Card.Content textAlign="center" extra>
                  <p>$25 monthly</p>
                </Card.Content>
              </Card>
            </Card.Group>
            <br /> <br />
            <Button primary fluid>
              {this.membership === 'free' ? 'Switch' : 'Upgrade membership now'}
            </Button>
          </Segment>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const mapDispatchToProps = {
  memberUpgrade: memberUpgradeRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectStripe(FormPage));

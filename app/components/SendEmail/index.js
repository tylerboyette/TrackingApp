/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-useless-constructor */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { Button } from 'semantic-ui-react';
import { sendEmailRequest } from 'modules/auth/redux/actions';

class SendEmail extends Component {
  constructor(props) {
    super(props);
  }
  sendEmail = () => {
    const { currentUser, sendEmailRequest } = this.props;
    console.log(currentUser, sendEmailRequest);
    sendEmailRequest({
      body: currentUser,
    });
  };
  render() {
    return (
      <div>
        <b>Please verify your email</b>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <Button color="green" onClick={this.sendEmail}>
          Send Verifiy Email
        </Button>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const mapDispatchToProps = {
  sendEmailRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SendEmail);

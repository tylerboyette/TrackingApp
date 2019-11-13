/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { emailVerifyRequest } from '../redux/actions';

class EmailVerificationPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // eslint-disable-next-line react/prop-types
    this.props.emailVerifyRequest({
      body: {
        // eslint-disable-next-line react/prop-types
        data: this.props.match.params.token,
      },
    });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { message } = this.props;
    return (
      <div>
        <p>{message}</p>{' '}
        <Link to="/login" className="signup-link">
          Go back to log in
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({ message: state.auth.message });

const mapDispatchToProps = {
  emailVerifyRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EmailVerificationPage);

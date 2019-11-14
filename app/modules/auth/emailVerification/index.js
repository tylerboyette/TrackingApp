/* eslint-disable lines-between-class-members */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { emailVerifyRequest } from '../redux/actions';

class EmailVerificationPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // eslint-disable-next-line react/prop-types
    localStorage.clear();
  }
  componentDidMount() {
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
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column>
          <Header as="h2" color="blue" textAlign="center">
            Email Verification
          </Header>
          <h3>{message}</h3>{' '}
          <Link to="/login" className="signup-link">
            Go back to log in
          </Link>
        </Grid.Column>
      </Grid>
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

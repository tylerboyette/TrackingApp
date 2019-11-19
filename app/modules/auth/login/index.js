/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Button, Form, Grid, Header, Segment, Icon } from 'semantic-ui-react';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import { loginRequest, loginSocialRequest } from '../redux/actions';
import { GOOGLE_ID, FACEBOOK_ID } from '../config';
import './style.scss';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onChange = field => evt => {
    this.setState({ [field]: evt.target.value });
  };

  onSubmit = () => {
    const { email, password } = this.state;
    // eslint-disable-next-line react/prop-types
    this.props.loginRequest({
      body: { email, password },
      success: () => {},
      failure: () => {},
    });
  };

  googleSuccessResponse = response => {
    const profile = response.getBasicProfile();
    const payload = {
      firstName: profile.ofa,
      lastName: profile.wea,
      avatar: profile.getImageUrl(),
      email: profile.getEmail(),
      password: ' ',
    };
    this.props.socialLogin({
      body: payload,
    });
  };

  googleFailureResponse = response => {
    // eslint-disable-next-line no-console
    console.log('failure', response);
  };

  responseFacebook = response => {
    const Names = response.name.split(' ');
    const paylod = {
      firstName: Names[0],
      lastName: Names[1],
      avatar: response.picture.data.url,
      email: response.email,
    };
    this.props.socialLogin({
      body: paylod,
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <Grid textAlign="center" className="page-login" verticalAlign="middle">
        <Grid.Column className="column-login" onSubmit={this.onSubmit}>
          <Header as="h2" color="blue" textAlign="center">
            Log-in to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Field>
                <GoogleLogin
                  clientId={GOOGLE_ID}
                  buttonText="Login with Google"
                  onSuccess={this.googleSuccessResponse}
                  onFailure={this.googleFailureResponse}
                  longTitle={false}
                />
                &nbsp;&nbsp;&nbsp;
                <FacebookLogin
                  size="small"
                  icon={<Icon name="facebook" />}
                  appId={FACEBOOK_ID}
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={this.responseFacebook}
                  buttonStyle={{ fontSize: '14px', fontWeight: '500' }}
                  cssClass="btnFacebook"
                />
              </Form.Field>
              <Form.Input
                fluid
                value={email}
                onChange={this.onChange('email')}
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
              />
              <Form.Input
                fluid
                value={password}
                onChange={this.onChange('password')}
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />
              <Button
                primary
                fluid
                size="large"
                content="Login"
                icon="sign in alternate"
                labelPosition="right"
              />
              <Link to="/signup" className="signup-link">
                Click here to sign up
              </Link>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {
  loginRequest,
  socialLogin: loginSocialRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);

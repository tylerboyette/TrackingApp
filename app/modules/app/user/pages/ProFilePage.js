import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Header, Segment, Container, Form, Button } from 'semantic-ui-react';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { profileSaveRequest } from '../redux/actions';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { user: this.props.currentUser };
  }

  onUpdateField = field => evt => {
    const { user } = this.state;
    this.setState({
      user: { ...user, [field]: evt.target.value },
    });
  };

  onSubmit = () => {
    const { user } = this.state;
    const { saveProfile } = this.props;
    this.props.saveProfile({
      body: user,
    });
  };

  render() {
    const { user } = this.state;

    return (
      <Container fluid className="main-app-container">
        <Header as="h2" content="Profile Settings" textAlign="center" />
        <Form onSubmit={this.onSubmit}>
          <Segment>
            <Header as="h4" content="Basic Info" dividing />
            <Form.Input
              label="First Name"
              required
              value={user.firstName || ''}
              onChange={this.onUpdateField('firstName')}
            />
            <Form.Input
              label="Last Name"
              required
              value={user.lastName || ''}
              onChange={this.onUpdateField('lastName')}
            />
            <Form.Input
              label="Email"
              type="email"
              required
              value={user.email || ''}
              onChange={this.onUpdateField('email')}
            />
            <Form.Input
              label="Password"
              type="password"
              value={user.password || '****'}
              onChange={this.onUpdateField('password')}
            />
          </Segment>
          <Button color="blue">Save</Button>&nbsp;&nbsp;
          <Link to="/users">Cancel</Link>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const mapDispatchToProps = {
  saveProfile: profileSaveRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Profile);

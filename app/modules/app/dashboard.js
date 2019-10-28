import React, { Component, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/App/selectors';

class dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('hello', this.props.currentUser.get('firstName'));
    return <div>Hello {this.props.currentUser.get('firstName')} </div>;
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(dashboard);

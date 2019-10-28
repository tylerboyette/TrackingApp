/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import LoginPage from './login';
import SignupPage from './signup';

import reducer from './redux/reducer';
import saga from './redux/saga';

const key = 'auth';

export function Auth({}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {}, []);

  return (
    <div>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route render={() => <Redirect to="/login" />} />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(Auth);

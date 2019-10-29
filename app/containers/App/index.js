/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, withRouter } from 'react-router-dom';

// import { Helmet } from 'react-helmet';
import styled from 'styled-components';

// import HomePage from 'containers/HomePage/Loadable';
// import FeaturePage from 'containers/FeaturePage/Loadable';
// import NotFoundPage from 'containers/NotFoundPage/Loadable';
// import Header from 'components/Header';
// import Footer from 'components/Footer';

import AuthModule from 'modules/auth/Loadable';
import AppModule from 'modules/app/Loadable';

import reducer from 'modules/auth/redux/reducer';
import saga from 'modules/auth/redux/saga';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
// import GlobalStyle from '../../global-styles';
import { makeSelectCurrentUser } from './selectors';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;
function App(auth) {
  const renderApp = () => (auth.currentUser ? <AppModule /> : <AuthModule />);
  return (
    <AppWrapper>
      {/* <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/features" component={FeaturePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle /> */}
      <Switch>
        <Route path="/" render={renderApp} />
      </Switch>
    </AppWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const withReducer = injectReducer({ key: 'auth', reducer });
const withSaga = injectSaga({ key: 'auth', saga });
const withConnect = connect(mapStateToProps);

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(App),
);

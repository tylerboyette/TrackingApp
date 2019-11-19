/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Header, Container } from 'semantic-ui-react';
export default class dashboard extends Component {
  render() {
    return (
      <Container fluid>
        <Header as="h2" content="Welcome To Jogging Track" />
      </Container>
    );
  }
}

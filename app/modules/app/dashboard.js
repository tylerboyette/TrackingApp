/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Header, Container } from 'semantic-ui-react';
import MapComponent from 'components/Map';

export default class dashboard extends Component {
  render() {
    return (
      <Container fluid>
        <Header as="h2" content="Welcome To Jogging Track" />
        <p>Google Map</p>
        <MapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAFDbvGO-bYQ1TDE8jJG3nZZAU0WnH1Abc"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </Container>
    );
  }
}

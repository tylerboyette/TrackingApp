/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable no-var */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
} from 'react-google-maps';

class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [],
      location: {},
    };
  }

  componentWillMount() {
    this.getGeoLocation();
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    }
  };

  setMaker = e => {
    var { position } = this.state;
    if (position.length >= 2) {
      return;
    }
    position.push({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    this.setState({ position });
  };

  removeMaker = (marker, index) => {
    var { position } = this.state;
    var temp = position.filter((item, ind) => ind !== index);
    this.setState({ position: temp });
  };

  render() {
    const { position, location } = this.state;
    return (
      <GoogleMap defaultZoom={15} center={location} onClick={this.setMaker}>
        {position &&
          position.map((item, index) => (
            <Marker
              onClick={item => this.removeMaker(item, index)}
              key={index}
              position={{ lat: item.lat, lng: item.lng }}
            />
          ))}
        {position.length === 2 && (
          <Polyline path={position} options={{ strokeColor: '#20ffce' }} />
        )}
      </GoogleMap>
    );
  }
}

const MyMapComponent = withScriptjs(
  withGoogleMap(props => <MyMap props={props} />),
);
export default MyMapComponent;

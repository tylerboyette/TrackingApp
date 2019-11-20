/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable object-shorthand */
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
import mapStyles from './mapStyle';

class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: { lat: 0, lng: 0 },
    };
  }

  componentWillMount() {
    this.getGeoLocation();
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        if (!this.props.position.length) {
          this.setState({
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        } else if (this.props.position.length === 2) {
          this.setState({
            location: {
              lat:
                (this.props.position[0].lat + this.props.position[1].lat) / 2,
              lng:
                (this.props.position[0].lng + this.props.position[1].lng) / 2,
            },
          });
        } else {
          this.setState({
            location: this.props.position[0],
          });
        }
      });
    }
  };

  setMaker = e => {
    var { position } = this.props;
    if (position.length >= 2) return;
    const newMarker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    const temp = position.concat([newMarker]);
    this.props.changePath(temp);
  };

  removeMaker = (marker, index) => {
    var { position } = this.props;
    var temp = position.filter((item, ind) => ind !== index);
    this.props.changePath(temp);
  };

  changeMaker = (e, index) => {
    var { position } = this.props;
    position[index] = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    this.props.changePath(position);
  };

  render() {
    const { location } = this.state;
    const { position } = this.props;
    return (
      <GoogleMap
        defaultZoom={15}
        center={location}
        onClick={this.setMaker}
        defaultOptions={{ styles: mapStyles }}
      >
        {position &&
          position.map((item, index) => (
            <Marker
              onClick={item => this.removeMaker(item, index)}
              key={index}
              position={{ lat: item.lat, lng: item.lng }}
              onDrag={event => this.changeMaker(event, index)}
            />
          ))}
        {position.length === 2 && (
          <Polyline
            path={position}
            options={{
              strokeColor: '#20ffce',
              strokeOpacity: 0.75,
              strokeWeight: 2,
            }}
          />
        )}
      </GoogleMap>
    );
  }
}

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <MyMap props={props} changePath={props.changePath} position={props.path} />
  )),
);
export default MyMapComponent;

/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable lines-between-class-members */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { createStructuredSelector } from 'reselect';
import MapComponent from 'components/Map';
import {
  Header,
  Segment,
  Container,
  Form,
  Button,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import getDistanceBetweenPoints from 'utils/distance';
import {
  entryLoadRequest,
  updateEntryField,
  entrySaveRequest,
  loadNewEntry,
} from '../redux/actions';
import { makeSelectEntry, makeSelectEntryLoading } from '../redux/selectors';
class EntryPage extends Component {
  componentWillMount() {
    this.loadEntry(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.loadEntry(nextProps.match.params.id);
    }
  }

  onSubmit = () => {
    this.props.entrySave({
      success: () => {
        this.props.history.push('/entries');
      },
      failure: () => {
        this.props.history.push('/entries');
      },
    });
  };

  onUpdateField = field => evt => {
    this.props.updateField(field, evt.target.value);
  };

  onChangeDate = date => {
    this.props.updateField('date', date);
  };

  loadEntry = id => {
    const { entryLoad } = this.props;
    if (id === 'new') {
      this.props.loadNewEntry();
    } else {
      entryLoad(id);
    }
  };
  changePath = path => {
    const distance =
      path.length === 2
        ? (
            getDistanceBetweenPoints(
              path[0].lat,
              path[0].lng,
              path[1].lat,
              path[1].lng,
            ) / 1000
          ).toFixed(2)
        : 0;
    this.props.updateField('path', path);
    this.props.updateField('distance', distance);
  };
  render() {
    const { entry, loading } = this.props;
    return (
      <Container fluid>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <Header as="h2" content={entry.id ? 'Edit Entry' : 'New Entry'} />
        <Form onSubmit={this.onSubmit}>
          <Segment>
            <Header as="h4" content="Jogging Info" dividing />
            <Form.Field inline required>
              <label>Date</label>
              <DatePicker
                showTimeSelect={false}
                selected={moment(entry.date).toDate()}
                onChange={this.onChangeDate}
              />
            </Form.Field>
            <MapComponent
              isMarkerShown
              path={entry.path}
              changePath={this.changePath}
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAFDbvGO-bYQ1TDE8jJG3nZZAU0WnH1Abc"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
            {/* <Form.Input
              label="Distance(km)"
              type="number"
              required
              value={entry.distance || 0}
              onChange={this.onUpdateField('distance')}
            /> */}
            <Form.Input
              label="Duration(mins)"
              type="number"
              required
              value={entry.duration || 0}
              onChange={this.onUpdateField('duration')}
            />
          </Segment>
          <Button color="blue">Save</Button>&nbsp;&nbsp;
          <Link to="/entries">Cancel</Link>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  entry: makeSelectEntry(),
  loading: makeSelectEntryLoading(),
});

const mapDispatchToProps = {
  entryLoad: entryLoadRequest,
  updateField: updateEntryField,
  entrySave: entrySaveRequest,
  loadNewEntry,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EntryPage);

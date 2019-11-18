/* eslint-disable no-console */
/* eslint-disable new-cap */
import React, { Component } from 'react';
import moment from 'moment';
import { throttle } from 'lodash';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new moment(),
    };
  }

  timers = () => {
    console.log(this.state.time);
    this.setState({ time: new moment() });
  };

  componentWillMount() {
    console.log('hello will mount');
    const timerThrottle = throttle(this.timers, 100);
    setInterval(timerThrottle, 100);
  }

  render() {
    console.log('hello timer');
    console.log(this.state.time);
    return (
      <div>
        <p>Hello</p>
        <p>{this.state.time}</p>
      </div>
    );
  }
}

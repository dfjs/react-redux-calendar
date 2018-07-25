import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getReminders } from '../../reducers/reminders';
import { getControls } from '../../reducers/controls';

import Calendar from '../Calendar';
import Modals from '../Modals';

import './index.css';

export class App extends Component {

  render() {
    return (
      <div className="App">
        <h1 className="App__header">Reminders</h1>
        <Calendar month={this.props.month} year={this.props.year} reminders={this.props.reminders} />
        <Modals />
      </div>
    );
  }
}

App.propTypes = {
  reminders: PropTypes.array,
  month: PropTypes.number,
  year: PropTypes.number
};

const mapStateToProps = state => ({
  reminders: getReminders(state),
  month: getControls(state).month,
  year: getControls(state).year,
});

export default connect(mapStateToProps, null)(App);

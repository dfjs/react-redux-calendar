import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import './index.css';

/**
 * Reminder Form
 *
 * TODO Use external validation and form libs
 */
class ReminderForm extends React.Component {

  initialState = {
    text: '',
    date: format(Date.now(), 'YYYY-MM-DD'), // helpful default
    time: '',
    colour: '#000000',
    isValidDateTime: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.initialState,
      // If we have a reminder, get/format and set it
      ...(this.isEdit() && this.getReminder(this.props.reminder))
    };
  }

  getReminder(reminder) {
    const { text, date, colour } = reminder;

    return {
      text,
      date: format(date, 'YYYY-MM-DD'),
      time: format(date, 'HH:mm'),
      colour
    }
  }

  isEdit = () => {
    return !!this.props.reminder;
  };

  // TODO Tests
  isValidTime(time) {
    const hoursAndMinutes = time.split(':');

    if (hoursAndMinutes.length !== 2) {
      return false;
    }

    // Avoid minutes being interpreted weirdly
    if (hoursAndMinutes[1].length !== 2) {
      return false;
    }

    // Check valid numbers
    if(isNaN(parseInt(hoursAndMinutes[0], 10)) || isNaN(parseInt(hoursAndMinutes[1], 10))) {
      return false;
    }

    // Check those numbers are within 24 hour times
    // otherwise there's overflow e.g. 09:61 === 10:01 == confusing
    if ((parseInt(hoursAndMinutes[0], 10) > 23) || (parseInt(hoursAndMinutes[1], 10)) > 59) {
      return false;
    }

    const now = new Date();
    return !(isNaN(now.setHours(hoursAndMinutes[0])) === false && isNaN(now.setMinutes(hoursAndMinutes[1])));
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };

  isValidDateTime = () => {
    let isValid = true;

    // Note: currently uses required attribute for validation,
    // obviously further validation is required (for various reasons)

    // Date
    const date = Date.parse(this.state.date);
    if (isNaN(date)) {
      isValid = false;
    }

    // Time
    if (!this.isValidTime(this.state.time)) {
      isValid = false;
    }

    return isValid;
  };

  getReminderDateTime = () => {
    const date = Date.parse(this.state.date);
    const dateTime = new Date(date);

    dateTime.setHours(this.state.time.split(':')[0]);
    dateTime.setMinutes(this.state.time.split(':')[1]);

    return dateTime;
  };

  handleSubmit = (event) => {

    // Other validation is done using `required`
    if (this.isValidDateTime()) {

      const dateTime = this.getReminderDateTime();

      if (this.isEdit()) {
        this.props.edit(this.props.reminder.id, dateTime, this.state.text, this.state.colour);
      } else {
        this.props.add(dateTime, this.state.text, this.state.colour);
      }

      if (this.props.onComplete) {
        this.props.onComplete();
      }

      this.reset();
    } else {
      this.setState({
        isValidDateTime: false
      });
    }

    event.preventDefault();
  };

  reset() {
    this.setState({ ...this.initialState });
  }

  getTitle() {
    return `${this.isEdit() ? 'Edit' : 'Add'} Reminder`;
  }

  render() {
    return (
      <form className="ReminderForm" onSubmit={this.handleSubmit}>
        <h3 className="ReminderForm__header">{this.getTitle()}</h3>
        <div className="ReminderForm__field">
          <label htmlFor="text">Text:</label>
          <input
            id="text"
            name="text"
            type="text"
            placeholder="Your reminder"
            value={this.state.text}
            onChange={this.handleChange}
            maxLength="30"
            autoComplete="off"
            required
          />
        </div>
        {!this.state.isValidDateTime && (
          <div className="ReminderForm__invalid-date">Invalid date and/or time, please fix and try again</div>
        )}
        <div className="ReminderForm__field">
          <label htmlFor="">Date:</label>
          <input
            id="date"
            name="date"
            type="date"
            value={this.state.date}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="ReminderForm__field">
          <label htmlFor="time">Time:</label>
          <input
            id="time"
            name="time"
            type="text"
            value={this.state.time}
            placeholder="09:00"
            onChange={this.handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="ReminderForm__field">
          <label htmlFor="colour">Colour:</label>
          <input
            id="colour"
            name="colour"
            type="color"
            value={this.state.colour}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input className="Button Button--positive" type="submit" value={`${this.isEdit() ? 'Update' : 'Add'} Reminder`} />
        </div>
      </form>
    );
  }
}

ReminderForm.propTypes = {
  add: PropTypes.func,
  edit: PropTypes.func,
  onComplete: PropTypes.func,
  reminder: PropTypes.any
};

export default ReminderForm;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { format } from 'date-fns';

import { openModal } from '../../actions/modals';

import './index.css';

export const CalendarReminder = ({ reminder, openModal }) => {

  const onClick = () => {
    openModal('view', reminder);
  };

  const hoursMinutes = format(reminder.date, 'HH:mm');

  return (
    <div
      title={reminder.text}
      className="CalendarReminder__reminder"
      onClick={onClick}
    >
      {hoursMinutes} <span style={{ color: reminder.colour }}>{reminder.text}</span>
    </div>
  )
};

CalendarReminder.propTypes = {
  reminder: PropTypes.object,
  openModal: PropTypes.func
};

export default connect(null, { openModal })(CalendarReminder);

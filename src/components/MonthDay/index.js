import React from 'react';
import PropTypes from 'prop-types';

import CalendarReminder from '../CalendarReminder';

import './index.css';

const MonthDay = ({ empty, date, reminders = [] }) => {

  // Get today's reminders
  const dayReminders = reminders.filter(reminder => reminder.date.getDate() === date);

  // Sort reminders (in-place)
  dayReminders.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return(
    <div className={`MonthDay MonthDay--${empty ? 'empty' : 'day'}`}>
      { empty || (
        <div>
          <div className="MonthDay__day">{date}</div>
          <div className="MonthDay__reminders">
            {dayReminders.map((reminder, i) => {
              return <CalendarReminder key={i} reminder={reminder} />
            })}
          </div>
        </div>
      )}
    </div>
  )
};

MonthDay.propTypes = {
  empty: PropTypes.bool,
  day: PropTypes.number,
  reminders: PropTypes.any
};

export default MonthDay;

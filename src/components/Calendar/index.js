import React from 'react';
import PropTypes from 'prop-types';
import times from 'lodash/times';

import CalendarControls from '../CalendarControls';
import MonthDay from '../MonthDay';

import './index.css';

const Calendar = ({ month, year, reminders }) => {

  const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const numCalendarCells = 42; // 7 * 6; 6 rows can handle the overflow for month -> weekday formatting e.g. see Sept 2018
  const firstDayInWeek = (new Date(year, month - 1, 1)).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  // Get this month and year's reminders
  const monthReminders = reminders.filter(reminder => {
    return reminder.date.getMonth() === (month - 1) && reminder.date.getFullYear() === year;
  });

  return(
    <div className="Calendar">
      <CalendarControls />
      <div className="Calendar__week-days">
        {daysOfTheWeek.map((day, i) => <div key={`week-day-${i}`} className="Calendar__week-day">{day}</div> )}
      </div>
      {times(firstDayInWeek, i => <MonthDay key={`empty-start-${i}`} empty />)}
      {times(daysInMonth, i => <MonthDay key={`day-${i}`} date={i + 1} reminders={monthReminders} />)}
      {times(numCalendarCells - firstDayInWeek - daysInMonth, i => <MonthDay key={`empty-end-${i}`} empty />)}
    </div>
  )
};

Calendar.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  reminders: PropTypes.array.isRequired
};

export default Calendar;

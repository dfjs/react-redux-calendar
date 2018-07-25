import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getControls } from '../../reducers/controls';
import { changeMonth, changeYear } from '../../actions/controls';
import { openModal } from '../../actions/modals';

import './index.css';

class CalendarControls extends React.Component {

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years = [2017, 2018, 2019, 2020];

  changeMonth = (event) => {
    this.props.changeMonth(parseInt(event.target.value, 10));
  };

  changeYear = (event) => {
    this.props.changeYear(parseInt(event.target.value, 10));
  };

  openAddReminderModal = () => {
    this.props.openModal('add');
  };

  render() {
    return(
      <div className="CalendarControls">
        <label htmlFor="months">Month:</label>
        <select name="months" id="months" onChange={this.changeMonth} defaultValue={this.props.month}>
          {this.months.map((month, i) => <option key={i} value={i + 1}>{month}</option>)}
        </select>

        <label htmlFor="year">Year:</label>
        <select name="year" id="year" onChange={this.changeYear} defaultValue={this.props.year}>
          {this.years.map((year, i) => <option key={i} value={year}>{year}</option>)}
        </select>

        <button className="Button Button--positive pull-right" onClick={this.openAddReminderModal}>Add Reminder</button>
      </div>
    )
  }
}

CalendarControls.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
  changeMonth: PropTypes.func,
  changeYear: PropTypes.func,
  openModal: PropTypes.func
};

const mapStateToProps = state => ({
  month: getControls(state).month,
  year: getControls(state).year
});

export default connect(
  mapStateToProps,
  { changeMonth, changeYear, openModal }
)(CalendarControls);

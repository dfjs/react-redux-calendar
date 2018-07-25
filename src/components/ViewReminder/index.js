import React from 'react';
import { format } from 'date-fns';

import './index.css';

const ViewReminder = ({ reminder, deleteReminder, onComplete, openModal }) => {

  const onClickDelete = () => {
    deleteReminder(reminder);
    onComplete();
  };

  const onClickEdit = () => {
    openModal('add', reminder);
  };

  return(
    <div className="ViewReminder">
      <div className="ViewReminder__details">
        <div className="ViewReminder__text">
          <span style={{ color: reminder.colour }}>{reminder.text}</span>
        </div>
        <div className="ViewReminder__datetime">
          {format(reminder.date, '[at] h:mma [on] DD/MM/YYYY')}
        </div>
      </div>
      <button className="Button" onClick={onClickEdit}>Edit</button>
      <button className="Button Button--negative" onClick={onClickDelete}>Delete</button>
    </div>
  )
};

export default ViewReminder;

import { createReducer } from 'redux-create-reducer';
import { ADD_REMINDER, DELETE_REMINDER, EDIT_REMINDER } from '../actions/reminders';

export const reminders = createReducer([], {
  [ADD_REMINDER](state, { date, text, colour }) {
    return [
      ...state,
      { id: Date.now(), date, text, colour }
    ]
  },
  [EDIT_REMINDER](state, { id, date, text, colour }) {
    const otherReminders = state.filter(reminder => reminder.id !== id);

    return [
      ...otherReminders,
      { id, date, text, colour }
    ]
  },
  [DELETE_REMINDER](state, { reminder: { id }}) {
    return state.filter(reminder => reminder.id !== id);
  }
});

export const getReminders = (state) => {
  return state.reminders;
};

export default reminders;

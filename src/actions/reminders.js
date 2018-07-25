export const ADD_REMINDER = 'ADD_REMINDER';
export const DELETE_REMINDER = 'DELETE_REMINDER';
export const EDIT_REMINDER = 'EDIT_REMINDER';

export function addReminder(date, text, colour) {
  return { type: ADD_REMINDER, date, text, colour };
}

export function deleteReminder(reminder) {
  return { type: DELETE_REMINDER, reminder };
}

export function editReminder(id, date, text, colour) {
  return { type: EDIT_REMINDER, id, date, text, colour };
}

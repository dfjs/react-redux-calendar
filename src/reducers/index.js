import { combineReducers } from 'redux';

import { reminders } from './reminders';
import { controls } from './controls';
import { modals } from './modals';

export default combineReducers({
  reminders,
  controls,
  modals
});

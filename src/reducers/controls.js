import { createReducer } from 'redux-create-reducer';
import { CONTROLS_CHANGE_MONTH, CONTROLS_CHANGE_YEAR } from '../actions/controls';

const initialState = {
  month: (new Date()).getMonth() + 1, // Date month index offset
  year: (new Date()).getFullYear()
};

export const controls = createReducer(initialState, {
  [CONTROLS_CHANGE_MONTH](state, { month }) {
    return {
      ...state,
      month
    }
  },
  [CONTROLS_CHANGE_YEAR](state, { year }) {
    return {
      ...state,
      year
    }
  }
});

export const getControls = (state) => {
  return state.controls;
};

export default controls;

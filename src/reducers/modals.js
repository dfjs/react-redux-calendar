import { createReducer } from 'redux-create-reducer';
import { MODALS_CLOSE, MODALS_OPEN } from '../actions/modals';

const initialState = {
  modalType: '',
  isOpen: false,
  reminder: null
};

export const modals = createReducer(initialState, {
  [MODALS_OPEN](state, { modalType, reminder }) {
    return {
      ...state,
      modalType,
      reminder: reminder || null,
      isOpen: true
    }
  },
  [MODALS_CLOSE](state) {
    return {
      ...state,
      isOpen: false,
      modalType: initialState.modalType,
      reminder: initialState.reminder
    }
  }
});

export const getModals = (state) => {
  return state.modals;
};

export default modals;

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { addReminder, deleteReminder, editReminder } from '../../actions/reminders'
import { getModals } from '../../reducers/modals';
import { closeModal, openModal } from '../../actions/modals';

import ReminderForm from '../ReminderForm';
import ViewReminder from '../ViewReminder';

import './index.css';

Modal.setAppElement('#root');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

/**
 * Modals
 *
 * A simple/basic Modal container / manager
 */
const Modals = ({ modalType, isOpen, reminder, closeModal, openModal, addReminder, editReminder, deleteReminder }) => {

  const AddReminderModal = (
    <ReminderForm add={addReminder} edit={editReminder} onComplete={closeModal} reminder={reminder} />
  );

  const ViewReminderModal = (
    <ViewReminder reminder={reminder} onComplete={closeModal} deleteReminder={deleteReminder} openModal={openModal} />
  );

  const modalTypes = {
    'add': {
      label: 'Add Reminder',
      component: AddReminderModal
    },
    'view': {
      label: 'View Reminder',
      component: ViewReminderModal
    }
  };

  return(
    <Modal
      isOpen={isOpen}
      style={customStyles}
      contentLabel={modalTypes[modalType] ? modalTypes[modalType].label : null}
    >
      <button className="Modals__close-button" onClick={closeModal}>×</button>
      {modalTypes[modalType] ? modalTypes[modalType].component : null}
    </Modal>
  )
};

Modals.propTypes = {
  modalType: PropTypes.string,
  isOpen: PropTypes.bool,
  reminder: PropTypes.object,
  closeModal: PropTypes.func,
  openModal: PropTypes.func,
  addReminder: PropTypes.func,
  editReminder: PropTypes.func,
  deleteReminder : PropTypes.func
};

const mapStateToProps = state => ({
  modalType: getModals(state).modalType,
  isOpen: getModals(state).isOpen,
  reminder: getModals(state).reminder
});

export default connect(
  mapStateToProps,
  { closeModal, openModal, addReminder, editReminder, deleteReminder }
)(Modals);

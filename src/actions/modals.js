export const MODALS_OPEN = 'MODALS_OPEN';
export const MODALS_CLOSE = 'MODALS_CLOSE';

export function openModal(modalType, reminder) {
  return { type: MODALS_OPEN, modalType, reminder };
}

export function closeModal() {
  return { type: MODALS_CLOSE };
}

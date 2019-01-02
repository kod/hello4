import { MODAL } from '@src/common/constants/actionTypes';

export function openModal(modalType, modalProps) {
  return {
    type: MODAL.OPEN,
    payload: {
      modalType,
      modalProps,
    },
  };
}

export function closeModal() {
  return {
    type: MODAL.CLOSE,
  };
}

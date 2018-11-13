import { MODAL } from '@/common/constants/actionTypes';
import { MODAL_NAMESPACE } from '@/common/constants';

export function openModal(modalType, modalProps) {
  return {
    type: `${MODAL_NAMESPACE}/${MODAL.OPEN}`,
    payload: {
      modalType,
      modalProps,
    },
  };
}

export function closeModal() {
  return {
    type: `${MODAL_NAMESPACE}/${MODAL.CLOSE}`,
  };
}

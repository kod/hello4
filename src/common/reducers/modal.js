import { MODAL } from '@/common/constants/actionTypes';

const initState = {
  modalType: null,
  modalProps: null,
};

export default function modal(state = initState, action) {
  switch (action.type) {
    case MODAL.OPEN:
      return {
        modalType: action.payload.modalType,
        modalProps: action.payload.modalProps,
      };
    case MODAL.CLOSE:
      return initState;
    default:
      return state;
  }
}

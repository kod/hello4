import { MODAL_NAMESPACE } from '@/common/constants';
import { MODAL } from '@/common/constants/actionTypes';

const initState = {
  modalType: null,
  modalProps: {},
};

export default {
  namespace: MODAL_NAMESPACE,

  state: initState,

  effects: {},

  reducers: {
    [MODAL.OPEN](_, action) {
      return {
        modalType: action.payload.modalType,
        modalProps: action.payload.modalProps,
      };
    },
    [MODAL.CLOSE]() {
      return initState;
    },
  },
};

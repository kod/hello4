import { ADDRESS_MODIFY } from '@/common/constants/actionTypes';

export function addressModifyClear() {
  return {
    type: ADDRESS_MODIFY.CLEAR,
    payload: {},
  };
}

export function addressModifySuccess() {
  return {
    type: ADDRESS_MODIFY.SUCCESS,
    payload: {},
  };
}

export function addressModifyFailure() {
  return {
    type: ADDRESS_MODIFY.FAILURE,
    payload: {},
  };
}

export function addressModifyFetch(item) {
  return {
    type: ADDRESS_MODIFY.REQUEST,
    payload: {
      ...item,
      addrid: item.id,
    },
  };
}

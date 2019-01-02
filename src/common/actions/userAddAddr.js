import { ADDRESS_ADD } from '@src/common/constants/actionTypes';

export function addressAddSuccess(screen) {
  return {
    type: ADDRESS_ADD.SUCCESS,
    payload: {
      screen,
    },
  };
}

export function addressAddFailure() {
  return {
    type: ADDRESS_ADD.FAILURE,
    payload: {},
  };
}

export function addressAddFetch(params) {
  return {
    type: ADDRESS_ADD.REQUEST,
    payload: {
      ...params,
    },
  };
}

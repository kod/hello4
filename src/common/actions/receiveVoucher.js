import { RECEIVE_VOUCHER } from '@/common/constants/actionTypes';

export function receiveVoucherFetchSuccess(screen) {
  return {
    type: RECEIVE_VOUCHER.SUCCESS,
    payload: {
      screen,
    },
  };
}

export function receiveVoucherFetchFailure() {
  return {
    type: RECEIVE_VOUCHER.FAILURE,
    payload: {
      // rankingMode,
    },
  };
}

export function receiveVoucherFetch(params) {
  return {
    type: RECEIVE_VOUCHER.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function receiveVoucherClear(user) {
  return {
    type: RECEIVE_VOUCHER.CLEAR,
    payload: {
      user,
    },
  };
}

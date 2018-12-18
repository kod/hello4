import { RECEIVE_VOUCHER } from '@/common/constants/actionTypes';
import { RECEIVEVOUCHER_NAMESPACE } from '@/common/constants';

export function receiveVoucherFetchSuccess(screen) {
  return {
    type: `${RECEIVEVOUCHER_NAMESPACE}/${RECEIVE_VOUCHER.SUCCESS}`,
    payload: {
      screen,
    },
  };
}

export function receiveVoucherFetchFailure() {
  return {
    type: `${RECEIVEVOUCHER_NAMESPACE}/${RECEIVE_VOUCHER.FAILURE}`,
    payload: {
      // rankingMode,
    },
  };
}

export function receiveVoucherFetch(params) {
  return {
    type: `${RECEIVEVOUCHER_NAMESPACE}/${RECEIVE_VOUCHER.REQUEST}`,
    payload: {
      ...params,
    },
  };
}

export function receiveVoucherClear(user) {
  return {
    type: `${RECEIVEVOUCHER_NAMESPACE}/${RECEIVE_VOUCHER.CLEAR}`,
    payload: {
      user,
    },
  };
}

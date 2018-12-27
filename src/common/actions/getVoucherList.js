import { GET_VOUCHER_LIST } from '@/common/constants/actionTypes';

export function getVoucherListFetchSuccess({ items, status }) {
  return {
    type: GET_VOUCHER_LIST.SUCCESS,
    payload: {
      items,
      status,
    },
  };
}

export function getVoucherListFetchFailure() {
  return {
    type: GET_VOUCHER_LIST.FAILURE,
    payload: {},
  };
}

export function getVoucherListFetch(params) {
  return {
    type: GET_VOUCHER_LIST.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function getVoucherListClear(user) {
  return {
    type: GET_VOUCHER_LIST.CLEAR,
    payload: {
      user,
    },
  };
}

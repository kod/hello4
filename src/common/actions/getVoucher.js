import { GET_VOUCHER } from '@src/common/constants/actionTypes';

export function getVoucherFetchSuccess(items) {
  return {
    type: GET_VOUCHER.SUCCESS,
    payload: {
      items,
    },
  };
}

export function getVoucherFetchFailure() {
  return {
    type: GET_VOUCHER.FAILURE,
    payload: {},
  };
}

export function getVoucherFetch(params) {
  return {
    type: GET_VOUCHER.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function getVoucherClear() {
  return {
    type: GET_VOUCHER.CLEAR,
    payload: {},
  };
}

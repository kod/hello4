import { ORDER_CANCEL } from '@/common/constants/actionTypes';

export function orderCancelFetchSuccess(params) {
  return {
    type: ORDER_CANCEL.SUCCESS,
    payload: {
      ...params,
    },
  };
}

export function orderCancelFetchFailure() {
  return {
    type: ORDER_CANCEL.FAILURE,
    payload: {},
  };
}

export function orderCancelFetch(params) {
  return {
    type: ORDER_CANCEL.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function orderCancelClear() {
  return {
    type: ORDER_CANCEL.CLEAR,
    payload: {},
  };
}

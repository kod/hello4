import { ORDER_CREATE } from '@/common/constants/actionTypes';

export function orderCreateFetchSuccess(params) {
  return {
    type: ORDER_CREATE.SUCCESS,
    payload: {
      ...params,
    },
  };
}

export function orderCreateFetchFailure() {
  return {
    type: ORDER_CREATE.FAILURE,
    payload: {},
  };
}

export function orderCreateFetch(params) {
  return {
    type: ORDER_CREATE.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function orderCreateClear() {
  return {
    type: ORDER_CREATE.CLEAR,
    payload: {},
  };
}

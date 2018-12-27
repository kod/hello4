import { QUERY_ORDER } from '@/common/constants/actionTypes';

export function queryOrderFetchSuccess(item) {
  return {
    type: QUERY_ORDER.SUCCESS,
    payload: {
      item,
    },
  };
}

export function queryOrderFetchFailure() {
  return {
    type: QUERY_ORDER.FAILURE,
    payload: {},
  };
}

export function queryOrderFetch(params) {
  return {
    type: QUERY_ORDER.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function queryOrderClear() {
  return {
    type: QUERY_ORDER.CLEAR,
    payload: {},
  };
}

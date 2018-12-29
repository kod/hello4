import {
  QUERY_ORDER_LIST,
  QUERY_ORDER_LIST_INDEX,
} from '@src/common/constants/actionTypes';

export function queryOrderListFetchSuccess(params) {
  return {
    type: QUERY_ORDER_LIST.SUCCESS,
    payload: {
      ...params,
    },
  };
}

export function queryOrderListFetchFailure() {
  return {
    type: QUERY_ORDER_LIST.FAILURE,
    payload: {},
  };
}

export function queryOrderListFetch(params) {
  return {
    type: QUERY_ORDER_LIST.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function queryOrderListClear() {
  return {
    type: QUERY_ORDER_LIST.CLEAR,
    payload: {},
  };
}

export function queryOrderListIndexFetch(params) {
  return {
    type: QUERY_ORDER_LIST_INDEX.REQUEST,
    payload: {
      ...params,
    },
  };
}

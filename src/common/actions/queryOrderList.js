import {
  QUERY_ORDER_LIST,
  QUERY_ORDER_LIST_INDEX,
} from '../constants/actionTypes';
import { QUERYORDERLIST_NAMESPACE } from '@/common/constants';

export function queryOrderListFetchSuccess(params) {
  return {
    type: `${QUERYORDERLIST_NAMESPACE}/${QUERY_ORDER_LIST.SUCCESS}`,
    payload: {
      ...params,
    },
  };
}

export function queryOrderListFetchFailure() {
  return {
    type: `${QUERYORDERLIST_NAMESPACE}/${QUERY_ORDER_LIST.FAILURE}`,
    payload: {},
  };
}

export function queryOrderListFetch(params) {
  return {
    type: `${QUERYORDERLIST_NAMESPACE}/${QUERY_ORDER_LIST.REQUEST}`,
    payload: {
      ...params,
    },
  };
}

export function queryOrderListClear() {
  return {
    type: `${QUERYORDERLIST_NAMESPACE}/${QUERY_ORDER_LIST.CLEAR}`,
    payload: {},
  };
}

export function queryOrderListIndexFetch(params) {
  return {
    type: `${QUERYORDERLIST_NAMESPACE}/${QUERY_ORDER_LIST_INDEX.REQUEST}`,
    payload: {
      ...params,
    },
  };
}

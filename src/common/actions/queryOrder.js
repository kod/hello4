import { QUERY_ORDER } from '@/common/constants/actionTypes';
import { QUERYORDER_NAMESPACE } from '@/common/constants';

export function queryOrderFetchSuccess(item) {
  return {
    type: `${QUERYORDER_NAMESPACE}/${QUERY_ORDER.SUCCESS}`,
    payload: {
      item,
    },
  };
}

export function queryOrderFetchFailure() {
  return {
    type: `${QUERYORDER_NAMESPACE}/${QUERY_ORDER.FAILURE}`,
    payload: {},
  };
}

export function queryOrderFetch(params) {
  return {
    type: `${QUERYORDER_NAMESPACE}/${QUERY_ORDER.REQUEST}`,
    payload: {
      ...params,
    },
  };
}

export function queryOrderClear() {
  return {
    type: `${QUERYORDER_NAMESPACE}/${QUERY_ORDER.CLEAR}`,
    payload: {},
  };
}

import { ORDER_CANCEL } from '@/common/constants/actionTypes';
import { ORDERCANCEL_NAMESPACE } from '@/common/constants';

export function orderCancelFetchSuccess(params) {
  return {
    type: `${ORDERCANCEL_NAMESPACE}/${ORDER_CANCEL.SUCCESS}`,
    payload: {
      ...params,
    },
  };
}

export function orderCancelFetchFailure() {
  return {
    type: `${ORDERCANCEL_NAMESPACE}/${ORDER_CANCEL.FAILURE}`,
    payload: {},
  };
}

export function orderCancelFetch(params) {
  return {
    type: `${ORDERCANCEL_NAMESPACE}/${ORDER_CANCEL.REQUEST}`,
    payload: {
      ...params,
    },
  };
}

export function orderCancelClear() {
  return {
    type: `${ORDERCANCEL_NAMESPACE}/${ORDER_CANCEL.CLEAR}`,
    payload: {},
  };
}

import { ORDER_PAY } from '../constants/actionTypes';
import { ORDERPAY_NAMESPACE } from '@/common/constants';

export function orderPayFetchSuccess({ ret, screen, payvalue, pop }) {
  return {
    type: `${ORDERPAY_NAMESPACE}/${ORDER_PAY.SUCCESS}`,
    payload: {
      ret,
      screen,
      payvalue,
      pop,
    },
  };
}

export function orderPayFetchFailure() {
  return {
    type: `${ORDERPAY_NAMESPACE}/${ORDER_PAY.FAILURE}`,
    payload: {},
  };
}

export function orderPayFetch(params) {
  return {
    type: `${ORDERPAY_NAMESPACE}/${ORDER_PAY.REQUEST}`,
    payload: {
      ...params,
    },
  };
}

export function orderPayClear() {
  return {
    type: `${ORDERPAY_NAMESPACE}/${ORDER_PAY.CLEAR}`,
    payload: {},
  };
}

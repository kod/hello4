import { ORDER_PAY } from '@src/common/constants/actionTypes';

export function orderPayFetchSuccess({
  ret,
  screen,
  payvalue,
  pop,
  tradeno,
  orderno,
  payway,
}) {
  return {
    type: ORDER_PAY.SUCCESS,
    payload: {
      ret,
      screen,
      payvalue,
      pop,
      tradeno,
      orderno,
      payway,
    },
  };
}

export function orderPayFetchFailure() {
  return {
    type: ORDER_PAY.FAILURE,
    payload: {},
  };
}

export function orderPayFetch(params) {
  return {
    type: ORDER_PAY.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function orderPayClear() {
  return {
    type: ORDER_PAY.CLEAR,
    payload: {},
  };
}

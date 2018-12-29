import { COUPON_SELECT } from '@src/common/constants/actionTypes';

export function couponSelectFetch(item) {
  return {
    type: COUPON_SELECT.REQUEST,
    payload: {
      item,
    },
  };
}

export function couponSelectClear() {
  return {
    type: COUPON_SELECT.CLEAR,
    payload: {},
  };
}

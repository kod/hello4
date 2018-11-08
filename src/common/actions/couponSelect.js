import { COUPON_SELECT } from '../constants/actionTypes';
import { COUPONSELECT_NAMESPACE } from '@/common/constants';

export function couponSelectFetch(item) {
  return {
    type: `${COUPONSELECT_NAMESPACE}/${COUPON_SELECT.REQUEST}`,
    payload: {
      item,
    },
  };
}

export function couponSelectClear() {
  return {
    type: `${COUPONSELECT_NAMESPACE}/${COUPON_SELECT.CLEAR}`,
    payload: {},
  };
}

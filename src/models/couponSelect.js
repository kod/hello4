import { COUPONSELECT_NAMESPACE } from '@/common/constants';
import { COUPON_SELECT } from '@/common/constants/actionTypes';

const initState = {
  item: {},
};

export default {
  namespace: COUPONSELECT_NAMESPACE,

  state: initState,

  effects: {},

  reducers: {
    [COUPON_SELECT.CLEAR]() {
      return {
        ...initState,
      };
    },
    [COUPON_SELECT.REQUEST](state, action) {
      return {
        ...state,
        item: action.payload.item,
      };
    },
  },
};

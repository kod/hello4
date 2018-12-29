import { ORDER_CREATE } from '@src/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  tradeNo: '',
  orderNo: '',
};

export default (state = initState, action) => {
  switch (action.type) {
    case ORDER_CREATE.CLEAR:
      return {
        ...initState,
      };
    case ORDER_CREATE.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_CREATE.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        tradeNo: action.payload.tradeNo,
        orderNo: action.payload.orderNo,
      };
    case ORDER_CREATE.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

import { ORDER_PAY } from '@/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  ret: '',
};

export default (state = initState, action) => {
  switch (action.type) {
    case ORDER_PAY.CLEAR:
      return {
        ...initState,
      };
    case ORDER_PAY.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_PAY.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        ret: action.payload.ret,
      };
    case ORDER_PAY.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

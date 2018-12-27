import { GET_VOUCHER } from '@/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_VOUCHER.CLEAR:
      return {
        ...initState,
      };
    case GET_VOUCHER.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_VOUCHER.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
      };
    case GET_VOUCHER.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

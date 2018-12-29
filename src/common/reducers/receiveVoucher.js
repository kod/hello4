import { RECEIVE_VOUCHER } from '@src/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case RECEIVE_VOUCHER.CLEAR:
      return {
        ...initState,
      };
    case RECEIVE_VOUCHER.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_VOUCHER.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case RECEIVE_VOUCHER.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

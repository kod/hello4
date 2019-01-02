import { JUDGE_VOUCHER } from '@src/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case JUDGE_VOUCHER.CLEAR:
      return {
        ...initState,
      };
    case JUDGE_VOUCHER.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case JUDGE_VOUCHER.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
      };
    case JUDGE_VOUCHER.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

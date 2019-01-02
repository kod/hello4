import { ENCHASHMENT_APPLY } from '@src/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  limit: null,
  feeRate: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ENCHASHMENT_APPLY.CLEAR:
      return {
        ...initState,
      };
    case ENCHASHMENT_APPLY.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ENCHASHMENT_APPLY.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        limit: action.payload.limit,
        feeRate: action.payload.feeRate,
      };
    case ENCHASHMENT_APPLY.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

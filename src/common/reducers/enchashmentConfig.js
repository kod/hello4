import { ENCHASHMENT_CONFIG } from '@src/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  limit: null,
  feeRate: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ENCHASHMENT_CONFIG.CLEAR:
      return {
        ...initState,
      };
    case ENCHASHMENT_CONFIG.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ENCHASHMENT_CONFIG.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        limit: action.payload.limit,
        feeRate: action.payload.feeRate,
      };
    case ENCHASHMENT_CONFIG.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

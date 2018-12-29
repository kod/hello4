import { ORDER_CANCEL } from '@src/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ORDER_CANCEL.CLEAR:
      return {
        ...initState,
      };
    case ORDER_CANCEL.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_CANCEL.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case ORDER_CANCEL.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

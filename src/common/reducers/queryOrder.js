import { QUERY_ORDER } from '@/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  item: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case QUERY_ORDER.CLEAR:
      return {
        ...initState,
      };
    case QUERY_ORDER.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case QUERY_ORDER.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.payload.item,
      };
    case QUERY_ORDER.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

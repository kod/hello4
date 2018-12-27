import { CARD_QUERY } from '@/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  item: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case CARD_QUERY.CLEAR:
      return {
        ...initState,
      };
    case CARD_QUERY.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CARD_QUERY.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.payload.item,
      };
    case CARD_QUERY.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

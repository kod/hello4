import { FIND_PRODUCTS } from '@/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case FIND_PRODUCTS.CLEAR:
      return {
        ...initState,
      };
    case FIND_PRODUCTS.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FIND_PRODUCTS.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
      };
    case FIND_PRODUCTS.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

import { COLLECTION } from '@src/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case COLLECTION.CLEAR:
      return {
        ...initState,
      };
    case COLLECTION.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COLLECTION.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
      };
    case COLLECTION.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

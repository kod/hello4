import { ENCHASHMENT_GETLIST } from '@src/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  item: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ENCHASHMENT_GETLIST.CLEAR:
      return {
        ...initState,
      };
    case ENCHASHMENT_GETLIST.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ENCHASHMENT_GETLIST.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.payload.item,
      };
    case ENCHASHMENT_GETLIST.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

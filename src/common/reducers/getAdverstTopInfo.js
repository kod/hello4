import { GET_ADVERST_TOP_INFO } from '@/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_ADVERST_TOP_INFO.CLEAR:
      return {
        ...initState,
      };
    case GET_ADVERST_TOP_INFO.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ADVERST_TOP_INFO.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
      };
    case GET_ADVERST_TOP_INFO.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

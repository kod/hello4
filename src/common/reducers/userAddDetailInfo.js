import { ADD_DETAIL_INFO } from '@src/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_DETAIL_INFO.CLEAR:
      return {
        ...initState,
      };
    case ADD_DETAIL_INFO.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_DETAIL_INFO.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case ADD_DETAIL_INFO.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

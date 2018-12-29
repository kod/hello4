import { COMMENT } from '@src/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case COMMENT.CLEAR:
      return {
        ...initState,
      };
    case COMMENT.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMMENT.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
      };
    case COMMENT.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

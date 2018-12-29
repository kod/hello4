import { OAUTH_REQUEST } from '@src/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case OAUTH_REQUEST.CLEAR:
      return {
        ...initState,
      };
    case OAUTH_REQUEST.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OAUTH_REQUEST.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case OAUTH_REQUEST.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

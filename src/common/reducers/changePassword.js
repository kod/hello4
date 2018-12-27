import { CHANGE_PASSWORD, LOGOUT } from '@/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  user: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOGOUT.SUCCESS:
      return {
        ...initState,
      };
    case CHANGE_PASSWORD.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_PASSWORD.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.payload.user,
      };
    case CHANGE_PASSWORD.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

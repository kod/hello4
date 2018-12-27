import { LOGIN, LOGOUT } from '@/common/constants/actionTypes';

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
    case LOGIN.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: {
          ...action.payload.user,
          // result: 'VNNMQ2XRG1AG',
        },
      };
    case LOGIN.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

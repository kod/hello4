import { USER_CERTIFICATE_INFO } from '@src/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  certUser: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case USER_CERTIFICATE_INFO.CLEAR:
      return {
        ...initState,
      };
    case USER_CERTIFICATE_INFO.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_CERTIFICATE_INFO.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        certUser: action.payload.certUser,
      };
    case USER_CERTIFICATE_INFO.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

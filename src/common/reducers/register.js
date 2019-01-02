import { REGISTER } from '@src/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case REGISTER.CLEAR:
      return {
        ...initState,
      };
    case REGISTER.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case REGISTER.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

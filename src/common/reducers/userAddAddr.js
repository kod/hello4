import { ADDRESS_ADD } from '@/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
  addressSelectedId: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ADDRESS_ADD.CLEAR:
      return {
        ...initState,
      };
    case ADDRESS_ADD.REQUEST:
      return {
        ...state,
        loading: true,
        refreshing: action.payload.refreshing,
      };
    case ADDRESS_ADD.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case ADDRESS_ADD.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

import { ADDRESS_MODIFY } from '@/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
  addressSelectedId: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ADDRESS_MODIFY.CLEAR:
      return {
        ...initState,
      };
    case ADDRESS_MODIFY.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADDRESS_MODIFY.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        isTrue: true,
      };
    case ADDRESS_MODIFY.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
        isTrue: false,
      };
    default:
      return state;
  }
};

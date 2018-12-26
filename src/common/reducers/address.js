import { ADDRESS, ADDRESS_SELECT } from '@/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
  addressSelectedId: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ADDRESS.CLEAR:
      return {
        ...initState,
      };
    case ADDRESS.REQUEST:
      return {
        ...state,
        loading: true,
        refreshing: action.payload.refreshing,
      };
    case ADDRESS.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
        addressSelectedId: action.payload.addressSelectedId,
      };
    case ADDRESS.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case ADDRESS_SELECT.REQUEST:
      return {
        ...state,
        addressSelectedId: action.payload.id,
      };
    default:
      return state;
  }
};

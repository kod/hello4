import { GET_INVITE_RECORD } from '@src/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  item: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_INVITE_RECORD.CLEAR:
      return {
        ...initState,
      };
    case GET_INVITE_RECORD.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_INVITE_RECORD.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.payload.item,
      };
    case GET_INVITE_RECORD.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

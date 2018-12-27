import { RETURN_MONEY } from '@/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case RETURN_MONEY.CLEAR:
      return {
        ...initState,
      };
    case RETURN_MONEY.REQUEST:
      return {
        ...state,
        loading: true,
        [action.payload.key]: action.payload.value,
      };
    case RETURN_MONEY.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: {
          ...state.items,
          ...action.payload.item,
        },
      };
    case RETURN_MONEY.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

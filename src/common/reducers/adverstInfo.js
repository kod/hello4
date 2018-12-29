import { ADVERST_INFO } from '@src/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default function adverstInfo(state = initState, action) {
  switch (action.type) {
    case ADVERST_INFO.CLEAR:
      return {
        ...initState,
      };
    case ADVERST_INFO.REQUEST:
      return {
        ...state,
        params: action.payload.params,
        loading: true,
      };
    case ADVERST_INFO.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: [...state.items, ...action.payload.items],
      };
    case ADVERST_INFO.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}

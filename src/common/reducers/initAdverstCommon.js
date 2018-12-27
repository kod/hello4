import { INIT_ADVERST_COMMON } from '@/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
  currentpage: 0,
  totalpage: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case INIT_ADVERST_COMMON.CLEAR:
      return {
        ...initState,
      };
    case INIT_ADVERST_COMMON.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case INIT_ADVERST_COMMON.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: [...state.items, ...action.payload.items],
        currentpage: action.payload.currentpage,
        totalpage: action.payload.totalpage,
      };
    case INIT_ADVERST_COMMON.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

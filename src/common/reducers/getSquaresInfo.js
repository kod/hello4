import { GET_SQUARES_INFO } from '@/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  totalsize: 0,
  totalpage: 0,
  pagesize: 0,
  currentpage: 0,
  items: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_SQUARES_INFO.CLEAR:
      return {
        ...initState,
      };
    case GET_SQUARES_INFO.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SQUARES_INFO.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.squareinfo,
        totalsize: action.payload.totalsize,
        totalpage: action.payload.totalpage,
        pagesize: action.payload.pagesize,
        currentpage: action.payload.currentpage,
      };
    case GET_SQUARES_INFO.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

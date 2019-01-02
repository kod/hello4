import {
  QUERY_ORDER_LIST,
  QUERY_ORDER_LIST_INDEX,
} from '@src/common/constants/actionTypes';

const initState = {
  scrollTabIndex: 0,
  rows: 10,
  item: {
    0: {
      loading: false,
      loaded: false,
      refreshing: false,
      page: 1,
      items: [],
    },
    1: {
      loading: false,
      loaded: false,
      refreshing: false,
      page: 1,
      items: [],
    },
    2: {
      loading: false,
      loaded: false,
      refreshing: false,
      page: 1,
      items: [],
    },
    3: {
      loading: false,
      loaded: false,
      refreshing: false,
      page: 1,
      items: [],
    },
  },
};

export default (state = initState, action) => {
  switch (action.type) {
    case QUERY_ORDER_LIST.CLEAR:
      return {
        ...initState,
      };
    case QUERY_ORDER_LIST.REQUEST:
      return {
        ...state,
        item: {
          ...state.item,
          [action.payload.index]: {
            ...state.item[action.payload.index],
            loading: true,
          },
        },
      };
    case QUERY_ORDER_LIST.SUCCESS:
      return {
        ...state,
        item: {
          ...state.item,
          [action.payload.index]: {
            ...state.item[action.payload.index],
            loading: false,
            loaded: true,
            page: action.payload.page,
            items: action.payload.result,
            // items: [ ...state.item[action.payload.index].items, ...action.payload.result ]
          },
        },
      };
    case QUERY_ORDER_LIST.FAILURE:
      return {
        ...state,
        item: {
          ...state.item,
          [action.payload.index]: {
            ...state.item[action.payload.index],
            loading: false,
            loaded: true,
            page: action.payload.page,
          },
        },
      };
    case QUERY_ORDER_LIST_INDEX.REQUEST:
      return {
        ...state,
        scrollTabIndex: action.payload.scrollTabIndex,
      };
    default:
      return state;
  }
};

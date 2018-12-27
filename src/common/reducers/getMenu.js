import { GET_MENU, GET_MENU_INDEX } from '@/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
  itemsList: [],
  itemsClassfy: [],
  itemsIndex: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_MENU.CLEAR:
      return {
        ...initState,
      };
    case GET_MENU.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MENU.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
        itemsList: action.payload.itemsList,
        itemsClassfy: action.payload.itemsClassfy,
      };
    case GET_MENU.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case GET_MENU_INDEX.REQUEST:
      return {
        ...state,
        itemsIndex: action.payload.index,
      };
    default:
      return state;
  }
};

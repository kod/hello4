import { SEARCH_HISTORY } from '@src/common/constants/actionTypes';

const initState = {
  items: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case SEARCH_HISTORY.CLEAR:
      return {
        ...initState,
      };
    case SEARCH_HISTORY.ADD:
      return {
        items: [...action.payload.item, ...state.items].filter(
          (val, key) => key < 10,
        ),
      };
    case SEARCH_HISTORY.REMOVE:
      return {
        items: state.items.filter(val => val !== action.payload.item),
      };
    default:
      return state;
  }
};

import { SEARCHHISTORY_NAMESPACE } from '@/common/constants';
import { SEARCH_HISTORY } from '@/common/constants/actionTypes';

const initState = {
  items: [],
};

export default {
  namespace: SEARCHHISTORY_NAMESPACE,

  state: initState,

  effects: {},

  reducers: {
    [SEARCH_HISTORY.CLEAR]() {
      return {
        ...initState,
      };
    },
    [SEARCH_HISTORY.ADD](state, action) {
      return {
        items: [...action.payload.item, ...state.items].filter(
          (val, key) => key < 10,
        ),
      };
    },
    [SEARCH_HISTORY.REMOVE](state, action) {
      return {
        items: state.items.filter(val => val !== action.payload.item),
      };
    },
  },
};

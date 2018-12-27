import { SEARCH_HISTORY } from '@/common/constants/actionTypes';

export function searchHistoryAdd(item) {
  return {
    type: SEARCH_HISTORY.ADD,
    payload: {
      item,
    },
  };
}

export function searchHistoryRemove(item) {
  return {
    type: SEARCH_HISTORY.REMOVE,
    payload: {
      item,
    },
  };
}

export function searchHistoryClear() {
  return {
    type: SEARCH_HISTORY.CLEAR,
    payload: {},
  };
}

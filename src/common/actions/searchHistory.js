import { SEARCH_HISTORY } from '../constants/actionTypes';
import { SEARCHHISTORY_NAMESPACE } from '@/common/constants';

export function searchHistoryAdd(item) {
  return {
    type: `${SEARCHHISTORY_NAMESPACE}/${SEARCH_HISTORY.ADD}`,
    payload: {
      item,
    },
  };
}

export function searchHistoryRemove(item) {
  return {
    type: `${SEARCHHISTORY_NAMESPACE}/${SEARCH_HISTORY.REMOVE}`,
    payload: {
      item,
    },
  };
}

export function searchHistoryClear() {
  return {
    type: `${SEARCHHISTORY_NAMESPACE}/${SEARCH_HISTORY.CLEAR}`,
    payload: {},
  };
}

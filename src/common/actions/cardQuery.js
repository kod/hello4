import { CARD_QUERY } from '@/common/constants/actionTypes';

export function cardQueryFetchSuccess(item) {
  return {
    type: CARD_QUERY.SUCCESS,
    payload: {
      item,
    },
  };
}

export function cardQueryFetchFailure() {
  return {
    type: CARD_QUERY.FAILURE,
    payload: {
      // rankingMode,
    },
  };
}

export function cardQueryFetch() {
  return {
    type: CARD_QUERY.REQUEST,
    payload: {},
  };
}

export function cardQueryClear() {
  return {
    type: CARD_QUERY.CLEAR,
    payload: {},
  };
}

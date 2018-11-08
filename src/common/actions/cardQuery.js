import { CARD_QUERY } from '@/common/constants/actionTypes';
import { CARDQUERY_NAMESPACE } from '@/common/constants';

export function cardQueryFetchSuccess(item) {
  return {
    type: `${CARDQUERY_NAMESPACE}/${CARD_QUERY.SUCCESS}`,
    payload: {
      item,
    },
  };
}

export function cardQueryFetchFailure() {
  return {
    type: `${CARDQUERY_NAMESPACE}/${CARD_QUERY.FAILURE}`,
    payload: {
      // rankingMode,
    },
  };
}

export function cardQueryFetch() {
  return {
    type: `${CARDQUERY_NAMESPACE}/${CARD_QUERY.REQUEST}`,
    payload: {},
  };
}

export function cardQueryClear() {
  return {
    type: `${CARDQUERY_NAMESPACE}/${CARD_QUERY.CLEAR}`,
    payload: {},
  };
}

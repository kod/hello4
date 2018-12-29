import { ADVERST_INFO } from '@src/common/constants/actionTypes';

export function adverstInfoFetchSuccess(items) {
  return {
    type: ADVERST_INFO.SUCCESS,
    payload: {
      items,
    },
  };
}

export function adverstInfoFetchFailure() {
  return {
    type: ADVERST_INFO.FAILURE,
    payload: {},
  };
}

export function adverstInfoFetch(params, refreshing = false) {
  return {
    type: ADVERST_INFO.REQUEST,
    payload: {
      params,
      refreshing,
    },
  };
}

export function adverstInfoClear() {
  return {
    type: ADVERST_INFO.CLEAR,
    payload: {},
  };
}

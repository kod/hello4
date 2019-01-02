import { GET_ADVERST_TOP_INFO } from '@src/common/constants/actionTypes';

export function getAdverstTopInfoFetchSuccess(items) {
  return {
    type: GET_ADVERST_TOP_INFO.SUCCESS,
    payload: {
      items,
    },
  };
}

export function getAdverstTopInfoFetchFailure() {
  return {
    type: GET_ADVERST_TOP_INFO.FAILURE,
    payload: {},
  };
}

export function getAdverstTopInfoFetch() {
  return {
    type: GET_ADVERST_TOP_INFO.REQUEST,
    payload: {},
  };
}

export function getAdverstTopInfoClear() {
  return {
    type: GET_ADVERST_TOP_INFO.CLEAR,
    payload: {},
  };
}

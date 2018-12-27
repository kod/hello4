import { GET_NEWEST_INFO } from '@/common/constants/actionTypes';

export function getNewestInfoFetchSuccess(items) {
  return {
    type: GET_NEWEST_INFO.SUCCESS,
    payload: {
      items,
    },
  };
}

export function getNewestInfoFetchFailure() {
  return {
    type: GET_NEWEST_INFO.FAILURE,
    payload: {},
  };
}

export function getNewestInfoFetch() {
  return {
    type: GET_NEWEST_INFO.REQUEST,
    payload: {},
  };
}

export function getNewestInfoClear() {
  return {
    type: GET_NEWEST_INFO.CLEAR,
    payload: {},
  };
}

import { ADD_DETAIL_INFO } from '@/common/constants/actionTypes';

export function userAddDetailInfoFetchSuccess(screen) {
  return {
    type: ADD_DETAIL_INFO.SUCCESS,
    payload: {
      screen,
    },
  };
}

export function userAddDetailInfoFetchFailure() {
  return {
    type: ADD_DETAIL_INFO.FAILURE,
    payload: {},
  };
}

export function userAddDetailInfoFetch(params) {
  return {
    type: ADD_DETAIL_INFO.REQUEST,
    payload: {
      ...params,
    },
  };
}

import { GET_USERINFO_BYID } from '@/common/constants/actionTypes';

export function getUserInfoByIdFetchSuccess(item) {
  return {
    type: GET_USERINFO_BYID.SUCCESS,
    payload: {
      item,
    },
  };
}

export function getUserInfoByIdFetchFailure() {
  return {
    type: GET_USERINFO_BYID.FAILURE,
    payload: {},
  };
}

export function getUserInfoByIdFetch() {
  return {
    type: GET_USERINFO_BYID.REQUEST,
    payload: {},
  };
}

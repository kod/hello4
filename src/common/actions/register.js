import { REGISTER } from '@/common/constants/actionTypes';

export function registerFetchSuccess(response, screen) {
  return {
    type: REGISTER.SUCCESS,
    payload: {
      response,
      screen,
    },
  };
}

export function registerFetchFailure() {
  return {
    type: REGISTER.FAILURE,
    payload: {},
  };
}

export function registerFetch(params) {
  return {
    type: REGISTER.REQUEST,
    payload: {
      ...params,
    },
  };
}

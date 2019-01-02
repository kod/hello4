import { CHANGE_PASSWORD } from '@src/common/constants/actionTypes';

export function changePasswordFetchSuccess(screen) {
  return {
    type: CHANGE_PASSWORD.SUCCESS,
    payload: {
      screen,
    },
  };
}

export function changePasswordFetchFailure() {
  return {
    type: CHANGE_PASSWORD.FAILURE,
    payload: {},
  };
}

export function changePasswordFetch(msisdn, password, otp, screen) {
  return {
    type: CHANGE_PASSWORD.REQUEST,
    payload: {
      msisdn,
      password,
      otp,
      screen,
    },
  };
}

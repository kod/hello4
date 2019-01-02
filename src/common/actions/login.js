import { LOGIN, LOGOUT } from '@src/common/constants/actionTypes';

export function loginFetchSuccess(user, screen) {
  return {
    type: LOGIN.SUCCESS,
    payload: {
      user,
      screen,
    },
  };
}

export function loginFetchFailure() {
  return {
    type: LOGIN.FAILURE,
    payload: {},
  };
}

export function loginFetch({
  mail,
  password,
  otp,
  oauthtype,
  oauthid,
  screen,
}) {
  return {
    type: LOGIN.REQUEST,
    payload: {
      mail,
      password,
      otp,
      screen,
      oauthtype,
      oauthid,
    },
  };
}

export function logout() {
  return {
    type: LOGOUT.SUCCESS,
  };
}

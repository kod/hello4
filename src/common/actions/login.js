import { LOGIN, LOGOUT } from '@/common/constants/actionTypes';
import { LOGIN_NAMESPACE } from '@/common/constants';

export function loginFetchSuccess(user, screen) {
  return {
    // type: LOGIN.SUCCESS,
    type: `${LOGIN_NAMESPACE}/${LOGIN.SUCCESS}`,
    payload: {
      user,
      screen,
    },
  };
}

export function loginFetchFailure() {
  return {
    type: `${LOGIN_NAMESPACE}/${LOGIN.FAILURE}`,
    payload: {},
  };
}

export function loginFetch({ mail, password, otp, screen }) {
  return {
    type: `${LOGIN_NAMESPACE}/${LOGIN.REQUEST}`,
    payload: {
      mail,
      password,
      otp,
      screen,
    },
  };
}

export function logout() {
  return {
    type: LOGOUT.SUCCESS,
  };
}

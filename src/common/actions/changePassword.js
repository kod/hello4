import { CHANGE_PASSWORD } from '@/common/constants/actionTypes';
import { CHANGEPASSWORD_NAMESPACE } from '@/common/constants';

export function changePasswordFetchSuccess(screen) {
  return {
    type: `${CHANGEPASSWORD_NAMESPACE}/${CHANGE_PASSWORD.SUCCESS}`,
    payload: {
      screen,
    },
  };
}

export function changePasswordFetchFailure() {
  return {
    type: `${CHANGEPASSWORD_NAMESPACE}/${CHANGE_PASSWORD.FAILURE}`,
    payload: {},
  };
}

export function changePasswordFetch(msisdn, password, otp, screen) {
  return {
    type: `${CHANGEPASSWORD_NAMESPACE}/${CHANGE_PASSWORD.REQUEST}`,
    payload: {
      msisdn,
      password,
      otp,
      screen,
    },
  };
}

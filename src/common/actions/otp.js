import { OTP } from '@src/common/constants/actionTypes';

export function otpFetchSuccess() {
  return {
    type: OTP.SUCCESS,
    payload: {},
  };
}

export function otpFetchFailure() {
  return {
    type: OTP.FAILURE,
    payload: {},
  };
}

export function otpFetch(mail) {
  return {
    type: OTP.REQUEST,
    payload: {
      mail,
    },
  };
}

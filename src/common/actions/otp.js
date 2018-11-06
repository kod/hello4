import { OTP } from '../constants/actionTypes';
import { OTP_NAMESPACE } from '@/common/constants';

export function otpFetchSuccess() {
  return {
    type: `${OTP_NAMESPACE}/${OTP.SUCCESS}`,
    payload: {},
  };
}

export function otpFetchFailure() {
  return {
    type: `${OTP_NAMESPACE}/${OTP.FAILURE}`,
    payload: {},
  };
}

export function otpFetch(mail) {
  return {
    type: `${OTP_NAMESPACE}/${OTP.REQUEST}`,
    payload: {
      mail,
    },
  };
}

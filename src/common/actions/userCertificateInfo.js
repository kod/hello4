import { USER_CERTIFICATE_INFO } from '@/common/constants/actionTypes';

export function userCertificateInfoFetchSuccess(certUser) {
  return {
    type: USER_CERTIFICATE_INFO.SUCCESS,
    payload: {
      certUser,
    },
  };
}

export function userCertificateInfoFetchFailure() {
  return {
    type: USER_CERTIFICATE_INFO.FAILURE,
    payload: {
      // rankingMode,
    },
  };
}

export function userCertificateInfoFetch(type = 'userCertificateInfo') {
  return {
    type: USER_CERTIFICATE_INFO.REQUEST,
    payload: {
      type,
    },
  };
}

export function userCertificateInfoClear() {
  return {
    type: USER_CERTIFICATE_INFO.CLEAR,
    payload: {},
  };
}

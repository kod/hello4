import { USER_CERTIFICATE_INFO } from '@/common/constants/actionTypes';
import { USERCERTIFICATEINFO_NAMESPACE } from '@/common/constants';

export function userCertificateInfoFetchSuccess(certUser) {
  return {
    type: `${USERCERTIFICATEINFO_NAMESPACE}/${USER_CERTIFICATE_INFO.SUCCESS}`,
    payload: {
      certUser,
    },
  };
}

export function userCertificateInfoFetchFailure() {
  return {
    type: `${USERCERTIFICATEINFO_NAMESPACE}/${USER_CERTIFICATE_INFO.SUCCESS}`,
    payload: {
      // rankingMode,
    },
  };
}

export function userCertificateInfoFetch(type = 'userCertificateInfo') {
  return {
    type: `${USERCERTIFICATEINFO_NAMESPACE}/${USER_CERTIFICATE_INFO.SUCCESS}`,
    payload: {
      type,
    },
  };
}

export function userCertificateInfoClear() {
  return {
    type: `${USERCERTIFICATEINFO_NAMESPACE}/${USER_CERTIFICATE_INFO.SUCCESS}`,
    payload: {},
  };
}

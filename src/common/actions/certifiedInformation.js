import {
  CERTIFIED_INFORMATION,
  CERTIFIED_INFORMATION_EDIT,
} from '@/common/constants/actionTypes';
import { CERTIFIEDINFORMATION_NAMESPACE } from '@/common/constants';

export function certifiedInformationFetchSuccess(certUser) {
  return {
    type: `${CERTIFIEDINFORMATION_NAMESPACE}/${CERTIFIED_INFORMATION.SUCCESS}`,
    payload: {
      certUser: {
        ...certUser,
        graduationtime: '2020-11-11 11:11:11.0',
      },
    },
  };
}

export function certifiedInformationFetchFailure() {
  return {
    type: `${CERTIFIEDINFORMATION_NAMESPACE}/${CERTIFIED_INFORMATION.FAILURE}`,
    payload: {
      // rankingMode,
    },
  };
}

export function certifiedInformationEdit(key, value) {
  return {
    type: `${CERTIFIEDINFORMATION_NAMESPACE}/${
      CERTIFIED_INFORMATION_EDIT.REQUEST
    }`,
    payload: {
      key,
      value,
    },
  };
}

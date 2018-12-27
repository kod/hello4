import {
  CERTIFIED_INFORMATION,
  CERTIFIED_INFORMATION_EDIT,
} from '@/common/constants/actionTypes';

export function certifiedInformationFetchSuccess(certUser) {
  return {
    type: CERTIFIED_INFORMATION.SUCCESS,
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
    type: CERTIFIED_INFORMATION.FAILURE,
    payload: {
      // rankingMode,
    },
  };
}

export function certifiedInformationEdit(key, value) {
  return {
    type: CERTIFIED_INFORMATION_EDIT.REQUEST,
    payload: {
      key,
      value,
    },
  };
}

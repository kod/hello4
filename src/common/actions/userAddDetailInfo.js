import { ADD_DETAIL_INFO } from '@/common/constants/actionTypes';
import { USERADDDETAILINFO_NAMESPACE } from '@/common/constants';

export function userAddDetailInfoFetchSuccess(screen) {
  return {
    type: `${USERADDDETAILINFO_NAMESPACE}/${ADD_DETAIL_INFO.SUCCESS}`,
    payload: {
      screen,
    },
  };
}

export function userAddDetailInfoFetchFailure() {
  return {
    type: `${USERADDDETAILINFO_NAMESPACE}/${ADD_DETAIL_INFO.FAILURE}`,
    payload: {},
  };
}

export function userAddDetailInfoFetch(params) {
  return {
    type: `${USERADDDETAILINFO_NAMESPACE}/${ADD_DETAIL_INFO.REQUEST}`,
    payload: {
      ...params,
    },
  };
}

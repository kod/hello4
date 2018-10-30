import { GET_ADVERST_TOP_INFO } from '@/common/constants/actionTypes';
import { GETADVERSTTOPINFO_NAMESPACE } from '@/common/constants';

export function getAdverstTopInfoFetchSuccess(items) {
  return {
    type: `${GETADVERSTTOPINFO_NAMESPACE}/${GET_ADVERST_TOP_INFO.SUCCESS}`,
    payload: {
      items,
    },
  };
}

export function getAdverstTopInfoFetchFailure() {
  return {
    type: `${GETADVERSTTOPINFO_NAMESPACE}/${GET_ADVERST_TOP_INFO.FAILURE}`,
    payload: {},
  };
}

export function getAdverstTopInfoFetch() {
  return {
    type: `${GETADVERSTTOPINFO_NAMESPACE}/${GET_ADVERST_TOP_INFO.REQUEST}`,
    payload: {},
  };
}

export function getAdverstTopInfoClear() {
  return {
    type: `${GETADVERSTTOPINFO_NAMESPACE}/${GET_ADVERST_TOP_INFO.CLEAR}`,
    payload: {},
  };
}

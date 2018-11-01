import { ADVERST_INFO } from '../constants/actionTypes';
import { ADVERSTINFO_NAMESPACE } from '@/common/constants';

export function adverstInfoFetchSuccess(items) {
  return {
    type: `${ADVERSTINFO_NAMESPACE}/${ADVERST_INFO.SUCCESS}`,
    payload: {
      items,
    },
  };
}

export function adverstInfoFetchFailure() {
  return {
    type: `${ADVERSTINFO_NAMESPACE}/${ADVERST_INFO.FAILURE}`,
    payload: {},
  };
}

export function adverstInfoFetch(params, refreshing = false) {
  return {
    type: `${ADVERSTINFO_NAMESPACE}/${ADVERST_INFO.REQUEST}`,
    payload: {
      params,
      refreshing,
    },
  };
}

export function adverstInfoClear() {
  return {
    type: `${ADVERSTINFO_NAMESPACE}/${ADVERST_INFO.CLEAR}`,
    payload: {},
  };
}

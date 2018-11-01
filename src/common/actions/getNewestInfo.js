import { GET_NEWEST_INFO } from '@/common/constants/actionTypes';
import { GETNEWESTINFO_NAMESPACE } from '@/common/constants';

export function getNewestInfoFetchSuccess(items) {
  return {
    type: `${GETNEWESTINFO_NAMESPACE}/${GET_NEWEST_INFO.SUCCESS}`,
    payload: {
      items,
    },
  };
}

export function getNewestInfoFetchFailure() {
  return {
    type: `${GETNEWESTINFO_NAMESPACE}/${GET_NEWEST_INFO.FAILURE}`,
    payload: {},
  };
}

export function getNewestInfoFetch() {
  return {
    type: `${GETNEWESTINFO_NAMESPACE}/${GET_NEWEST_INFO.REQUEST}`,
    payload: {},
  };
}

export function getNewestInfoClear() {
  return {
    type: `${GETNEWESTINFO_NAMESPACE}/${GET_NEWEST_INFO.CLEAR}`,
    payload: {},
  };
}

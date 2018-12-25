import { ENCHASHMENT_GETLIST } from '@/common/constants/actionTypes';
import { ENCHASHMENT_GETLIST_NAMESPACE } from '@/common/constants';

export function enchashmentGetListFetchSuccess(item) {
  return {
    type: `${ENCHASHMENT_GETLIST_NAMESPACE}/${ENCHASHMENT_GETLIST.SUCCESS}`,
    payload: {
      item,
    },
  };
}

export function enchashmentGetListFetchFailure() {
  return {
    type: `${ENCHASHMENT_GETLIST_NAMESPACE}/${ENCHASHMENT_GETLIST.FAILURE}`,
    payload: {},
  };
}

export function enchashmentGetListFetch(params) {
  return {
    type: `${ENCHASHMENT_GETLIST_NAMESPACE}/${ENCHASHMENT_GETLIST.REQUEST}`,
    payload: {
      ...params,
    },
  };
}

export function enchashmentGetListClear() {
  return {
    type: `${ENCHASHMENT_GETLIST_NAMESPACE}/${ENCHASHMENT_GETLIST.CLEAR}`,
    payload: {},
  };
}

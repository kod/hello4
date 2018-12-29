import { ENCHASHMENT_GETLIST } from '@src/common/constants/actionTypes';

export function enchashmentGetListFetchSuccess(item) {
  return {
    type: ENCHASHMENT_GETLIST.SUCCESS,
    payload: {
      item,
    },
  };
}

export function enchashmentGetListFetchFailure() {
  return {
    type: ENCHASHMENT_GETLIST.FAILURE,
    payload: {},
  };
}

export function enchashmentGetListFetch(params) {
  return {
    type: ENCHASHMENT_GETLIST.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function enchashmentGetListClear() {
  return {
    type: ENCHASHMENT_GETLIST.CLEAR,
    payload: {},
  };
}

import { INIT_ADVERST_COMMON } from '@src/common/constants/actionTypes';

export function initAdverstCommonFetchSuccess(items, totalpage, currentpage) {
  return {
    type: INIT_ADVERST_COMMON.SUCCESS,
    payload: {
      items,
      totalpage,
      currentpage,
    },
  };
}

export function initAdverstCommonFetchFailure() {
  return {
    type: INIT_ADVERST_COMMON.FAILURE,
    payload: {},
  };
}

export function initAdverstCommonFetch(currentpage = '1', pagesize = '3') {
  return {
    type: INIT_ADVERST_COMMON.REQUEST,
    payload: {
      currentpage,
      pagesize,
    },
  };
}

export function initAdverstCommonClear() {
  return {
    type: INIT_ADVERST_COMMON.CLEAR,
    payload: {},
  };
}

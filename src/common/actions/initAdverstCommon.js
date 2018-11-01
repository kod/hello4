import { INIT_ADVERST_COMMON } from '@/common/constants/actionTypes';
import { INITADVERSTCOMMON_NAMESPACE } from '@/common/constants';

export function initAdverstCommonFetchSuccess(items, totalpage, currentpage) {
  return {
    type: `${INITADVERSTCOMMON_NAMESPACE}/${INIT_ADVERST_COMMON.SUCCESS}`,
    payload: {
      items,
      totalpage,
      currentpage,
    },
  };
}

export function initAdverstCommonFetchFailure() {
  return {
    type: `${INITADVERSTCOMMON_NAMESPACE}/${INIT_ADVERST_COMMON.FAILURE}`,
    payload: {},
  };
}

export function initAdverstCommonFetch(currentpage = '1', pagesize = '3') {
  return {
    type: `${INITADVERSTCOMMON_NAMESPACE}/${INIT_ADVERST_COMMON.REQUEST}`,
    payload: {
      currentpage,
      pagesize,
    },
  };
}

export function initAdverstCommonClear() {
  return {
    type: `${INITADVERSTCOMMON_NAMESPACE}/${INIT_ADVERST_COMMON.CLEAR}`,
    payload: {},
  };
}

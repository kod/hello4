import { COLLECT_FILES } from '@/common/constants/actionTypes';

export function collectFilesFetchSuccess(item) {
  return {
    type: COLLECT_FILES.SUCCESS,
    payload: {
      item,
    },
  };
}

export function collectFilesFetchFailure() {
  return {
    type: COLLECT_FILES.FAILURE,
    payload: {},
  };
}

export function collectFilesFetch(params) {
  return {
    type: COLLECT_FILES.REQUEST,
    payload: params,
  };
}

export function collectFilesClear() {
  return {
    type: COLLECT_FILES.CLEAR,
    payload: {},
  };
}

export function collectFilesRemove(index) {
  return {
    type: COLLECT_FILES.REMOVE,
    payload: {
      index,
    },
  };
}

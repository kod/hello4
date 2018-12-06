import { COLLECT_FILES } from '@/common/constants/actionTypes';
import { COLLECTFILES_NAMESPACE } from '@/common/constants';

export function collectFilesFetchSuccess(item) {
  return {
    type: `${COLLECTFILES_NAMESPACE}/${COLLECT_FILES.SUCCESS}`,
    payload: {
      item,
    },
  };
}

export function collectFilesFetchFailure() {
  return {
    type: `${COLLECTFILES_NAMESPACE}/${COLLECT_FILES.FAILURE}`,
    payload: {},
  };
}

export function collectFilesFetch(params) {
  return {
    type: `${COLLECTFILES_NAMESPACE}/${COLLECT_FILES.REQUEST}`,
    payload: params,
  };
}

export function collectFilesClear() {
  return {
    type: `${COLLECTFILES_NAMESPACE}/${COLLECT_FILES.CLEAR}`,
    payload: {},
  };
}

export function collectFilesRemove(index) {
  return {
    type: `${COLLECTFILES_NAMESPACE}/${COLLECT_FILES.REMOVE}`,
    payload: {
      index,
    },
  };
}

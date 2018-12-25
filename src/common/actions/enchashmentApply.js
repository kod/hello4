import { ENCHASHMENT_APPLY } from '@/common/constants/actionTypes';
import { ENCHASHMENT_APPLY_NAMESPACE } from '@/common/constants';

export function enchashmentApplyFetchSuccess(screen) {
  return {
    type: `${ENCHASHMENT_APPLY_NAMESPACE}/${ENCHASHMENT_APPLY.SUCCESS}`,
    payload: {
      screen,
    },
  };
}

export function enchashmentApplyFetchFailure() {
  return {
    type: `${ENCHASHMENT_APPLY_NAMESPACE}/${ENCHASHMENT_APPLY.FAILURE}`,
    payload: {},
  };
}

export function enchashmentApplyFetch(params) {
  return {
    type: `${ENCHASHMENT_APPLY_NAMESPACE}/${ENCHASHMENT_APPLY.REQUEST}`,
    payload: {
      ...params,
    },
  };
}

export function enchashmentApplyClear() {
  return {
    type: `${ENCHASHMENT_APPLY_NAMESPACE}/${ENCHASHMENT_APPLY.CLEAR}`,
    payload: {},
  };
}

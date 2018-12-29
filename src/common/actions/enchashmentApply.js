import { ENCHASHMENT_APPLY } from '@src/common/constants/actionTypes';

export function enchashmentApplyFetchSuccess(screen) {
  return {
    type: ENCHASHMENT_APPLY.SUCCESS,
    payload: {
      screen,
    },
  };
}

export function enchashmentApplyFetchFailure() {
  return {
    type: ENCHASHMENT_APPLY.FAILURE,
    payload: {},
  };
}

export function enchashmentApplyFetch(params) {
  return {
    type: ENCHASHMENT_APPLY.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function enchashmentApplyClear() {
  return {
    type: ENCHASHMENT_APPLY.CLEAR,
    payload: {},
  };
}

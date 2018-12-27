import { ENCHASHMENT_CONFIG } from '@/common/constants/actionTypes';

export function enchashmentConfigFetchSuccess(feeRate, limit) {
  return {
    type: ENCHASHMENT_CONFIG.SUCCESS,
    payload: {
      feeRate,
      limit,
    },
  };
}

export function enchashmentConfigFetchFailure() {
  return {
    type: ENCHASHMENT_CONFIG.FAILURE,
    payload: {},
  };
}

export function enchashmentConfigFetch(params) {
  return {
    type: ENCHASHMENT_CONFIG.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function enchashmentConfigClear() {
  return {
    type: ENCHASHMENT_CONFIG.CLEAR,
    payload: {},
  };
}

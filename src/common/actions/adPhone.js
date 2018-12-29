import { AD_PHONE } from '@src/common/constants/actionTypes';

export function adPhoneFetchSuccess(
  phoneAdList,
  phoneAdBanerList,
  classfyinfo,
) {
  return {
    type: AD_PHONE.SUCCESS,
    payload: {
      phoneAdList,
      phoneAdBanerList,
      classfyinfo,
    },
  };
}

export function adPhoneFetchFailure() {
  return {
    type: AD_PHONE.FAILURE,
    payload: {},
  };
}

export function adPhoneFetch(refreshing = false) {
  return {
    type: AD_PHONE.REQUEST,
    payload: {
      refreshing,
    },
  };
}

export function adPhoneClear() {
  return {
    type: AD_PHONE.CLEAR,
    payload: {},
  };
}

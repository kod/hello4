import { AD_PHONE } from '@/common/constants/actionTypes';
import { ADPHONE_NAMESPACE } from '@/common/constants';

export function adPhoneFetchSuccess(
  phoneAdList,
  phoneAdBanerList,
  classfyinfo,
) {
  return {
    type: `${ADPHONE_NAMESPACE}/${AD_PHONE.SUCCESS}`,
    payload: {
      phoneAdList,
      phoneAdBanerList,
      classfyinfo,
    },
  };
}

export function adPhoneFetchFailure() {
  return {
    type: `${ADPHONE_NAMESPACE}/${AD_PHONE.FAILURE}`,
    payload: {},
  };
}

export function adPhoneFetch(refreshing = false) {
  return {
    type: `${ADPHONE_NAMESPACE}/${AD_PHONE.REQUEST}`,
    payload: {
      refreshing,
    },
  };
}

export function adPhoneClear() {
  return {
    type: `${ADPHONE_NAMESPACE}/${AD_PHONE.CLEAR}`,
    payload: {},
  };
}

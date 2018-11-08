import { REGISTER } from '@/common/constants/actionTypes';
import { REGISTER_NAMESPACE } from '@/common/constants';

export function registerFetchSuccess() {
  return {
    type: `${REGISTER_NAMESPACE}/${REGISTER.SUCCESS}`,
    payload: {},
  };
}

export function registerFetchFailure() {
  return {
    type: `${REGISTER_NAMESPACE}/${REGISTER.FAILURE}`,
    payload: {},
  };
}

export function registerFetch(params) {
  return {
    type: `${REGISTER_NAMESPACE}/${REGISTER.REQUEST}`,
    payload: {
      ...params,
    },
  };
}

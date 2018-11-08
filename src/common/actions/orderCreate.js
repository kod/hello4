import { ORDER_CREATE } from '../constants/actionTypes';
import { ORDERCREATE_NAMESPACE } from '@/common/constants';

export function orderCreateFetchSuccess(params) {
  return {
    type: `${ORDERCREATE_NAMESPACE}/${ORDER_CREATE.SUCCESS}`,
    payload: {
      ...params,
    },
  };
}

export function orderCreateFetchFailure() {
  return {
    type: `${ORDERCREATE_NAMESPACE}/${ORDER_CREATE.FAILURE}`,
    payload: {},
  };
}

export function orderCreateFetch(params) {
  return {
    type: `${ORDERCREATE_NAMESPACE}/${ORDER_CREATE.REQUEST}`,
    payload: {
      ...params,
    },
  };
}

export function orderCreateClear() {
  return {
    type: `${ORDERCREATE_NAMESPACE}/${ORDER_CREATE.CLEAR}`,
    payload: {},
  };
}

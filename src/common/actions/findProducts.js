import { FIND_PRODUCTS } from '@/common/constants/actionTypes';

export function findProductsFetchSuccess(items) {
  return {
    type: FIND_PRODUCTS.SUCCESS,
    payload: {
      items,
    },
  };
}

export function findProductsFetchFailure() {
  return {
    type: FIND_PRODUCTS.FAILURE,
    payload: {},
  };
}

export function findProductsFetch(params) {
  return {
    type: FIND_PRODUCTS.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function findProductsClear() {
  return {
    type: FIND_PRODUCTS.CLEAR,
    payload: {},
  };
}

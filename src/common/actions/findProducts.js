import { FIND_PRODUCTS } from '../constants/actionTypes';
import { FINDPRODUCTS_NAMESPACE } from '@/common/constants';

export function findProductsFetchSuccess(items) {
  return {
    type: `${FINDPRODUCTS_NAMESPACE}/${FIND_PRODUCTS.SUCCESS}`,
    payload: {
      items,
    },
  };
}

export function findProductsFetchFailure() {
  return {
    type: `${FINDPRODUCTS_NAMESPACE}/${FIND_PRODUCTS.FAILURE}`,
    payload: {},
  };
}

export function findProductsFetch(params) {
  return {
    type: `${FINDPRODUCTS_NAMESPACE}/${FIND_PRODUCTS.REQUEST}`,
    payload: {
      ...params,
    },
  };
}

export function findProductsClear() {
  return {
    type: `${FINDPRODUCTS_NAMESPACE}/${FIND_PRODUCTS.CLEAR}`,
    payload: {},
  };
}

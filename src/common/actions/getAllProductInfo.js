/* eslint-disable camelcase */
import { GET_ALL_PRODUCT_INFO } from '../constants/actionTypes';
import { GETALLPRODUCTINFO_NAMESPACE } from '@/common/constants';

export function getAllProductInfoFetchSuccess(
  entities,
  items,
  currentPage,
  totalPage,
) {
  return {
    type: `${GETALLPRODUCTINFO_NAMESPACE}/${GET_ALL_PRODUCT_INFO.SUCCESS}`,
    payload: {
      entities,
      items,
      currentPage,
      totalPage,
    },
  };
}

export function getAllProductInfoFetchFailure() {
  return {
    type: `${GETALLPRODUCTINFO_NAMESPACE}/${GET_ALL_PRODUCT_INFO.FAILURE}`,
    payload: {},
  };
}

export function getAllProductInfoFetch({
  parent_id = '0',
  classfy_id = '0',
  sub_classfy_id = '0',
  third_classfy_id = '0',
  pagesize = 6,
  currentPage = 1,
}) {
  return {
    type: `${GETALLPRODUCTINFO_NAMESPACE}/${GET_ALL_PRODUCT_INFO.REQUEST}`,
    payload: {
      parent_id,
      classfy_id,
      sub_classfy_id,
      third_classfy_id,
      pagesize,
      currentPage,
    },
  };
}

export function getAllProductInfoClear() {
  return {
    type: `${GETALLPRODUCTINFO_NAMESPACE}/${GET_ALL_PRODUCT_INFO.CLEAR}`,
    payload: {},
  };
}

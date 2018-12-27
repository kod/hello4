/* eslint-disable camelcase */
import { GET_ALL_PRODUCT_INFO } from '@/common/constants/actionTypes';

export function getAllProductInfoFetchSuccess(
  entities,
  items,
  currentPage,
  totalPage,
) {
  return {
    type: GET_ALL_PRODUCT_INFO.SUCCESS,
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
    type: GET_ALL_PRODUCT_INFO.FAILURE,
    payload: {},
  };
}

export function getAllProductInfoFetch({
  parent_id = '0',
  classfy_id = '0',
  sub_classfy_id = '0',
  third_classfy_id = '0',
  pagesize = 60,
  currentPage = 1,
}) {
  return {
    type: GET_ALL_PRODUCT_INFO.REQUEST,
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
    type: GET_ALL_PRODUCT_INFO.CLEAR,
    payload: {},
  };
}

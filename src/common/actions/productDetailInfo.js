/* eslint-disable camelcase */
import {
  PRODUCT_DETAIL_INFO,
  PRODUCT_DETAIL_SELECT,
  PRODUCT_DETAIL_NUMBER,
  PRODUCT_DETAIL_OPACITY,
} from '@/common/constants/actionTypes';

export function productDetailInfoFetchSuccess({
  product_detail,
  productDetailResult,
  propertiesIdsResult,
  imageDesc,
  propertiesArray,
  propertiesObject,
  propertiesObjectForId,
  productDetailSort,
  screen,
}) {
  return {
    type: PRODUCT_DETAIL_INFO.SUCCESS,
    payload: {
      product_detail,
      detail: productDetailResult,
      propertiesIds: propertiesIdsResult,
      imageDesc,
      propertiesArray,
      propertiesObject,
      propertiesObjectForId,
      productDetailSort,
      screen,
    },
  };
}

export function productDetailInfoFetchFailure(msg) {
  return {
    type: PRODUCT_DETAIL_INFO.FAILURE,
    payload: {
      msg,
    },
  };
}

export function productDetailInfoFetch({
  brandId,
  propertiesIds,
  productIdVIP,
  screen,
}) {
  return {
    type: PRODUCT_DETAIL_INFO.REQUEST,
    payload: {
      brand_id: brandId,
      propertiesIds,
      productIdVIP,
      screen,
    },
  };
}

export function productDetailInfoClear(brand_id) {
  return {
    type: PRODUCT_DETAIL_INFO.CLEAR,
    payload: {
      brand_id,
    },
  };
}

export function productDetailSelect(
  propertiesIdsObject,
  productDetail,
  screen,
) {
  return {
    type: PRODUCT_DETAIL_SELECT.REQUEST,
    payload: {
      propertiesIdsObject,
      productDetail,
      screen,
    },
  };
}

export function productDetailNumberFetch(number) {
  return {
    type: PRODUCT_DETAIL_NUMBER.REQUEST,
    payload: {
      number,
    },
  };
}

export function productDetailOpacityFetch(opacity = 0) {
  return {
    type: PRODUCT_DETAIL_OPACITY.REQUEST,
    payload: {
      opacity,
    },
  };
}

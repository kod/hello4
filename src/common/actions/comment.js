import { COMMENT } from '@src/common/constants/actionTypes';

export function commentFetchSuccess(items) {
  return {
    type: COMMENT.SUCCESS,
    payload: {
      items,
    },
  };
}

export function commentFetchFailure() {
  return {
    type: COMMENT.FAILURE,
    payload: {},
  };
}

export function commentFetch(brandId) {
  return {
    type: COMMENT.REQUEST,
    payload: {
      brand_id: brandId,
    },
  };
}

export function commentClear() {
  return {
    type: COMMENT.CLEAR,
    payload: {},
  };
}

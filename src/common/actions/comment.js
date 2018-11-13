import { COMMENT } from '@/common/constants/actionTypes';
import { COMMENT_NAMESPACE } from '@/common/constants';

export function commentFetchSuccess(items) {
  return {
    type: `${COMMENT_NAMESPACE}/${COMMENT.SUCCESS}`,
    payload: {
      items,
    },
  };
}

export function commentFetchFailure() {
  return {
    type: `${COMMENT_NAMESPACE}/${COMMENT.FAILURE}`,
    payload: {},
  };
}

export function commentFetch(brandId) {
  return {
    type: `${COMMENT_NAMESPACE}/${COMMENT.REQUEST}`,
    payload: {
      brand_id: brandId,
    },
  };
}

export function commentClear() {
  return {
    type: `${COMMENT_NAMESPACE}/${COMMENT.CLEAR}`,
    payload: {},
  };
}

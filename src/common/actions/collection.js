import {
  COLLECTION,
  COLLECTION_ADD,
  COLLECTION_REMOVE,
} from '@src/common/constants/actionTypes';

export function collectionFetchSuccess(items) {
  return {
    type: COLLECTION.SUCCESS,
    payload: {
      items,
    },
  };
}

export function collectionFetchFailure() {
  return {
    type: COLLECTION.FAILURE,
    payload: {},
  };
}

export function collectionFetch() {
  return {
    type: COLLECTION.REQUEST,
    payload: {},
  };
}

export function collectionClear() {
  return {
    type: COLLECTION.CLEAR,
    payload: {},
  };
}

export function collectionAddFetchSuccess() {
  return {
    type: COLLECTION_ADD.SUCCESS,
    payload: {},
  };
}

export function collectionAddFetchFailure() {
  return {
    type: COLLECTION_ADD.FAILURE,
    payload: {},
  };
}

export function collectionAddFetch(brandIds) {
  return {
    type: COLLECTION_ADD.REQUEST,
    payload: {
      brandIds,
    },
  };
}
export function collectionRemoveFetchSuccess() {
  return {
    type: COLLECTION_REMOVE.SUCCESS,
    payload: {},
  };
}

export function collectionRemoveFetchFailure() {
  return {
    type: COLLECTION_REMOVE.FAILURE,
    payload: {},
  };
}

export function collectionRemoveFetch(brandId) {
  return {
    type: COLLECTION_REMOVE.REQUEST,
    payload: {
      brand_id: brandId,
    },
  };
}

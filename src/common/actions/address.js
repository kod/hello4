import {
  ADDRESS,
  ADDRESS_REMOVE,
  ADDRESS_SELECT,
} from '@/common/constants/actionTypes';
import { ADDRESS_NAMESPACE } from '@/common/constants';

export function addressFetchSuccess(items, addressSelectedId) {
  return {
    type: `${ADDRESS_NAMESPACE}/${ADDRESS.SUCCESS}`,
    payload: {
      items,
      addressSelectedId,
    },
  };
}

export function addressFetchFailure() {
  return {
    type: `${ADDRESS_NAMESPACE}/${ADDRESS.FAILURE}`,
    payload: {},
  };
}

export function addressFetch(refreshing = false) {
  return {
    type: `${ADDRESS_NAMESPACE}/${ADDRESS.REQUEST}`,
    payload: {
      refreshing,
    },
  };
}

export function addressClear() {
  return {
    type: `${ADDRESS_NAMESPACE}/${ADDRESS.CLEAR}`,
    payload: {},
  };
}

export function addressRemoveSuccess() {
  return {
    type: `${ADDRESS_NAMESPACE}/${ADDRESS_REMOVE.SUCCESS}`,
    payload: {},
  };
}

export function addressRemoveFailure() {
  return {
    type: `${ADDRESS_NAMESPACE}/${ADDRESS_REMOVE.FAILURE}`,
    payload: {},
  };
}

export function addressRemoveFetch(adds) {
  return {
    type: `${ADDRESS_NAMESPACE}/${ADDRESS_REMOVE.REQUEST}`,
    payload: {
      adds,
    },
  };
}

export function addressSelectSuccess() {
  return {
    type: `${ADDRESS_NAMESPACE}/${ADDRESS_SELECT.SUCCESS}`,
    payload: {},
  };
}

export function addressSelectFailure() {
  return {
    type: `${ADDRESS_NAMESPACE}/${ADDRESS_SELECT.FAILURE}`,
    payload: {},
  };
}

export function addressSelectFetch(id) {
  return {
    type: `${ADDRESS_NAMESPACE}/${ADDRESS_SELECT.REQUEST}`,
    payload: {
      id,
    },
  };
}

import {
  ADDRESS,
  ADDRESS_ADD,
  ADDRESS_REMOVE,
  ADDRESS_MODIFY,
  ADDRESS_SELECT,
} from '../constants/actionTypes';
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

export function addressAddSuccess(screen) {
  return {
    type: `${ADDRESS_NAMESPACE}/${ADDRESS_ADD.SUCCESS}`,
    payload: {
      screen,
    },
  };
}

export function addressAddFailure() {
  return {
    type: `${ADDRESS_NAMESPACE}/${ADDRESS_ADD.FAILURE}`,
    payload: {},
  };
}

export function addressAddFetch(params) {
  return {
    type: `${ADDRESS_NAMESPACE}/${ADDRESS_ADD.REQUEST}`,
    payload: {
      ...params,
    },
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

export function addressModifyClear() {
  return {
    type: `${ADDRESS_NAMESPACE}/${ADDRESS_MODIFY.CLEAR}`,
    payload: {},
  };
}

export function addressModifySuccess() {
  return {
    type: `${ADDRESS_NAMESPACE}/${ADDRESS_MODIFY.SUCCESS}`,
    payload: {},
  };
}

export function addressModifyFailure() {
  return {
    type: `${ADDRESS_NAMESPACE}/${ADDRESS_MODIFY.FAILURE}`,
    payload: {},
  };
}

export function addressModifyFetch(item) {
  return {
    type: `${ADDRESS_NAMESPACE}/${ADDRESS_MODIFY.REQUEST}`,
    payload: {
      ...item,
      addrid: item.id,
      // isdefault: 'Y',
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

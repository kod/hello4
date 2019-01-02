import { GET_MENU, GET_MENU_INDEX } from '@src/common/constants/actionTypes';

export function getMenuFetchSuccess(params) {
  return {
    type: GET_MENU.SUCCESS,
    payload: {
      ...params,
    },
  };
}

export function getMenuFetchFailure() {
  return {
    type: GET_MENU.FAILURE,
    payload: {},
  };
}

export function getMenuFetch(params) {
  return {
    type: GET_MENU.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function getMenuClear() {
  return {
    type: GET_MENU.CLEAR,
    payload: {},
  };
}

export function getMenuIndexFetch(index) {
  return {
    type: GET_MENU_INDEX.REQUEST,
    payload: {
      index,
    },
  };
}

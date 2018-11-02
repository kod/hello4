import { GET_MENU, GET_MENU_INDEX } from '@/common/constants/actionTypes';
import { GETMENU_NAMESPACE } from '@/common/constants';

export function getMenuFetchSuccess(params) {
  return {
    type: `${GETMENU_NAMESPACE}/${GET_MENU.SUCCESS}`,
    payload: {
      ...params,
    },
  };
}

export function getMenuFetchFailure() {
  return {
    type: `${GETMENU_NAMESPACE}/${GET_MENU.FAILURE}`,
    payload: {},
  };
}

export function getMenuFetch(params) {
  return {
    type: `${GETMENU_NAMESPACE}/${GET_MENU.REQUEST}`,
    payload: {
      ...params,
    },
  };
}

export function getMenuClear() {
  return {
    type: `${GETMENU_NAMESPACE}/${GET_MENU.CLEAR}`,
    payload: {},
  };
}

export function getMenuIndexFetch(index) {
  return {
    type: `${GETMENU_NAMESPACE}/${GET_MENU_INDEX.REQUEST}`,
    payload: {
      index,
    },
  };
}

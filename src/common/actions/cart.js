import {
  CART,
  CART_ADD,
  CART_NUMBER,
  CART_SELECT,
  CART_SELECTALL,
  CART_EDIT,
  CART_EDITINIT,
  CART_DELETE,
  CART_SELECTDELALL,
} from '@/common/constants/actionTypes';

export function cartAddSuccess() {
  return {
    type: CART_ADD.SUCCESS,
    payload: {},
  };
}

export function cartAddFailure() {
  return {
    type: CART_ADD.FAILURE,
    payload: {},
  };
}

export function cartAddRequest(cartitems) {
  return {
    type: CART_ADD.REQUEST,
    payload: {
      cartitems,
    },
  };
}

export function cartDeleteSuccess() {
  return {
    type: CART_DELETE.SUCCESS,
    payload: {},
  };
}

export function cartDeleteFailure() {
  return {
    type: CART_DELETE.FAILURE,
    payload: {},
  };
}

export function cartDeleteRequest(cartitemids) {
  return {
    type: CART_DELETE.REQUEST,
    payload: {
      cartitemids,
    },
  };
}

export function cartEditInitSuccess() {
  return {
    type: CART_EDITINIT.SUCCESS,
    payload: {},
  };
}

export function cartEditInitFailure() {
  return {
    type: CART_EDITINIT.FAILURE,
    payload: {},
  };
}

export function cartEditInitRequest() {
  return {
    type: CART_EDITINIT.REQUEST,
    payload: {},
  };
}

export function cartEditSuccess() {
  return {
    type: CART_EDIT.SUCCESS,
    payload: {},
  };
}

export function cartEditFailure() {
  return {
    type: CART_EDIT.FAILURE,
    payload: {},
  };
}

export function cartEditRequest() {
  return {
    type: CART_EDIT.REQUEST,
    payload: {},
  };
}

export function cartSelectDelAllSuccess() {
  return {
    type: CART_SELECTDELALL.SUCCESS,
    payload: {},
  };
}

export function cartSelectDelAllFailure() {
  return {
    type: CART_SELECTDELALL.FAILURE,
    payload: {},
  };
}

export function cartSelectDelAllRequest() {
  return {
    type: CART_SELECTDELALL.REQUEST,
    payload: {},
  };
}

export function cartSelectAllSuccess() {
  return {
    type: CART_SELECTALL.SUCCESS,
    payload: {},
  };
}

export function cartSelectAllFailure() {
  return {
    type: CART_SELECTALL.FAILURE,
    payload: {},
  };
}

export function cartSelectAllRequest() {
  return {
    type: CART_SELECTALL.REQUEST,
    payload: {},
  };
}

export function cartSelectSuccess() {
  return {
    type: CART_SELECT.SUCCESS,
    payload: {},
  };
}

export function cartSelectFailure() {
  return {
    type: CART_SELECT.FAILURE,
    payload: {},
  };
}

export function cartSelectRequest(id, selected) {
  return {
    type: CART_SELECT.REQUEST,
    payload: {
      id,
      selected,
    },
  };
}

export function cartNumberSuccess() {
  return {
    type: CART_NUMBER.SUCCESS,
    payload: {},
  };
}

export function cartNumberFailure() {
  return {
    type: CART_NUMBER.FAILURE,
    payload: {},
  };
}

export function cartNumberRequest(funid, cartitemid, quetity) {
  return {
    type: CART_NUMBER.REQUEST,
    payload: {
      funid,
      cartitemid,
      quetity,
    },
  };
}

export function cartSuccess(items, products, details) {
  return {
    type: CART.SUCCESS,
    payload: {
      items,
      products,
      details,
    },
  };
}

export function cartFailure(rankingMode) {
  return {
    type: CART.FAILURE,
    payload: {
      rankingMode,
    },
  };
}

export function cartRequest() {
  return {
    type: CART.REQUEST,
    payload: {},
  };
}

export function cartClear() {
  return {
    type: CART.CLEAR,
  };
}

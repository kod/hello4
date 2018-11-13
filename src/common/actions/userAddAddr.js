import { ADDRESS_ADD } from '@/common/constants/actionTypes';
import { USERADDADDR_NAMESPACE } from '@/common/constants';

export function addressAddSuccess(screen) {
  return {
    type: `${USERADDADDR_NAMESPACE}/${ADDRESS_ADD.SUCCESS}`,
    payload: {
      screen,
    },
  };
}

export function addressAddFailure() {
  return {
    type: `${USERADDADDR_NAMESPACE}/${ADDRESS_ADD.FAILURE}`,
    payload: {},
  };
}

export function addressAddFetch(params) {
  return {
    type: `${USERADDADDR_NAMESPACE}/${ADDRESS_ADD.REQUEST}`,
    payload: {
      ...params,
    },
  };
}

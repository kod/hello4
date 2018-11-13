import { ADDRESS_MODIFY } from '@/common/constants/actionTypes';
import { ADDRESSMODIFY_NAMESPACE } from '@/common/constants';

export function addressModifyClear() {
  return {
    type: `${ADDRESSMODIFY_NAMESPACE}/${ADDRESS_MODIFY.CLEAR}`,
    payload: {},
  };
}

export function addressModifySuccess() {
  return {
    type: `${ADDRESSMODIFY_NAMESPACE}/${ADDRESS_MODIFY.SUCCESS}`,
    payload: {},
  };
}

export function addressModifyFailure() {
  return {
    type: `${ADDRESSMODIFY_NAMESPACE}/${ADDRESS_MODIFY.FAILURE}`,
    payload: {},
  };
}

export function addressModifyFetch(item) {
  return {
    type: `${ADDRESSMODIFY_NAMESPACE}/${ADDRESS_MODIFY.REQUEST}`,
    payload: {
      ...item,
      addrid: item.id,
    },
  };
}

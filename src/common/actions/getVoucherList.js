import { GET_VOUCHER_LIST } from '@/common/constants/actionTypes';
import { GETVOUCHERLIST_NAMESPACE } from '@/common/constants';

export function getVoucherListFetchSuccess({ items, status }) {
  return {
    type: `${GETVOUCHERLIST_NAMESPACE}/${GET_VOUCHER_LIST.SUCCESS}`,
    payload: {
      items,
      status,
    },
  };
}

export function getVoucherListFetchFailure() {
  return {
    type: `${GETVOUCHERLIST_NAMESPACE}/${GET_VOUCHER_LIST.FAILURE}`,
    payload: {},
  };
}

export function getVoucherListFetch(params) {
  return {
    type: `${GETVOUCHERLIST_NAMESPACE}/${GET_VOUCHER_LIST.REQUEST}`,
    payload: {
      ...params,
    },
  };
}

export function getVoucherListClear(user) {
  return {
    type: `${GETVOUCHERLIST_NAMESPACE}/${GET_VOUCHER_LIST.CLEAR}`,
    payload: {
      user,
    },
  };
}

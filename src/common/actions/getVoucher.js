import { GET_VOUCHER } from '@/common/constants/actionTypes';
import { GETVOUCHER_NAMESPACE } from '@/common/constants';

export function getVoucherFetchSuccess(items) {
  return {
    type: `${GETVOUCHER_NAMESPACE}/${GET_VOUCHER.SUCCESS}`,
    payload: {
      items,
    },
  };
}

export function getVoucherFetchFailure() {
  return {
    type: `${GETVOUCHER_NAMESPACE}/${GET_VOUCHER.FAILURE}`,
    payload: {},
  };
}

export function getVoucherFetch(params) {
  return {
    type: `${GETVOUCHER_NAMESPACE}/${GET_VOUCHER.REQUEST}`,
    payload: {
      ...params,
    },
  };
}

export function getVoucherClear() {
  return {
    type: `${GETVOUCHER_NAMESPACE}/${GET_VOUCHER.CLEAR}`,
    payload: {},
  };
}

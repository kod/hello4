import { JUDGE_VOUCHER } from '@src/common/constants/actionTypes';

export function judgeVoucherFetchSuccess({ items, status }) {
  return {
    type: JUDGE_VOUCHER.SUCCESS,
    payload: {
      items,
      status,
    },
  };
}

export function judgeVoucherFetchFailure() {
  return {
    type: JUDGE_VOUCHER.FAILURE,
    payload: {
      // rankingMode,
    },
  };
}

export function judgeVoucherFetch(params) {
  return {
    type: JUDGE_VOUCHER.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function judgeVoucherClear(user) {
  return {
    type: JUDGE_VOUCHER.CLEAR,
    payload: {
      user,
    },
  };
}

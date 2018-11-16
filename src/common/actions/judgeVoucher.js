import { JUDGE_VOUCHER } from '../constants/actionTypes';
import { JUDGEVOUCHER_NAMESPACE } from '@/common/constants';

export function judgeVoucherFetchSuccess({ items, status }) {
  return {
    type: `${JUDGEVOUCHER_NAMESPACE}/${JUDGE_VOUCHER.SUCCESS}`,
    payload: {
      items,
      status,
    },
  };
}

export function judgeVoucherFetchFailure() {
  return {
    type: `${JUDGEVOUCHER_NAMESPACE}/${JUDGE_VOUCHER.FAILURE}`,
    payload: {
      // rankingMode,
    },
  };
}

export function judgeVoucherFetch(params) {
  return {
    type: `${JUDGEVOUCHER_NAMESPACE}/${JUDGE_VOUCHER.REQUEST}`,
    payload: {
      ...params,
    },
  };
}

export function judgeVoucherClear(user) {
  return {
    type: `${JUDGEVOUCHER_NAMESPACE}/${JUDGE_VOUCHER.CLEAR}`,
    payload: {
      user,
    },
  };
}

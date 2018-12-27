import { RETURN_MONEY } from '@/common/constants/actionTypes';

export function returnMoneyFetchSuccess(item) {
  return {
    type: RETURN_MONEY.SUCCESS,
    payload: {
      item,
    },
  };
}

export function returnMoneyFetchFailure() {
  return {
    type: RETURN_MONEY.FAILURE,
    payload: {},
  };
}

export function returnMoneyFetch(totalamounts, repaymentmonths, payrate) {
  return {
    type: RETURN_MONEY.REQUEST,
    payload: {
      totalamounts,
      repaymentmonths,
      payrate,
    },
  };
}

export function returnMoneyClear() {
  return {
    type: RETURN_MONEY.CLEAR,
    payload: {},
  };
}

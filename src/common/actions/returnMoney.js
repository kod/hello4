import { RETURN_MONEY } from '@/common/constants/actionTypes';
import { RETURNMONEY_NAMESPACE } from '@/common/constants';

export function returnMoneyFetchSuccess(item) {
  return {
    type: `${RETURNMONEY_NAMESPACE}/${RETURN_MONEY.SUCCESS}`,
    payload: {
      item,
    },
  };
}

export function returnMoneyFetchFailure() {
  return {
    type: `${RETURNMONEY_NAMESPACE}/${RETURN_MONEY.FAILURE}`,
    payload: {},
  };
}

export function returnMoneyFetch(totalamounts, repaymentmonths, payrate) {
  return {
    type: `${RETURNMONEY_NAMESPACE}/${RETURN_MONEY.REQUEST}`,
    payload: {
      totalamounts,
      repaymentmonths,
      payrate,
    },
  };
}

export function returnMoneyClear() {
  return {
    type: `${RETURNMONEY_NAMESPACE}/${RETURN_MONEY.CLEAR}`,
    payload: {},
  };
}

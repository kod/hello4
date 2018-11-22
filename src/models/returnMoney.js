import dayjs from 'dayjs';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { RETURNMONEY_NAMESPACE } from '@/common/constants';
import { RETURN_MONEY } from '@/common/constants/actionTypes';
import {
  returnMoneyFetchSuccess,
  returnMoneyFetchFailure,
} from '@/common/actions/returnMoney';
import { addError } from '@/common/actions/error';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: {},
};

export default {
  namespace: RETURNMONEY_NAMESPACE,

  state: initState,

  effects: {
    *[RETURN_MONEY.REQUEST](action, { apply, put }) {
      try {
        const { totalamounts, payrate, repaymentmonths } = action.payload;

        const Key = 'settleKey';
        const appId = '3';
        const method = 'fun.trade.returnMoney';
        const charset = 'utf-8';
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const version = '1.0';

        const signType = signTypeMD5(appId, method, charset, Key, true);

        const encrypt = encryptMD5(
          [
            {
              key: 'totalamounts',
              value: totalamounts,
            },
            {
              key: 'repaymentmonths',
              value: repaymentmonths,
            },
            {
              key: 'payrate',
              value: payrate,
            },
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.returnMoney, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            totalamounts,
            repaymentmonths,
            payrate,
          },
        ]);

        if (response.code !== 10000) {
          yield put(returnMoneyFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(returnMoneyFetchSuccess(response.details));
        }
      } catch (err) {
        yield put(returnMoneyFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [RETURN_MONEY.CLEAR]() {
      return {
        ...initState,
      };
    },
    [RETURN_MONEY.REQUEST](state, action) {
      return {
        ...state,
        loading: true,
        [action.payload.key]: action.payload.value,
      };
    },
    [RETURN_MONEY.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        items: {
          ...state.items,
          ...action.payload.item,
        },
      };
    },
    [RETURN_MONEY.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
  },
};

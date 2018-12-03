import dayjs from 'dayjs';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5, o } from '@/utils/AuthEncrypt';
import { ORDERCANCEL_NAMESPACE, BUYOO } from '@/common/constants';
import { ORDER_CANCEL } from '@/common/constants/actionTypes';
import {
  orderCancelFetchSuccess,
  orderCancelFetchFailure,
} from '@/common/actions/orderCancel';
import { addError } from '@/common/actions/error';
import { b, dispatchEvent } from '@/utils';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
};

export default {
  namespace: ORDERCANCEL_NAMESPACE,

  state: initState,

  effects: {
    *[ORDER_CANCEL.REQUEST](action, { apply, put }) {
      try {
        const { tradeno, orderno, status, screen } = action.payload;
        const funid = o(b, BUYOO).result;

        const Key = 'tradeKey';
        const appId = '3';
        const method = 'fun.trade.orderCancel';
        const charset = 'utf-8';
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const version = '2.0';

        const signType = signTypeMD5(appId, method, charset, Key, true);

        const encrypt = encryptMD5(
          [
            {
              key: 'funid',
              value: funid,
            },
            {
              key: 'orderno',
              value: orderno,
            },
            {
              key: 'tradeno',
              value: tradeno,
            },
            {
              key: 'status',
              value: status,
            },
          ],
          Key,
        );

        const options = [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            funid,
            orderno,
            tradeno,
            status,
          },
        ];

        const response = yield apply(buyoo, buyoo.orderCancel, options);

        if (response.code !== 10000) {
          yield put(orderCancelFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(
            orderCancelFetchSuccess({
              orderno,
              tradeno,
              screen,
            }),
          );
        }
      } catch (err) {
        yield put(orderCancelFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
    *[ORDER_CANCEL.SUCCESS](action) {
      const { screen } = action.payload;
      try {
        yield dispatchEvent(screen, {
          method: 'orderCancel',
          params: {},
        });
      } catch (err) {
        console.warn(err);
      }
    },
  },

  reducers: {
    [ORDER_CANCEL.CLEAR]() {
      return {
        ...initState,
      };
    },
    [ORDER_CANCEL.SUCCESS](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    },
    [ORDER_CANCEL.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
  },
};

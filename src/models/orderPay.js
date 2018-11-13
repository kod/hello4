import moment from 'moment';
import buyoo from '@/services/api';
import { formatMessage } from 'umi/locale';

import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { ORDERPAY_NAMESPACE, INTERNET_BANK_PAYWAY } from '@/common/constants';
import { ORDER_PAY } from '@/common/constants/actionTypes';
import {
  orderPayFetchSuccess,
  orderPayFetchFailure,
} from '@/common/actions/orderPay';
import { addError } from '@/common/actions/error';
import { getAuthUserFunid } from '@/common/selectors';
import { dispatchEvent } from '@/utils';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  ret: '',
};

export default {
  namespace: ORDERPAY_NAMESPACE,

  state: initState,

  effects: {
    *[ORDER_PAY.REQUEST](action, { apply, put, select }) {
      try {
        const {
          screen = '',
          tradeno,
          orderno,
          payway,
          paypassword = '',
          payrate = 0,
          repaymentmonth = 0,
          payvalue = 0,
          pop = 1, // 返回层级
        } = action.payload;
        const funid = yield select(getAuthUserFunid);

        const Key = 'tradeKey';
        const appId = '3';
        const method = 'fun.trade.order.pay';
        const charset = 'utf-8';
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        const version = '2.0';

        const signType = signTypeMD5(appId, method, charset, Key, true);

        const encrypt = encryptMD5(
          [
            {
              key: 'tradeno',
              value: tradeno,
            },
            {
              key: 'orderno',
              value: orderno,
            },
            {
              key: 'payway',
              value: payway,
            },
            {
              key: 'paypassword',
              value: paypassword,
            },
            {
              key: 'payrate',
              value: payrate,
            },
            {
              key: 'repaymentmonth',
              value: repaymentmonth,
            },
            {
              key: 'payvalue',
              value: payvalue,
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
            tradeno,
            orderno,
            payway,
            paypassword,
            payrate,
            repaymentmonth,
            payvalue,
          },
        ];

        if (payway === INTERNET_BANK_PAYWAY) {
          yield put(orderPayFetchFailure());

          console.log(buyoo.orderPayInternetBank(options[0]));
          window.location.href = buyoo.orderPayInternetBank(options[0]);
          return false;
        }

        const response = yield apply(buyoo, buyoo.orderPay, options);

        if (response.code !== 10000) {
          yield put(orderPayFetchFailure());
          switch (response.code) {
            case 60051:
              yield put(
                addError(formatMessage({ id: 'transactionPasswordWrong' })),
              );
              break;

            default:
              yield put(
                addError(`msg: ${response.msg}; code: ${response.code}`),
              );
              break;
          }
        } else {
          yield put(
            orderPayFetchSuccess({
              ret: response.result,
              screen,
              payvalue,
              pop,
            }),
          );
        }
      } catch (err) {
        yield put(orderPayFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
      return true;
    },
    *[ORDER_PAY.SUCCESS](action) {
      try {
        const { screen, pop, ret, payvalue } = action.payload;
        yield dispatchEvent(screen, {
          method: 'orderPay',
          params: {
            ret,
            payvalue,
            pop,
          },
        });
        // yield apply(DeviceEventEmitter, DeviceEventEmitter.emit, [
        //   screen,
        //   { ret, payvalue, pop },
        // ]);
      } catch (err) {
        console.warn(err);
      }
    },
  },

  reducers: {
    [ORDER_PAY.CLEAR]() {
      return {
        ...initState,
      };
    },
    [ORDER_PAY.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        ret: action.payload.ret,
      };
    },
    [ORDER_PAY.FAILURE](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    },
  },
};

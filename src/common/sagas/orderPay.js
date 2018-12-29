import { formatMessage } from 'umi/locale';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import dayjs from 'dayjs';
import { INTERNET_BANK_PAYWAY } from '@src/common/constants';
import {
  orderPayFetchSuccess,
  orderPayFetchFailure,
} from '@src/common/actions/orderPay';
import { addError } from '@src/common/actions/error';
import buyoo from '@src/services/api';
import { ORDER_PAY } from '@src/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@src/utils/AuthEncrypt';

import { dispatchEventBuyoo } from '@src/utils';
import { getAuthUser } from '@src/common/selectors';

export function* orderPayFetchWatchHandle(action) {
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
    const authUser = yield select(getAuthUser);
    const funid = authUser ? authUser.result : '';

    const Key = 'tradeKey';
    const appId = '3';
    const method = 'fun.trade.order.pay';
    const charset = 'utf-8';
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
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

      // console.log(buyoo.orderPayInternetBank(options[0]));
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
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
          break;
      }
    } else {
      yield put(
        orderPayFetchSuccess({
          ret: response.result,
          screen,
          payvalue,
          pop,
          tradeno,
          orderno,
          payway,
        }),
      );
    }
  } catch (err) {
    yield put(orderPayFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
  return true;
}

export function* orderPayFetchWatch() {
  yield takeEvery(ORDER_PAY.REQUEST, orderPayFetchWatchHandle);
}

export function* orderPaySuccessWatchHandle(action) {
  try {
    const {
      screen,
      pop,
      ret,
      payvalue,
      orderno,
      tradeno,
      payway,
    } = action.payload;
    yield dispatchEventBuyoo(screen, {
      method: 'orderPay',
      params: {
        ret,
        payvalue,
        pop,
        orderno,
        tradeno,
        payway,
      },
    });
    // yield apply(DeviceEventEmitter, DeviceEventEmitter.emit, [
    //   screen,
    //   { ret, payvalue, pop },
    // ]);
  } catch (err) {
    console.warn(err);
  }
}

export function* orderPaySuccessWatch() {
  yield takeEvery(ORDER_PAY.SUCCESS, orderPaySuccessWatchHandle);
}

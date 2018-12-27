import { takeEvery, apply, put } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  orderCancelFetchSuccess,
  orderCancelFetchFailure,
} from '@/common/actions/orderCancel';
import { addError } from '@/common/actions/error';
import buyoo from '@/services/api';
import { ORDER_CANCEL } from '@/common/constants/actionTypes';
import { encryptMD5, signTypeMD5, o } from '@/utils/AuthEncrypt';

import { localStorageGetItem, dispatchEvent } from '@/utils';
import { BUYOO } from '../constants';

export function* orderCancelFetchWatchHandle(action) {
  try {
    const { tradeno, orderno, status, screen } = action.payload;
    const funid = o(localStorageGetItem, BUYOO).result;

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
}

export function* orderCancelFetchWatch() {
  yield takeEvery(ORDER_CANCEL.REQUEST, orderCancelFetchWatchHandle);
}

export function* orderCancelSuccessWatchHandle(action) {
  const { screen } = action.payload;
  try {
    yield dispatchEvent(screen, {
      method: 'orderCancel',
      params: {},
    });
  } catch (err) {
    console.warn(err);
  }
}

export function* orderCancelSuccessWatch() {
  yield takeEvery(ORDER_CANCEL.SUCCESS, orderCancelSuccessWatchHandle);
}

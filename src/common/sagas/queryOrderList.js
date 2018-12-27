import { takeEvery, apply, put } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  queryOrderListFetchSuccess,
  queryOrderListFetchFailure,
} from '@/common/actions/queryOrderList';
import { addError } from '@/common/actions/error';
import buyoo from '@/services/api';
import { QUERY_ORDER_LIST } from '@/common/constants/actionTypes';
import { encryptMD5, signTypeMD5, o } from '@/utils/AuthEncrypt';

import { localStorageGetItem } from '@/utils';
import { BUYOO } from '../constants';

export function* queryOrderListFetchWatchHandle(action) {
  try {
    const { page = 1, index = 0, status, rows = 100 } = action.payload;
    const authUser = o(localStorageGetItem, BUYOO);

    const funid = authUser ? o(localStorageGetItem, BUYOO).result : '';

    const Key = 'tradeKey';
    const appId = '3';
    const method = 'fun.trade.queryList';
    const charset = 'utf-8';
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.1';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'page',
          value: page,
        },
        {
          key: 'rows',
          value: rows,
        },
        {
          key: 'status',
          value: status,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.queryOrderList, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        page,
        rows,
        status,
      },
    ]);

    if (response.code !== 10000) {
      yield put(queryOrderListFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        queryOrderListFetchSuccess({
          page,
          index,
          count: response.count,
          result: response.details.map(val => ({
            ...val,
            goodList: val.goodList.map(val1 => ({
              ...val1,
              imageUrl: val1.iconUrl,
              price: val1.totalAmount,
              propertiesIds: '',
            })),
          })),
          // tradeNo: response.result.tradeNo,
          // orderNo: response.result.orderNo,
        }),
      );
    }
  } catch (err) {
    yield put(queryOrderListFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* queryOrderListFetchWatch() {
  yield takeEvery(QUERY_ORDER_LIST.REQUEST, queryOrderListFetchWatchHandle);
}

import { takeEvery, apply, put } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  queryOrderFetchSuccess,
  queryOrderFetchFailure,
} from '@src/common/actions/queryOrder';
import { addError } from '@src/common/actions/error';
import buyoo from '@src/services/api';
import { QUERY_ORDER } from '@src/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@src/utils/AuthEncrypt';

export function* queryOrderFetchWatchHandle(action) {
  try {
    const { orderNo, tradeNo } = action.payload;

    const Key = 'tradeKey';
    const appId = '3';
    const method = 'fun.trade.query';
    const charset = 'utf-8';
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, false);

    const encrypt = encryptMD5(
      [
        {
          key: 'orderNo',
          value: orderNo,
        },
        {
          key: 'tradeNo',
          value: tradeNo,
        },
      ],
      Key,
    );

    let response = yield apply(buyoo, buyoo.queryOrder, [
      {
        // appId: 'VNOYX9GI72QE',
        // method: 'fun.trade.query',
        // charset: 'utf-8',
        // signType: 'b898f6ea1375b8f0871ef0c4a719b739',
        // encrypt: '722ea6ebd6a65b41dc8610d5b2180527',
        // timestamp: '2018-06-06 17:38:56',
        // version: '2.0',
        // orderNo: '220180606173139579374083127',
        // tradeNo: '210320180606173139579121',
        appId,
        method,
        charset,
        signType,
        encrypt,
        timestamp,
        version,
        orderNo,
        tradeNo,
      },
    ]);

    response = {
      ...response,
      goodsDetail: response.goodsDetail.map(val => {
        val.price = val.totalAmount;
        val.orgPrice = val.totalOrgAmount;
        val.imageUrl = val.iconUrl;
        return val;
      }),
    };

    if (response.code !== 10000) {
      yield put(queryOrderFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(queryOrderFetchSuccess(response));
    }
  } catch (err) {
    yield put(queryOrderFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* queryOrderFetchWatch() {
  yield takeEvery(QUERY_ORDER.REQUEST, queryOrderFetchWatchHandle);
}

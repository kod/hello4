import { takeEvery, apply, put } from 'redux-saga/effects';
import dayjs from 'dayjs';
import { SCREENS, BUYOO, LOCALSTORAGE_INVITE } from '@/common/constants';
import {
  orderCreateFetchSuccess,
  orderCreateFetchFailure,
} from '@/common/actions/orderCreate';
import { orderPayFetch } from '@/common/actions/orderPay';
import { addError } from '@/common/actions/error';
import buyoo from '@/services/api';
import { ORDER_CREATE } from '@/common/constants/actionTypes';
import { encryptMD5, signTypeMD5, o } from '@/utils/AuthEncrypt';

import { localStorageGetItem, localStorageRemoveItem } from '@/utils';

export function* orderCreateFetchWatchHandle(action) {
  try {
    const {
      screen,
      BYpayway = '1',
      currency = 'VN',
      ordertype = '1',
      addrid = '',
      goodsdetail = '',
      mergedetail = '',
      coupondetail = '',
      subject = '',
      remark = '',
      payvalue = 0,
      invitefunid = '',
    } = action.payload;
    const funid = o(localStorageGetItem, BUYOO).result;

    const Key = 'tradeKey';
    const appId = '3';
    const method = 'fun.trade.order.create';
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
          key: 'ordertype',
          value: ordertype,
        },
        {
          key: 'addrid',
          value: addrid,
        },
        {
          key: 'currency',
          value: currency,
        },
        {
          key: 'subject',
          value: subject,
        },
        {
          key: 'remark',
          value: remark,
        },
        {
          key: 'goodsdetail',
          value: goodsdetail,
        },
        {
          key: 'mergedetail',
          value: mergedetail,
        },
        {
          key: 'coupondetail',
          value: coupondetail,
        },
        {
          key: 'invitefunid',
          value: invitefunid,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.orderCreate, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        currency,
        ordertype,
        addrid,
        goodsdetail,
        mergedetail,
        coupondetail,
        subject,
        remark,
        invitefunid,
      },
    ]);
    if (response.code !== 10000) {
      yield put(orderCreateFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        orderCreateFetchSuccess({
          screen,
          BYpayway,
          tradeNo: response.result.tradeNo,
          orderNo: response.result.orderNo,
          payvalue,
        }),
      );
    }
  } catch (err) {
    yield put(orderCreateFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* orderCreateFetchWatch() {
  yield takeEvery(ORDER_CREATE.REQUEST, orderCreateFetchWatchHandle);
}

export function* orderCreateSuccessWatchHandle(action) {
  try {
    const { tradeNo, orderNo, payvalue, screen, BYpayway } = action.payload;
    // 订单创建成功，删除本地邀请ID
    localStorageRemoveItem(LOCALSTORAGE_INVITE);
    switch (screen) {
      case SCREENS.OrderWrite:
        dispatchEvent(screen, {
          method: 'orderCreate',
          params: {
            tradeNo,
            orderNo,
          },
        });
        break;

      case SCREENS.Bill:
        yield put(
          orderPayFetch({
            orderno: orderNo,
            tradeno: tradeNo,
            // payway: INTERNET_BANK_PAYWAY, // 账单还款全部使用网银
            payway: BYpayway,
            payvalue,
            // paypassword: '123456',
            screen,
          }),
        );
        break;

      case 'Prepaid':
        yield put(
          orderPayFetch({
            orderno: orderNo,
            tradeno: tradeNo,
            // payway: INTERNET_BANK_PAYWAY, // 充值目前只支持网银
            payway: BYpayway,
            payvalue,
            // paypassword: '123456',
            screen,
          }),
        );
        break;

      default:
        break;
    }
  } catch (err) {
    console.log(err);
  }
}

export function* orderCreateSuccessWatch() {
  yield takeEvery(ORDER_CREATE.SUCCESS, orderCreateSuccessWatchHandle);
}
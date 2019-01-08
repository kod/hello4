import { i18n } from '@src/API';
import { Modal } from 'antd-mobile';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  receiveVoucherFetchSuccess,
  receiveVoucherFetchFailure,
} from '@src/common/actions/receiveVoucher';
import { getVoucherFetch } from '@src/common/actions/getVoucher';
import { addError } from '@src/common/actions/error';
import buyoo from '@src/services/api';
import { RECEIVE_VOUCHER } from '@src/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@src/utils/AuthEncrypt';

import { dispatchEventBuyoo } from '@src/utils';
import { getAuthUser } from '@src/common/selectors';

export function* receiveVoucherFetchWatchHandle(action) {
  try {
    const { voucherid, screen = '' } = action.payload;
    const authUser = yield select(getAuthUser);
    const funid = authUser ? authUser.result : '';

    const Key = 'userKey';
    const appId = '3';
    const method = 'fun.usercenter.receiveVoucher';
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
          key: 'voucherid',
          value: voucherid,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.receiveVoucher, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        voucherid,
      },
    ]);

    if (response.code !== 10000) {
      yield put(receiveVoucherFetchFailure());
      switch (response.code) {
        case 40003:
          yield put(addError(i18n.youHaveReceived));
          break;

        default:
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
          break;
      }
    } else {
      yield put(receiveVoucherFetchSuccess(screen));
    }
  } catch (err) {
    yield put(receiveVoucherFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}
export function* receiveVoucherFetchWatch() {
  yield takeEvery(RECEIVE_VOUCHER.REQUEST, receiveVoucherFetchWatchHandle);
}

export function* receiveVoucherSuccessWatchHandle(action) {
  const { screen } = action.payload;
  try {
    if (screen) {
      dispatchEventBuyoo(screen, {
        method: 'receiveVoucher',
        params: {},
      });
    } else {
      yield put(getVoucherFetch());
      Modal.alert('', i18n.success, [
        {
          text: i18n.confirm,
          style: 'default',
          onPress: () => {},
        },
      ]);
    }
  } catch (err) {
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* receiveVoucherSuccessWatch() {
  yield takeEvery(RECEIVE_VOUCHER.SUCCESS, receiveVoucherSuccessWatchHandle);
}

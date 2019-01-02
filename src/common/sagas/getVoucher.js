import { takeEvery, apply, put, select } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  getVoucherFetchSuccess,
  getVoucherFetchFailure,
} from '@src/common/actions/getVoucher';
import { addError } from '@src/common/actions/error';
import buyoo from '@src/services/api';
import { GET_VOUCHER } from '@src/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@src/utils/AuthEncrypt';

import { getAuthUser } from '@src/common/selectors';

export function* getVoucherFetchWatchHandle(action) {
  try {
    const authUser = yield select(getAuthUser);
    const funid = authUser ? authUser.result : '';

    const {
      vouchertype = '',
      typeid = '',
      brandid = '',
      productid = '',
      currentpage = '1',
      pagesize = '100',
    } = action.payload;

    const Key = 'marketKey';
    const appId = '3';
    const method = 'fun.market.getVoucher';
    const charset = 'utf-8';
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'vouchertype',
          value: vouchertype,
        },
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'typeid',
          value: typeid,
        },
        {
          key: 'brandid',
          value: brandid,
        },
        {
          key: 'productid',
          value: productid,
        },
        {
          key: 'currentpage',
          value: currentpage,
        },
        {
          key: 'pagesize',
          value: pagesize,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.getVoucher, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        vouchertype,
        funid,
        typeid,
        brandid,
        productid,
        currentpage,
        pagesize,
      },
    ]);

    if (response.code !== 10000) {
      yield put(getVoucherFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(getVoucherFetchSuccess(response.details));
    }
  } catch (err) {
    yield put(getVoucherFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getVoucherFetchWatch() {
  yield takeEvery(GET_VOUCHER.REQUEST, getVoucherFetchWatchHandle);
}

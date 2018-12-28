import { takeEvery, apply, put, select } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  // getVoucherListFetch,
  getVoucherListFetchSuccess,
  getVoucherListFetchFailure,
} from '@/common/actions/getVoucherList';
import { addError } from '@/common/actions/error';
import buyoo from '@/services/api';
import {
  GET_VOUCHER_LIST,
  // GET_VOUCHER_LIST,
} from '@/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';

import { getAuthUser } from '@/common/selectors';

export function* getVoucherListFetchWatchHandle(action) {
  try {
    const authUser = yield select(getAuthUser);
    const funid = authUser ? authUser.result : null;
    const {
      vouchertype = '',
      typeid = '',
      brandid = '',
      productid = '',
      cardno = '',
      status = '1',
      currentpage = '1',
      pagesize = '100',
    } = action.payload;

    const Key = 'userKey';
    const appId = '3';
    const method = 'fun.usercenter.getVoucher';
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
          key: 'vouchertype',
          value: vouchertype,
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
          key: 'cardno',
          value: cardno,
        },
        {
          key: 'status',
          value: status,
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

    const response = yield apply(buyoo, buyoo.getVoucherList, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        vouchertype,
        typeid,
        brandid,
        productid,
        cardno,
        status,
        currentpage,
        pagesize,
      },
    ]);

    if (response.code !== 10000) {
      yield put(getVoucherListFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        getVoucherListFetchSuccess({
          items: response.details,
          status,
        }),
      );
    }
  } catch (err) {
    yield put(getVoucherListFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getVoucherListFetchWatch() {
  yield takeEvery(GET_VOUCHER_LIST.REQUEST, getVoucherListFetchWatchHandle);
}

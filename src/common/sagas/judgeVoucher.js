import { takeEvery, apply, put, select } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  judgeVoucherFetchSuccess,
  judgeVoucherFetchFailure,
} from '@/common/actions/judgeVoucher';
import { getVoucherFetch } from '@/common/actions/getVoucher';
import { addError } from '@/common/actions/error';
import buyoo from '@/services/api';
import { JUDGE_VOUCHER } from '@/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';

import { getAuthUser } from '../selectors';

export function* judgeVoucherFetchWatchHandle(action) {
  try {
    const authUser = yield select(getAuthUser);
    const funid = authUser ? authUser.result : null;
    const { products = '', currentpage = 1, pagesize = 100 } = action.payload;

    const Key = 'userKey';
    const appId = '3';
    const method = 'fun.usercenter.judgeVoucher';
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
          key: 'products',
          value: products,
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

    const response = yield apply(buyoo, buyoo.judgeVoucher, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        products,
        currentpage,
        pagesize,
      },
    ]);

    if (response.code !== 10000) {
      yield put(judgeVoucherFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        judgeVoucherFetchSuccess({
          items: response.details,
        }),
      );
    }
  } catch (err) {
    yield put(judgeVoucherFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* judgeVoucherFetchWatch() {
  yield takeEvery(JUDGE_VOUCHER.REQUEST, judgeVoucherFetchWatchHandle);
}

export function* judgeVoucherSuccessWatchHandle() {
  try {
    yield put(getVoucherFetch());
  } catch (err) {
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* judgeVoucherSuccessWatch() {
  yield takeEvery(JUDGE_VOUCHER.SUCCESS, judgeVoucherSuccessWatchHandle);
}

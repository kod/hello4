import { takeEvery, apply, put } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  enchashmentApplyFetchSuccess,
  enchashmentApplyFetchFailure,
} from '@/common/actions/enchashmentApply';
import { addError } from '@/common/actions/error';
import buyoo from '@/services/api';
import { ENCHASHMENT_APPLY } from '@/common/constants/actionTypes';
import { encryptMD5, signTypeMD5, o } from '@/utils/AuthEncrypt';
import { localStorageGetItem, dispatchEventBuyoo } from '@/utils';
import { BUYOO } from '../constants';

export function* enchashmentApplyFetchWatchHandle(action) {
  const { amount = 0, screen = '' } = action.payload;
  try {
    const authUser = o(localStorageGetItem, BUYOO);

    const funid = authUser ? o(localStorageGetItem, BUYOO).result : '';

    const Key = 'userKey';
    const appId = '3';
    const method = 'fun.user.enchashment.apply';
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
          key: 'amount',
          value: amount,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.enchashmentApply, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        amount,
      },
    ]);

    if (response.code !== 10000) {
      yield put(enchashmentApplyFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(enchashmentApplyFetchSuccess(screen));
    }
  } catch (err) {
    yield put(enchashmentApplyFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* enchashmentApplySuccessWatchHandle(action) {
  const { screen } = action.payload;
  try {
    if (screen) {
      yield dispatchEventBuyoo(screen, {
        method: 'enchashmentApply',
        params: {},
      });
    }
  } catch (error) {
    console.warn(error);
  }
}

export function* enchashmentApplyFetchWatch() {
  yield takeEvery(ENCHASHMENT_APPLY.REQUEST, enchashmentApplyFetchWatchHandle);
}

export function* enchashmentApplySuccessWatch() {
  yield takeEvery(
    ENCHASHMENT_APPLY.SUCCESS,
    enchashmentApplySuccessWatchHandle,
  );
}

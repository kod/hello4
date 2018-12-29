import { takeEvery, apply, put, select } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  enchashmentApplyFetchSuccess,
  enchashmentApplyFetchFailure,
} from '@src/common/actions/enchashmentApply';
import { addError } from '@src/common/actions/error';
import buyoo from '@src/services/api';
import { ENCHASHMENT_APPLY } from '@src/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@src/utils/AuthEncrypt';
import { dispatchEventBuyoo } from '@src/utils';
import { getAuthUser } from '@src/common/selectors';

export function* enchashmentApplyFetchWatchHandle(action) {
  const { amount = 0, screen = '' } = action.payload;
  try {
    const authUser = yield select(getAuthUser);
    const funid = authUser ? authUser.result : '';

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

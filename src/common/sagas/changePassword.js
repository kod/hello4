import { formatMessage } from 'umi/locale';
import { takeEvery, apply, put } from 'redux-saga/effects';

import {
  changePasswordFetchSuccess,
  changePasswordFetchFailure,
} from '@/common/actions/changePassword';
import { addError } from '@/common/actions/error';
import buyoo from '@/services/api';

import { CHANGE_PASSWORD } from '@/common/constants/actionTypes';
import { encryptMD5 } from '@/utils/AuthEncrypt';
import { dispatchEventBuyoo } from '@/utils';

export function* changePasswordFetchWatchHandle(action) {
  const { msisdn, password, otp, screen } = action.payload;
  try {
    const Key = 'userKey';
    const provider = '3';

    const encrypt = encryptMD5(
      [
        {
          key: 'provider',
          value: provider,
        },
        {
          key: 'msisdn',
          value: msisdn,
        },
        {
          key: 'password',
          value: password,
        },
        {
          key: 'otp',
          value: otp,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.changePassword, [
      {
        provider,
        msisdn,
        password,
        otp,
        encryption: encrypt,
      },
    ]);

    if (response.status !== 10000) {
      yield put(changePasswordFetchFailure());
      switch (response.status) {
        case 70002:
          yield put(
            addError(formatMessage({ id: 'verificationCodeIsIncorrect' })),
          );
          return;

        default:
          yield put(addError('error'));
          break;
      }
    } else {
      yield put(changePasswordFetchSuccess(screen));
    }
  } catch (err) {
    yield put(changePasswordFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* changePasswordSuccessWatchHandle(action) {
  const { screen } = action.payload;
  try {
    yield dispatchEventBuyoo(screen);
  } catch (err) {
    console.warn(err);
  }
}

export function* changePasswordFetchWatch() {
  yield takeEvery(CHANGE_PASSWORD.REQUEST, changePasswordFetchWatchHandle);
}

export function* changePasswordSuccessWatch() {
  yield takeEvery(CHANGE_PASSWORD.SUCCESS, changePasswordSuccessWatchHandle);
}

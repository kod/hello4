import { takeEvery, apply, put } from 'redux-saga/effects';
import { otpFetchSuccess, otpFetchFailure } from '@src/common/actions/otp';
import { addError } from '@src/common/actions/error';
import buyoo from '@src/services/api';
import { OTP } from '@src/common/constants/actionTypes';
import { encryptMD5 } from '@src/utils/AuthEncrypt';

export function* otpFetchWatchHandle(action) {
  try {
    const { mail, type = 1 } = action.payload;

    const Key = 'userKey';
    const provider = '3';

    const encrypt = encryptMD5(
      [
        {
          key: 'provider',
          value: provider,
        },
        {
          key: 'mail',
          value: mail,
        },
        {
          key: 'type',
          value: type,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.otp, [
      {
        provider,
        mail,
        type,
        encryption: encrypt,
      },
    ]);

    if (response.status !== 10000) {
      yield put(otpFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(otpFetchSuccess());
    }
  } catch (err) {
    yield put(otpFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* otpFetchWatch() {
  yield takeEvery(OTP.REQUEST, otpFetchWatchHandle);
}

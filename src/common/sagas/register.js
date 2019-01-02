import { formatMessage } from 'umi/locale';
import { Modal } from 'antd-mobile';
import router from 'umi/router';

import {
  takeEvery,
  apply,
  put,
  // select,
} from 'redux-saga/effects';
import {
  // registerFetch,
  registerFetchSuccess,
  registerFetchFailure,
} from '@src/common/actions/register';
import { addError } from '@src/common/actions/error';
import buyoo from '@src/services/api';
import {
  REGISTER,
  // REGISTER,
} from '@src/common/constants/actionTypes';
import { encryptMD5 } from '@src/utils/AuthEncrypt';

import { loginFetchSuccess } from '@src/common/actions/login';
import { dispatchEventBuyoo } from '@src/utils';

export function* registerFetchWatchHandle(action) {
  try {
    const {
      mail,
      username = '',
      password,
      payPassword = '',
      otp,
      check = '1',
      appid = '',
      inviterno = '',
      isReceive = false,
      screen = '',
    } = action.payload;

    const Key = 'userKey';
    const provider = '3';
    const version = '2.1';

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
          key: 'username',
          value: username,
        },
        {
          key: 'password',
          value: password,
        },
        {
          key: 'payPassword',
          value: payPassword,
        },
        {
          key: 'otp',
          value: otp,
        },
        {
          key: 'check',
          value: check,
        },
        {
          key: 'appid',
          value: appid,
        },
        {
          key: 'inviterno',
          value: inviterno,
        },
        {
          key: 'isReceive',
          value: isReceive,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.register, [
      {
        provider,
        mail,
        username,
        password,
        payPassword,
        otp,
        check,
        appid,
        inviterno,
        encryption: encrypt,
        version,
        isReceive,
      },
    ]);

    if (response.status !== 10000) {
      yield put(registerFetchFailure());
      switch (response.status) {
        case 50008:
          yield put(addError(formatMessage({ id: 'emailAlreadyRegistered' })));
          break;

        default:
          yield put(
            addError(formatMessage({ id: 'verificationCodeIsIncorrect' })),
          );
          break;
      }
    } else {
      yield put(registerFetchSuccess(response, screen));
    }
  } catch (err) {
    yield put(registerFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}
export function* registerFetchWatch() {
  yield takeEvery(REGISTER.REQUEST, registerFetchWatchHandle);
}

export function* registerSuccessWatchHandle(action) {
  try {
    const { response, screen } = action.payload;
    yield put(loginFetchSuccess(response, screen));

    if (screen) {
      dispatchEventBuyoo(screen, {
        method: 'register',
        params: {
          response,
        },
      });
    } else {
      Modal.alert('', formatMessage({ id: 'signUpSuccessfully' }), [
        {
          text: formatMessage({ id: 'confirm' }),
          onPress: () => router.go(-3),
          style: 'default',
        },
      ]);
    }
  } catch (error) {
    yield put(addError(typeof err === 'string' ? error : error.toString()));
  }
}

export function* registerSuccessWatch() {
  yield takeEvery(REGISTER.SUCCESS, registerSuccessWatchHandle);
}

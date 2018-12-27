import { formatMessage } from 'umi/locale';
import md5 from 'blueimp-md5';
import { takeEvery, apply, put } from 'redux-saga/effects';

import {
  // loginFetch,
  loginFetchSuccess,
  loginFetchFailure,
} from '@/common/actions/login';
import { addError } from '@/common/actions/error';
import {
  cartRequest,
  cartClear,
  // cartClear,
} from '@/common/actions/cart';
import {
  userCertificateInfoFetch,
  userCertificateInfoClear,
} from '@/common/actions/userCertificateInfo';
import {
  cardQueryFetch,
  cardQueryClear,
  // cardQueryClear,
} from '@/common/actions/cardQuery';
import { queryOrderListClear } from '@/common/actions/queryOrderList';

import buyoo from '@/services/api';

// import { SCREENS } from '@/common/constants';
import { LOGIN, LOGOUT } from '@/common/constants/actionTypes';
import { encryptMD5 } from '@/utils/AuthEncrypt';
import { dispatchEvent, localStorageSetItem, localStorageClear } from '@/utils';
import { BUYOO } from '../constants';

export function* loginFetchWatchHandle(action) {
  const {
    mail = '',
    password = '',
    otp = '',
    screen = '',
    oauthtype = '',
    oauthid = '',
  } = action.payload;
  try {
    const Key = 'userKey';
    const provider = '3';
    const appid = '0';
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
          key: 'password',
          value: password,
        },
        {
          key: 'otp',
          value: otp,
        },
        {
          key: 'appid',
          value: appid,
        },
        {
          key: 'oauthtype',
          value: oauthtype,
        },
        {
          key: 'oauthid',
          value: oauthid,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.login, [
      {
        provider,
        mail,
        password,
        otp,
        appid,
        oauthtype,
        oauthid,
        version,
        encryption: encrypt,
      },
    ]);

    if (response.status !== 10000) {
      yield put(loginFetchFailure());
      switch (response.status) {
        case 40007:
          yield put(loginFetchSuccess(null, screen));
          break;

        case 60050:
          // yield put(loginFetchSuccess(null, screen));
          yield put(addError(formatMessage({ id: 'userNotExist' })));
          break;

        case 60051:
          yield put(
            addError(formatMessage({ id: 'wrongEmailNumberOrPassword' })),
          );
          break;

        case 70002:
          yield put(
            addError(formatMessage({ id: 'verificationCodeIsIncorrect' })),
          );
          break;

        default:
          yield put(addError(response.result));
          break;
      }
    } else {
      yield put(loginFetchSuccess(response, screen));
    }
  } catch (err) {
    yield put(loginFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* loginSuccessWatchHandle(action) {
  const { user, screen } = action.payload;
  try {
    if (user) {
      yield put(userCertificateInfoFetch());

      yield put(cartRequest());
      yield put(cardQueryFetch());

      const b = 'p';
      const c = new Date();
      const d = JSON.stringify(user);
      localStorageSetItem(md5(`${BUYOO}vi${b}`), d);
      localStorageSetItem(
        md5(`${BUYOO}vXi${b}`),
        md5(`a${d}aa${c.getDay()}`).toString(),
      );
    }
    if (screen) {
      dispatchEvent(screen, {
        method: 'login',
        params: {
          user,
        },
      });
    }
  } catch (err) {
    console.warn(err);
  }
}

export function* logoutSuccessWatchHandle() {
  try {
    localStorageClear();
    yield put(cartClear());
    yield put(cardQueryClear());
    yield put(queryOrderListClear());
    yield put(userCertificateInfoClear());
  } catch (err) {
    console.warn(err);
  }
}

export function* loginFetchWatch() {
  yield takeEvery(LOGIN.REQUEST, loginFetchWatchHandle);
}

export function* loginSuccessWatch() {
  yield takeEvery(LOGIN.SUCCESS, loginSuccessWatchHandle);
}

export function* logoutSuccessWatch() {
  yield takeEvery(LOGOUT.SUCCESS, logoutSuccessWatchHandle);
}
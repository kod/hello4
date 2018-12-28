import { takeEvery, apply, put, select } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  oauthRequestFetchSuccess,
  oauthRequestFetchFailure,
} from '@/common/actions/oauthRequest';
import { addError } from '@/common/actions/error';
import buyoo from '@/services/api';
import { OAUTH_REQUEST } from '@/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { getAuthUser } from '@/common/selectors';

export function* oauthRequestFetchWatchHandle(action) {
  try {
    const {
      oauthtype = '',
      oauthid = '',
      oauthstr = '',
      accesstoken = '',
      nickname = '',
      avatar = '',
      screen = '',
    } = action.payload;

    const authUser = yield select(getAuthUser);
    const funid = authUser ? authUser.result : '';

    const Key = 'userKey';
    const appId = '3';
    const method = 'fun.oauth.request';
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
          key: 'oauthtype',
          value: oauthtype,
        },
        {
          key: 'oauthid',
          value: oauthid,
        },
        {
          key: 'oauthstr',
          value: oauthstr,
        },
        {
          key: 'accesstoken',
          value: accesstoken,
        },
        {
          key: 'nickname',
          value: nickname,
        },
        {
          key: 'avatar',
          value: avatar,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.oauthRequest, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        oauthtype,
        oauthid,
        oauthstr,
        accesstoken,
        nickname,
        avatar,
      },
    ]);

    if (response.code !== 10000) {
      yield put(oauthRequestFetchFailure());
      yield put(addError(response.msg));
    } else {
      yield put(oauthRequestFetchSuccess(response, screen));
    }
  } catch (err) {
    yield put(oauthRequestFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* oauthRequestFetchWatch() {
  yield takeEvery(OAUTH_REQUEST.REQUEST, oauthRequestFetchWatchHandle);
}

import { takeEvery, apply, put, select } from 'redux-saga/effects';
import {
  getUserInfoByIdFetchSuccess,
  getUserInfoByIdFetchFailure,
} from '@/common/actions/getUserInfoById';
import { addError } from '@/common/actions/error';
import buyoo from '@/services/api';
import { GET_USERINFO_BYID } from '@/common/constants/actionTypes';
import { encryptMD5 } from '@/utils/AuthEncrypt';

import { getAuthUser } from '@/common/selectors';

export function* getUserInfoByIdFetchWatchHandle() {
  try {
    const authUser = yield select(getAuthUser);
    const funid = authUser ? authUser.result : '';

    const Key = 'userKey';
    const provider = '3';

    const encrypt = encryptMD5(
      [
        {
          key: 'provider',
          value: provider,
        },
        {
          key: 'id',
          value: funid,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.getUserInfoById, [
      {
        provider,
        id: funid,
        encryption: encrypt,
      },
    ]);

    if (response.status !== 10000) {
      yield put(getUserInfoByIdFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(getUserInfoByIdFetchSuccess(response.details));
    }
  } catch (err) {
    yield put(getUserInfoByIdFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}
export function* getUserInfoByIdFetchWatch() {
  yield takeEvery(GET_USERINFO_BYID.REQUEST, getUserInfoByIdFetchWatchHandle);
}

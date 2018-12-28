import { takeEvery, apply, put, select } from 'redux-saga/effects';
import dayjs from 'dayjs';
import { addressFetch } from '@/common/actions/address';
import {
  addressAddSuccess,
  addressAddFailure,
} from '@/common/actions/userAddAddr';
import { addError } from '@/common/actions/error';
import buyoo from '@/services/api';
import { ADDRESS_ADD } from '@/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { dispatchEventBuyoo } from '@/utils';
import { getAuthUser } from '../selectors';

export function* userAddAddrFetchWatchHandle(action) {
  try {
    const authUser = yield select(getAuthUser);
    const funid = authUser ? authUser.result : null;

    const {
      msisdn,
      address,
      isdefault,
      username,
      division1st = 1,
      division2nd = 0,
      division3rd = 0,
      division4th = 0,
      division5th = 0,
      division6th = 0,
      screen,
    } = action.payload;

    const Key = 'userKey';
    const appId = '3';
    const method = 'fun.uc.useraddaddr';
    const charset = 'utf-8';
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, false);

    const encrypt = encryptMD5(
      [
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'msisdn',
          value: msisdn,
        },
        {
          key: 'address',
          value: address,
        },
        {
          key: 'isdefault',
          value: isdefault,
        },
        {
          key: 'username',
          value: username,
        },
        {
          key: 'division1st',
          value: division1st,
        },
        {
          key: 'division2nd',
          value: division2nd,
        },
        {
          key: 'division3rd',
          value: division3rd,
        },
        {
          key: 'division4th',
          value: division4th,
        },
        {
          key: 'division5th',
          value: division5th,
        },
        {
          key: 'division6th',
          value: division6th,
        },
      ],
      Key,
    );
    const response = yield apply(buyoo, buyoo.useraddaddr, [
      {
        appId,
        method,
        charset,
        signType,
        encrypt,
        timestamp,
        version,
        funid,
        msisdn,
        address,
        isdefault,
        username,
        division1st,
        division2nd,
        division3rd,
        division4th,
        division5th,
        division6th,
      },
    ]);

    if (response.code !== 10000) {
      yield put(addressAddFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(addressAddSuccess(screen));
    }
  } catch (err) {
    yield put(addressAddFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* userAddAddrFetchWatch() {
  yield takeEvery(ADDRESS_ADD.REQUEST, userAddAddrFetchWatchHandle);
}

export function* userAddAddrSuccessWatchHandle(action) {
  const { screen } = action.payload;
  try {
    yield put(addressFetch());
    dispatchEventBuyoo(screen);
  } catch (err) {
    console.log(err);
  }
}

export function* userAddAddrSuccessWatch() {
  yield takeEvery(ADDRESS_ADD.SUCCESS, userAddAddrSuccessWatchHandle);
}

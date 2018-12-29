import { takeEvery, apply, put, select } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  getInviteRecordFetchSuccess,
  getInviteRecordFetchFailure,
} from '@src/common/actions/getInviteRecord';
import { addError } from '@src/common/actions/error';
import buyoo from '@src/services/api';
import { GET_INVITE_RECORD } from '@src/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@src/utils/AuthEncrypt';
import { getAuthUser } from '@src/common/selectors';

export function* getInviteRecordFetchWatchHandle(action) {
  const { pagesize = 100, currentpage = 1 } = action.payload;
  try {
    const authUser = yield select(getAuthUser);
    const funid = authUser ? authUser.result : '';

    const Key = 'tradeKey';
    const appId = '3';
    const method = 'fun.trade.getInviteRecord';
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
          key: 'pagesize',
          value: pagesize,
        },
        {
          key: 'currentpage',
          value: currentpage,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.getInviteRecord, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        pagesize,
        currentpage,
      },
    ]);

    if (response.code !== 10000) {
      yield put(getInviteRecordFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(getInviteRecordFetchSuccess(response.result));
    }
  } catch (err) {
    yield put(getInviteRecordFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getInviteRecordFetchWatch() {
  yield takeEvery(GET_INVITE_RECORD.REQUEST, getInviteRecordFetchWatchHandle);
}

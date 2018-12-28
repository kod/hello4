import { takeEvery, apply, put, select } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  // cardQueryFetch,
  cardQueryFetchSuccess,
  cardQueryFetchFailure,
} from '@/common/actions/cardQuery';
import { addError } from '@/common/actions/error';
import buyoo from '@/services/api';
import {
  CARD_QUERY,
  // CARD_QUERY,
} from '@/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';

import { getAuthUser } from '../selectors';

export function* cardQueryFetchWatchHandle(/* action */) {
  try {
    const authUser = yield select(getAuthUser);
    const funid = authUser ? authUser.result : null;

    const Key = 'userKey';
    const appId = '3';
    const method = 'fun.user.card.query';
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
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.cardQuery, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
      },
    ]);

    if (response.code !== 10000) {
      yield put(cardQueryFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      // yield put(cardQueryFetchSuccess(response.result));
      yield put(
        cardQueryFetchSuccess({
          ...response.result,
          // username: 'Nguyễn Thị Ban',
          // availableBalance: 7000000,
          // status: 0,
          // availableBalance: 8000000,
          // availableBalance: 7990000,
          // availableBalance: 7989999,
          // availableBalance: 3995001,
          // availableBalance: 3995000,
          // availableBalance: 3994999,
        }),
      );
    }
  } catch (err) {
    yield put(cardQueryFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}
export function* cardQueryFetchWatch() {
  yield takeEvery(CARD_QUERY.REQUEST, cardQueryFetchWatchHandle);
}

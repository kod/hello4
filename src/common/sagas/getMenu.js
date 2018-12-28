import { takeEvery, apply, put, select } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  getMenuFetchSuccess,
  getMenuFetchFailure,
} from '@/common/actions/getMenu';
import { addError } from '@/common/actions/error';
import buyoo from '@/services/api';
import { GET_MENU } from '@/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';

import { getAuthUser } from '../selectors';

export function* getMenuFetchWatchHandle(action) {
  try {
    const authUser = yield select(getAuthUser);
    const funid = authUser ? authUser.result : null;
    const { typeid = 0, subclassfyid = 0, thirdclassfyid = 0 } = action.payload;

    const Key = 'commodityKey';
    const appId = '3';
    const method = 'fun.commodity.menu';
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
          key: 'typeid',
          value: typeid,
        },
        {
          key: 'subclassfyid',
          value: subclassfyid,
        },
        {
          key: 'thirdclassfyid',
          value: thirdclassfyid,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.getMenu, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        typeid,
        subclassfyid,
        thirdclassfyid,
      },
    ]);

    if (response.code !== 10000) {
      yield put(getMenuFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        getMenuFetchSuccess({
          items: response.result,
          itemsList: response.result.map(val => val.list),
          itemsClassfy: response.result.map(val => val.classfy),
        }),
      );
    }
  } catch (err) {
    yield put(getMenuFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getMenuFetchWatch() {
  yield takeEvery(GET_MENU.REQUEST, getMenuFetchWatchHandle);
}

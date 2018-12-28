import { takeEvery, apply, put, select } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  initAdverstCommonFetchSuccess,
  initAdverstCommonFetchFailure,
} from '@/common/actions/initAdverstCommon';
import { addError } from '@/common/actions/error';
import buyoo from '@/services/api';
import { INIT_ADVERST_COMMON } from '@/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { getAuthUser } from '@/common/selectors';

export function* initAdverstCommonFetchWatchHandle(action) {
  const { pagesize, currentpage } = action.payload;
  const authUser = yield select(getAuthUser);
  const funid = authUser ? authUser.result : '';

  try {
    const Key = 'commodityKey';
    const appId = '3';
    const method = 'fun.commodity.initAdverstCommon';
    const charset = 'utf-8';
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'pagesize',
          value: pagesize,
        },
        {
          key: 'currentpage',
          value: currentpage,
        },
        {
          key: 'funid',
          value: funid,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.initAdverstCommon, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        pagesize,
        currentpage,
        funid,
      },
    ]);

    const { result, msg, code } = response;

    if (code !== 10000) {
      yield put(initAdverstCommonFetchFailure());
      yield put(addError(`msg: ${msg}; code: ${code}`));
    } else {
      yield put(
        initAdverstCommonFetchSuccess(
          result.data,
          result.totalpage,
          result.currentpage,
        ),
      );
    }
  } catch (err) {
    console.log(err);
    yield put(initAdverstCommonFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* initAdverstCommonFetchWatch() {
  yield takeEvery(
    INIT_ADVERST_COMMON.REQUEST,
    initAdverstCommonFetchWatchHandle,
  );
}

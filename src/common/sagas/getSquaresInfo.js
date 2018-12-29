import { takeEvery, apply, put } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  getSquaresInfoFetchSuccess,
  getSquaresInfoFetchFailure,
} from '@src/common/actions/getSquaresInfo';
import { addError } from '@src/common/actions/error';
import buyoo from '@src/services/api';
import { GET_SQUARES_INFO } from '@src/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@src/utils/AuthEncrypt';

export function* getSquaresInfoFetchWatchHandle(action) {
  try {
    const { pagesize = 10, currentpage = 1 } = action.payload;

    const funid = '';

    const Key = 'commodityKey';
    const appId = '3';
    const method = 'fun.index.squares';
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

    const response = yield apply(buyoo, buyoo.getSquaresInfo, [
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
      yield put(getSquaresInfoFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        getSquaresInfoFetchSuccess({
          squareinfo: response.result.squareinfo,
          totalsize: response.result.totalsize,
          totalpage: response.result.totalpage,
          pagesize: response.result.pagesize,
          currentpage: response.result.currentpage,
        }),
      );
    }
  } catch (err) {
    yield put(getSquaresInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getSquaresInfoFetchWatch() {
  yield takeEvery(GET_SQUARES_INFO.REQUEST, getSquaresInfoFetchWatchHandle);
}

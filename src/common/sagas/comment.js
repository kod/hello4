import { takeEvery, apply, put } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  commentFetchSuccess,
  commentFetchFailure,
} from '@src/common/actions/comment';
import { addError } from '@src/common/actions/error';
import buyoo from '@src/services/api';
import { COMMENT } from '@src/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@src/utils/AuthEncrypt';

export function* commentFetchWatchHandle(action) {
  try {
    const { brand_id: brandId } = action.payload;

    const msisdn = '';
    const pagesize = '4';
    const currentpage = '1';

    const Key = 'commodityKey';
    const appId = '3';
    const method = 'fun.evaluation.query';
    const charset = 'utf-8';
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';

    const signType = signTypeMD5(appId, method, charset, Key, false);

    const encrypt = encryptMD5(
      [
        {
          key: 'brand_id',
          value: brandId,
        },
        {
          key: 'msisdn',
          value: msisdn,
        },
        {
          key: 'pagesize',
          value: pagesize,
        },
        {
          key: 'currentPage',
          value: currentpage,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.getEvaluationInfo, [
      {
        appId,
        method,
        charset,
        signType,
        encrypt,
        timestamp,
        version,
        brand_id: brandId,
        msisdn,
        pagesize,
        currentPage: currentpage,
      },
    ]);

    if (response.code !== 10000) {
      yield put(commentFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      const responseEdited = {
        ...response,
        detail: response.detail.map(val => {
          val.imageUrls = val.imageUrls === '' ? [] : val.imageUrls.split('|');
          val.updateTime = val.updateTime.slice(0, 10);
          return val;
        }),
      };
      yield put(commentFetchSuccess(responseEdited));
    }
  } catch (err) {
    yield put(commentFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* commentFetchWatch() {
  yield takeEvery(COMMENT.REQUEST, commentFetchWatchHandle);
}

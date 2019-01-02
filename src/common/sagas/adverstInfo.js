import { takeEvery, apply, put } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  adverstInfoFetchSuccess,
  adverstInfoFetchFailure,
} from '@src/common/actions/adverstInfo';
import { addError } from '@src/common/actions/error';
import buyoo from '@src/services/api';
import { ADVERST_INFO } from '@src/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@src/utils/AuthEncrypt';

export function* adverstInfoFetchWatchHandle(action) {
  try {
    const { params = {} } = action.payload;
    const Key = 'commodityKey';
    const appId = '3';
    const method = 'fun.adverst.query';
    const charset = 'utf-8';
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';

    const typeId = params.type_id || '1';
    const classfyId = params.classfy_id || '0';
    const position = params.position || '3';
    const pagesize = params.pagesize || '9';
    const currentPage = params.currentPage || '1';

    const signType = signTypeMD5(appId, method, charset, Key, false);

    const encrypt = encryptMD5(
      [
        {
          key: 'type_id',
          value: typeId,
        },
        {
          key: 'classfy_id',
          value: classfyId,
        },
        {
          key: 'position',
          value: position,
        },
        {
          key: 'pagesize',
          value: pagesize,
        },
        {
          key: 'currentPage',
          value: currentPage,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.getAdverstInfo, [
      {
        appId,
        method,
        charset,
        signType,
        encrypt,
        timestamp,
        version,
        type_id: typeId,
        classfy_id: classfyId,
        position,
        pagesize,
        currentPage,
      },
    ]);

    const result = [];

    if (response.code === 10000) {
      const array = response.details;
      for (let index = 0; index < array.length; index += 1) {
        const element = array[index];
        element.price = element.minprice;
        element.orgPrice = element.maxprice;
        result.push(element);
      }
      yield put(adverstInfoFetchSuccess(result));
    } else {
      yield put(adverstInfoFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    }
  } catch (err) {
    yield put(adverstInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* adverstInfoFetchWatch() {
  yield takeEvery(ADVERST_INFO.REQUEST, adverstInfoFetchWatchHandle);
}

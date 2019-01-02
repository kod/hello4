/* eslint-disable camelcase */
import { normalize } from 'normalizr';
import { takeEvery, apply, put } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  getAllProductInfoFetchSuccess,
  getAllProductInfoFetchFailure,
} from '@src/common/actions/getAllProductInfo';
import { addError } from '@src/common/actions/error';
import buyoo from '@src/services/api';
import { GET_ALL_PRODUCT_INFO } from '@src/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@src/utils/AuthEncrypt';
import Schemas from '@src/common/constants/schemas';

export function* getAllProductInfoFetchWatchHandle(action) {
  try {
    const {
      parent_id,
      classfy_id,
      sub_classfy_id,
      third_classfy_id,
      pagesize,
      currentPage,
    } = action.payload;
    const Key = 'commodityKey';
    const appId = '3';
    const method = 'fun.product.query';
    const charset = 'utf-8';
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';

    const signType = signTypeMD5(appId, method, charset, Key, false);

    const encrypt = encryptMD5(
      [
        {
          key: 'parent_id',
          value: parent_id,
        },
        {
          key: 'classfy_id',
          value: classfy_id,
        },
        {
          key: 'sub_classfy_id',
          value: sub_classfy_id,
        },
        {
          key: 'third_classfy_id',
          value: third_classfy_id,
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

    const response = yield apply(buyoo, buyoo.getAllProductInfo, [
      {
        appId,
        method,
        charset,
        signType,
        encrypt,
        timestamp,
        version,
        parent_id,
        classfy_id,
        sub_classfy_id,
        third_classfy_id,
        pagesize,
        currentPage,
      },
    ]);

    if (response.code !== 10000) {
      yield put(getAllProductInfoFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      const normalized = normalize(
        response.details.map(val => {
          val.imageUrl = val.iconUrl;
          return val;
        }),
        Schemas.GETALLPRODUCTINFO_ARRAY,
      );
      yield put(
        getAllProductInfoFetchSuccess(
          normalized.entities,
          normalized.result,
          // response.details.map(val => {
          //   val.imageUrl = val.iconUrl;
          //   return val;
          // }),
          parseInt(response.currentPage, 10),
          response.totalPage,
        ),
      );
    }
  } catch (err) {
    yield put(getAllProductInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getAllProductInfoFetchWatch() {
  yield takeEvery(
    GET_ALL_PRODUCT_INFO.REQUEST,
    getAllProductInfoFetchWatchHandle,
  );
}

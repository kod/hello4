import { takeEvery, apply, put, select } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  findProductsFetchSuccess,
  findProductsFetchFailure,
} from '@src/common/actions/findProducts';
import { addError } from '@src/common/actions/error';
import buyoo from '@src/services/api';
import { FIND_PRODUCTS } from '@src/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@src/utils/AuthEncrypt';
import { getAuthUser } from '@src/common/selectors';

export function* findProductsFetchWatchHandle(action) {
  try {
    const authUser = yield select(getAuthUser);
    const funid = authUser ? authUser.result : '';
    const { findcontent, pagesize = 50, currentpage = 1 } = action.payload;

    const Key = 'commodityKey';
    const appId = '3';
    const method = 'fun.find.finding';
    const charset = 'utf-8';
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'findcontent',
          value: findcontent,
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

    const response = yield apply(buyoo, buyoo.findProducts, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        findcontent,
        pagesize,
        currentpage,
      },
    ]);

    if (response.code !== 10000) {
      yield put(findProductsFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        findProductsFetchSuccess(
          response.details.map(val => {
            val.imageUrl = val.iconUrl;
            return val;
          }),
        ),
      );
    }
  } catch (err) {
    yield put(findProductsFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* findProductsFetchWatch() {
  yield takeEvery(FIND_PRODUCTS.REQUEST, findProductsFetchWatchHandle);
}

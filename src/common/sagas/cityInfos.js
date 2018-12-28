import { takeEvery, apply, put } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  // cityInfosFetch,
  cityInfosFetchSuccess,
  cityInfosFetchFailure,
} from '@/common/actions/cityInfos';
import { addError } from '@/common/actions/error';
import buyoo from '@/services/api';
import { CITY_INFOS } from '@/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';

export function* cityInfosFetchWatchHandle(action) {
  try {
    const { pid, level } = action.payload;

    const Key = 'userKey';
    const appId = '3';
    const method = 'fun.uc.getCityInfos';
    const charset = 'utf-8';
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'pid',
          value: pid,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.getCityInfos, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        pid,
      },
    ]);

    if (response.code !== 10000) {
      yield put(cityInfosFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(cityInfosFetchSuccess(response.details, level));
    }
  } catch (err) {
    yield put(cityInfosFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}
export function* cityInfosFetchWatch() {
  yield takeEvery(CITY_INFOS.REQUEST, cityInfosFetchWatchHandle);
}

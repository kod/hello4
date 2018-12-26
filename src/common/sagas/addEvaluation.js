/* eslint-disable camelcase, import/prefer-default-export */
import { takeEvery, apply, put } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  addEvaluationFetchSuccess,
  addEvaluationFetchFailure,
} from '@/common/actions/addEvaluation';
import { addError } from '@/common/actions/error';
import buyoo from '@/services/api';
import { ADD_EVALUATION } from '@/common/constants/actionTypes';
import { encryptMD5, signTypeMD5, o } from '@/utils/AuthEncrypt';

import { dispatchEvent, localStorageGetItem } from '@/utils';
import { BUYOO } from '../constants';

function* addEvaluationFetchWatchHandle(action) {
  const { msisdn } = o(localStorageGetItem, BUYOO);
  const funid = o(localStorageGetItem, BUYOO).result;

  try {
    const { trade_no, order_no, comments, screen } = action.payload;

    const Key = 'commodityKey';
    const appId = '3';
    const method = 'fun.evaluation.add';
    const charset = 'utf-8';
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, false);

    const encrypt = encryptMD5(
      [
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'msisdn',
          value: msisdn,
        },
        {
          key: 'username',
          value: msisdn,
        },
        {
          key: 'trade_no',
          value: trade_no,
        },
        {
          key: 'order_no',
          value: order_no,
        },
        {
          key: 'comments',
          value: comments,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.addEvaluation, [
      {
        appId,
        method,
        charset,
        signType,
        encrypt,
        timestamp,
        version,
        funid,
        msisdn,
        username: msisdn,
        trade_no,
        order_no,
        comments,
      },
    ]);

    if (response.code !== 10000) {
      yield put(addEvaluationFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(addEvaluationFetchSuccess());
      dispatchEvent(screen, {
        method: 'addEvaluation',
        params: {},
      });
      // yield apply(DeviceEventEmitter, DeviceEventEmitter.emit, [screen]);
    }
  } catch (err) {
    yield put(addEvaluationFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* addEvaluationFetchWatch() {
  yield takeEvery(ADD_EVALUATION.REQUEST, addEvaluationFetchWatchHandle);
}

import { takeEvery, apply, put } from 'redux-saga/effects';
import {
  enchashmentConfigFetchSuccess,
  enchashmentConfigFetchFailure,
} from '@src/common/actions/enchashmentConfig';
import { addError } from '@src/common/actions/error';
import buyoo from '@src/services/api';
import { ENCHASHMENT_CONFIG } from '@src/common/constants/actionTypes';
import { dispatchEventBuyoo } from '@src/utils';

export function* enchashmentConfigFetchWatchHandle() {
  try {
    const response = yield apply(buyoo, buyoo.enchashmentConfig, [{}]);
    yield put(enchashmentConfigFetchSuccess(response.feeRate, response.limit));
  } catch (err) {
    yield put(enchashmentConfigFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* enchashmentConfigSuccessWatchHandle(action) {
  const { screen } = action.payload;
  try {
    if (screen) {
      yield dispatchEventBuyoo(screen, {
        method: 'enchashmentConfig',
        params: {},
      });
    }
  } catch (error) {
    console.warn(error);
  }
}

export function* enchashmentConfigFetchWatch() {
  yield takeEvery(
    ENCHASHMENT_CONFIG.REQUEST,
    enchashmentConfigFetchWatchHandle,
  );
}

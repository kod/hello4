import { Modal } from 'antd-mobile';
import {
  takeEvery,
  // apply,
  put,
  // put,
} from 'redux-saga/effects';
import { formatMessage } from 'umi-plugin-locale';
import { ERROR } from '@src/common/constants/actionTypes';

export function* handleAlertError(action) {
  const error = action.payload;
  // alert(error);

  Modal.alert('', error, [
    { text: formatMessage({ id: 'cancel' }), style: 'default' },
  ]);

  yield put({
    type: ERROR.CLEAR,
    error: false,
  });
}

export function* watchError() {
  yield takeEvery(ERROR.ADD, handleAlertError);
}

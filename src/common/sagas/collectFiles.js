import { takeEvery, apply, put } from 'redux-saga/effects';
// import axios from 'axios';
import {
  collectFilesFetchSuccess,
  collectFilesFetchFailure,
} from '@src/common/actions/collectFiles';
import { addError } from '@src/common/actions/error';
import buyoo from '@src/services/api';
import { COLLECT_FILES } from '@src/common/constants/actionTypes';
// import { encryptMD5, signTypeMD5 } from '@src/utils/AuthEncrypt';

export function* collectFilesFetchWatchHandle(action) {
  try {
    const { productid = '1', files, fileOrigin = '' } = action.payload;
    const formData = new FormData();
    if (fileOrigin) {
      formData.append('files', fileOrigin, fileOrigin.name);
    } else {
      formData.append('files', {
        uri: files.uri,
        type: files.type || 'image/jpeg',
        name: files.name || 'photo.jpg',
      });
    }
    formData.append('productid', productid);

    const response = yield apply(buyoo, buyoo.collectFiles, [formData]);

    if (response.code !== 10000) {
      yield put(collectFilesFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(collectFilesFetchSuccess(response.url));
    }
  } catch (err) {
    yield put(collectFilesFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* collectFilesFetchWatch() {
  yield takeEvery(COLLECT_FILES.REQUEST, collectFilesFetchWatchHandle);
}

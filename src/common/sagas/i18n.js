import { takeEvery } from 'redux-saga/effects';
import { I18N_SET_LANGUAGE } from '@src/common/constants/actionTypes';
import { setLocale } from '@src/API';

export function setLanguageWatchHandle(action) {
  const { lang } = action.payload;
  setLocale(lang);
}

export function* setLanguageWatch() {
  yield takeEvery(I18N_SET_LANGUAGE.ADD, setLanguageWatchHandle);
}

/* eslint-disable import/prefer-default-export */
import { i18n } from '@src/API';
import { I18N_SET_LANGUAGE } from '@src/common/constants/actionTypes';

export function setLanguage(lang) {
  i18n.setLanguage(lang);
  return {
    type: I18N_SET_LANGUAGE.ADD,
    payload: {
      lang,
    },
  };
}

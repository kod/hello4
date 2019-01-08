/* eslint-disable camelcase */

import en_US from '@src/locales/en-US';
import vi_VN from '@src/locales/vi-VN';
import zh_CN from '@src/locales/zh-CN';
import {
  LOCALE_EN_US,
  LOCALE_VI_VN,
  LOCALE_ZH_CN,
  DEFAULT_LANG,
} from '@src/common/constants';

const localStorageName = 'umi_locale';

const getI18n = () => {
  let result;
  const local = localStorage.getItem(localStorageName) || DEFAULT_LANG;
  switch (local) {
    case LOCALE_EN_US:
      result = en_US;
      break;

    case LOCALE_VI_VN:
      result = vi_VN;
      break;

    case LOCALE_ZH_CN:
      result = zh_CN;
      break;

    default:
      break;
  }
  result = {
    ...result,
    getLanguage: () => DEFAULT_LANG,
    setLanguage: () => {},
  };
  return result;
};

export default getI18n();

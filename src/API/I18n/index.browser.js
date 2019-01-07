/* eslint-disable camelcase */

import en_US from '@src/locales/en-US';
import vi_VN from '@src/locales/vi-VN';
import zh_CN from '@src/locales/zh-CN';
import { LOCALE_EN_US, LOCALE_VI_VN, LOCALE_ZH_CN } from './index';

const localStorageName = 'umi_locale';

export default () => {
  let result;
  const local = localStorage.getItem(localStorageName) || LOCALE_EN_US;
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
  return result;
};

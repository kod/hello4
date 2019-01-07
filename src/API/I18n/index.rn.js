/* eslint-disable camelcase */
import LocalizedStrings from 'react-native-localization';

import en_US from '@src/locales/en-US';
import vi_VN from '@src/locales/vi-VN';
import zh_CN from '@src/locales/zh-CN';

import { LOCALE_EN_US, LOCALE_VI_VN, LOCALE_ZH_CN } from './index';

export default new LocalizedStrings({
  [LOCALE_EN_US]: en_US,
  [LOCALE_VI_VN]: vi_VN,
  [LOCALE_ZH_CN]: zh_CN,
});

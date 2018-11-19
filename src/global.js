// import '@babel/polyfill';
import { setLocale } from 'umi/locale';
import { IS_I18N } from './common/constants';

// global.Intl = require('intl');
// window.Intl = require('intl');

setInterval(() => {
  setLocale(IS_I18N ? 'zh-CN' : 'vi-VN');
}, 300);

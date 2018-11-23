// import '@babel/polyfill';

// global.Intl = require('intl');
// window.Intl = require('intl');

// import { setLocale } from 'umi/locale';
import { IS_I18N } from './common/constants';
// setTimeout(() => {
//   setLocale(true ? 'zh-CN' : 'vi-VN');
// }, 300);

const isInitUmiLocale = localStorage.getItem('isInitUmiLocale');
if (isInitUmiLocale !== 'true') {
  localStorage.setItem('umi_locale', IS_I18N ? 'zh-CN' : 'vi-VN');
  localStorage.setItem('isInitUmiLocale', 'true');
}

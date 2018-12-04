// import '@babel/polyfill';

// global.Intl = require('intl');
// window.Intl = require('intl');

// import { setLocale } from 'umi/locale';
import { IS_I18N } from './common/constants';
// setTimeout(() => {
//   setLocale(true ? 'zh-CN' : 'vi-VN');
// }, 300);

// const isInitUmiLocale = localStorage.getItem('isInitUmiLocale');
const umiLocale = localStorage.getItem('umi_locale');
if (IS_I18N === false && umiLocale !== 'vi-VN') {
  // if (umiLocale === null && isInitUmiLocale !== 'true') {
  localStorage.setItem('umi_locale', 'vi-VN');
  // localStorage.setItem('isInitUmiLocale', 'true');
}

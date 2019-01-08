import { IS_I18N } from './common/constants';

const umiLocale = localStorage.getItem('umi_locale');
if (IS_I18N === false && umiLocale !== 'vi-VN') {
  localStorage.setItem('umi_locale', 'vi-VN');
}

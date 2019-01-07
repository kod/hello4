import { I18n } from '@src/API';

export const I18N_SET_LANGUAGE = 'I18N_SET_LANGUAGE';

export function setLanguage(lang) {
  I18n.setLanguage(lang);
  return {
    type: I18N_SET_LANGUAGE,
    payload: {
      lang,
    },
  };
}

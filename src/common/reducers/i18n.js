import { i18n } from '@src/API';
import { I18N_SET_LANGUAGE } from '@src/common/constants/actionTypes';
import { DEFAULT_LANG } from '@src/common/constants';

export default (
  state = {
    lang: i18n.getLanguage() || DEFAULT_LANG,
  },
  action = {},
) => {
  switch (action.type) {
    case I18N_SET_LANGUAGE.ADD:
      return {
        ...state,
        lang: action.payload.lang,
      };
    default:
      return state;
  }
};

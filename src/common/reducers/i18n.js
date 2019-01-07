import { I18n } from '@src/API';
import { I18N_SET_LANGUAGE } from '@src/common/actions/i18n';

export default function i18n(
  state = {
    lang: I18n.getLanguage() || 'en-US',
  },
  action = {},
) {
  switch (action.type) {
    case I18N_SET_LANGUAGE:
      return {
        ...state,
        lang: action.payload.lang,
      };
    default:
      return state;
  }
}

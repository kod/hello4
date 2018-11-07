import { formatMessage } from 'umi/locale';
import buyoo from '@/services/api';

import { encryptMD5 } from '@/utils/AuthEncrypt';
import { CHANGEPASSWORD_NAMESPACE } from '@/common/constants';
import { CHANGE_PASSWORD } from '@/common/constants/actionTypes';
import {
  changePasswordFetchSuccess,
  changePasswordFetchFailure,
} from '@/common/actions/changePassword';
import { addError } from '@/common/actions/error';
import { dispatchEvent } from '@/utils';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  user: null,
};

export default {
  namespace: CHANGEPASSWORD_NAMESPACE,

  state: initState,

  effects: {
    *[CHANGE_PASSWORD.REQUEST](action, { apply, put }) {
      const { msisdn, password, otp, screen } = action.payload;
      try {
        const Key = 'userKey';
        const provider = '3';

        const encrypt = encryptMD5(
          [
            {
              key: 'provider',
              value: provider,
            },
            {
              key: 'msisdn',
              value: msisdn,
            },
            {
              key: 'password',
              value: password,
            },
            {
              key: 'otp',
              value: otp,
            },
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.changePassword, [
          {
            provider,
            msisdn,
            password,
            otp,
            encryption: encrypt,
          },
        ]);

        if (response.status !== 10000) {
          yield put(changePasswordFetchFailure());
          switch (response.status) {
            case 70002:
              yield put(
                addError(formatMessage({ id: 'verificationCodeIsIncorrect' })),
              );
              return;

            default:
              yield put(addError('error'));
              break;
          }
        } else {
          yield put(changePasswordFetchSuccess(screen));
        }
      } catch (err) {
        yield put(changePasswordFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
    *[CHANGE_PASSWORD.SUCCESS](action) {
      const { screen } = action.payload;
      try {
        yield console.log(screen);
        dispatchEvent(screen);
      } catch (err) {
        console.warn(err);
      }
    },
  },

  reducers: {
    [CHANGE_PASSWORD.CLEAR]() {
      return {
        ...initState,
      };
    },
    [CHANGE_PASSWORD.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.payload.user,
      };
    },
    [CHANGE_PASSWORD.FAILURE](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    },
  },
};

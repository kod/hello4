import buyoo from '@/services/api';
import { Modal } from 'antd-mobile';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';

import { encryptMD5 } from '@/utils/AuthEncrypt';
import { REGISTER_NAMESPACE } from '@/common/constants';
import { REGISTER } from '@/common/constants/actionTypes';
import {
  registerFetchSuccess,
  registerFetchFailure,
} from '@/common/actions/register';
import { addError } from '@/common/actions/error';
import { loginFetchSuccess } from '@/common/actions/login';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
};

export default {
  namespace: REGISTER_NAMESPACE,

  state: initState,

  effects: {
    *[REGISTER.REQUEST](action, { apply, put }) {
      try {
        const {
          mail,
          username = '',
          password,
          payPassword = '',
          otp,
          check = '1',
          appid = '',
          inviterno = '',
          isReceive = false,
        } = action.payload;

        const Key = 'userKey';
        const provider = '3';
        const version = '2.1';

        const encrypt = encryptMD5(
          [
            {
              key: 'provider',
              value: provider,
            },
            {
              key: 'mail',
              value: mail,
            },
            {
              key: 'username',
              value: username,
            },
            {
              key: 'password',
              value: password,
            },
            {
              key: 'payPassword',
              value: payPassword,
            },
            {
              key: 'otp',
              value: otp,
            },
            {
              key: 'check',
              value: check,
            },
            {
              key: 'appid',
              value: appid,
            },
            {
              key: 'inviterno',
              value: inviterno,
            },
            {
              key: 'isReceive',
              value: isReceive,
            },
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.register, [
          {
            provider,
            mail,
            username,
            password,
            payPassword,
            otp,
            check,
            appid,
            inviterno,
            encryption: encrypt,
            version,
            isReceive,
          },
        ]);

        if (response.status !== 10000) {
          yield put(registerFetchFailure());
          switch (response.status) {
            case 50008:
              yield put(
                addError(formatMessage({ id: 'emailAlreadyRegistered' })),
              );
              break;

            default:
              yield put(
                addError(formatMessage({ id: 'verificationCodeIsIncorrect' })),
              );
              break;
          }
        } else {
          yield put(registerFetchSuccess(response));
        }
      } catch (err) {
        yield put(registerFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
    *[REGISTER.SUCCESS](action, { put }) {
      try {
        const { response } = action.payload;
        yield put(loginFetchSuccess(response, ''));

        Modal.alert('', formatMessage({ id: 'signUpSuccessfully' }), [
          {
            text: formatMessage({ id: 'confirm' }),
            onPress: () => router.go(-3),
            style: 'default',
          },
        ]);
      } catch (error) {
        yield put(addError(typeof err === 'string' ? error : error.toString()));
      }
    },
  },

  reducers: {
    [REGISTER.CLEAR]() {
      return {
        ...initState,
      };
    },
    [REGISTER.SUCCESS](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    },
    [REGISTER.FAILURE](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    },
  },
};

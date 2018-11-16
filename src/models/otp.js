/* eslint-disable consistent-return */
import buyoo from '@/services/api';

import { encryptMD5 } from '@/utils/AuthEncrypt';
import { OTP_NAMESPACE } from '@/common/constants';
import { OTP } from '@/common/constants/actionTypes';
import { otpFetchSuccess, otpFetchFailure } from '@/common/actions/otp';
import { addError } from '@/common/actions/error';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default {
  namespace: OTP_NAMESPACE,

  state: initState,

  effects: {
    *[OTP.REQUEST](action, { apply, put }) {
      try {
        const { mail, type = 1 } = action.payload;

        const Key = 'userKey';
        const provider = '3';

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
              key: 'type',
              value: type,
            },
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.otp, [
          {
            provider,
            mail,
            type,
            encryption: encrypt,
          },
        ]);

        if (response.status !== 10000) {
          yield put(otpFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
          return false;
        }

        yield put(otpFetchSuccess());
      } catch (err) {
        yield put(otpFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [OTP.CLEAR]() {
      return {
        ...initState,
      };
    },
    [OTP.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
      };
    },
    [OTP.FAILURE](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    },
  },
};

import dayjs from 'dayjs';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5, o } from '@/utils/AuthEncrypt';
import { ENCHASHMENT_APPLY_NAMESPACE, BUYOO } from '@/common/constants';
import { ENCHASHMENT_APPLY } from '@/common/constants/actionTypes';
import {
  enchashmentApplyFetchSuccess,
  enchashmentApplyFetchFailure,
} from '@/common/actions/enchashmentApply';
import { addError } from '@/common/actions/error';
import { localStorageGetItem, dispatchEvent } from '@/utils';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  item: null,
};

export default {
  namespace: ENCHASHMENT_APPLY_NAMESPACE,

  state: initState,

  effects: {
    *[ENCHASHMENT_APPLY.REQUEST](action, { apply, put }) {
      const { amount = 0, screen = '' } = action.payload;
      try {
        const authUser = o(localStorageGetItem, BUYOO);

        const funid = authUser ? o(localStorageGetItem, BUYOO).result : '';

        const Key = 'userKey';
        const appId = '3';
        const method = 'fun.user.enchashment.apply';
        const charset = 'utf-8';
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const version = '2.0';

        const signType = signTypeMD5(appId, method, charset, Key, true);

        const encrypt = encryptMD5(
          [
            {
              key: 'funid',
              value: funid,
            },
            {
              key: 'amount',
              value: amount,
            },
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.enchashmentApply, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            funid,
            amount,
          },
        ]);

        if (response.code !== 10000) {
          yield put(enchashmentApplyFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(enchashmentApplyFetchSuccess(screen));
        }
      } catch (err) {
        yield put(enchashmentApplyFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
    *[ENCHASHMENT_APPLY.SUCCESS](action) {
      const { screen } = action.payload;
      try {
        if (screen) {
          yield dispatchEvent(screen, {
            method: 'enchashmentApply',
            params: {},
          });
        }
      } catch (error) {
        console.warn(error);
      }
    },
  },

  reducers: {
    [ENCHASHMENT_APPLY.CLEAR]() {
      return {
        ...initState,
      };
    },
    [ENCHASHMENT_APPLY.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.payload.item,
      };
    },
    [ENCHASHMENT_APPLY.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
  },
};

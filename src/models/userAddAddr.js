/* eslint-disable camelcase */
import moment from 'moment';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { USERADDADDR_NAMESPACE } from '@/common/constants';
import { ADDRESS_ADD } from '@/common/constants/actionTypes';
import {
  addressFetch,
  // addressAddSuccess,
  // addressAddFailure,
} from '@/common/actions/address';
import {
  addressAddSuccess,
  addressAddFailure,
} from '@/common/actions/userAddAddr';
import { addError } from '@/common/actions/error';
import { getAuthUserFunid } from '@/common/selectors';
import { dispatchEvent } from '@/utils';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
  addressSelectedId: 0,
};

export default {
  namespace: USERADDADDR_NAMESPACE,

  state: initState,

  effects: {
    *[ADDRESS_ADD.REQUEST](action, { apply, put, select }) {
      try {
        const funid = yield select(getAuthUserFunid);

        const {
          msisdn,
          address,
          isdefault,
          username,
          division1st = 1,
          division2nd = 0,
          division3rd = 0,
          division4th = 0,
          division5th = 0,
          division6th = 0,
          screen,
        } = action.payload;

        const Key = 'userKey';
        const appId = '3';
        const method = 'fun.uc.useraddaddr';
        const charset = 'utf-8';
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        const version = '2.0';

        const signType = signTypeMD5(appId, method, charset, Key, false);

        const encrypt = encryptMD5(
          [
            {
              key: 'funid',
              value: funid,
            },
            {
              key: 'msisdn',
              value: msisdn,
            },
            {
              key: 'address',
              value: address,
            },
            {
              key: 'isdefault',
              value: isdefault,
            },
            {
              key: 'username',
              value: username,
            },
            {
              key: 'division1st',
              value: division1st,
            },
            {
              key: 'division2nd',
              value: division2nd,
            },
            {
              key: 'division3rd',
              value: division3rd,
            },
            {
              key: 'division4th',
              value: division4th,
            },
            {
              key: 'division5th',
              value: division5th,
            },
            {
              key: 'division6th',
              value: division6th,
            },
          ],
          Key,
        );
        const response = yield apply(buyoo, buyoo.useraddaddr, [
          {
            appId,
            method,
            charset,
            signType,
            encrypt,
            timestamp,
            version,
            funid,
            msisdn,
            address,
            isdefault,
            username,
            division1st,
            division2nd,
            division3rd,
            division4th,
            division5th,
            division6th,
          },
        ]);

        if (response.code !== 10000) {
          yield put(addressAddFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(addressAddSuccess(screen));
        }
      } catch (err) {
        yield put(addressAddFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
    *[ADDRESS_ADD.SUCCESS](action, { put }) {
      const { screen } = action.payload;
      try {
        yield put(addressFetch());
        dispatchEvent(screen);
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    [ADDRESS_ADD.CLEAR]() {
      return {
        ...initState,
      };
    },
    [ADDRESS_ADD.REQUEST](state, action) {
      return {
        ...state,
        loading: true,
        refreshing: action.payload.refreshing,
      };
    },
    [ADDRESS_ADD.SUCCESS](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    },
    [ADDRESS_ADD.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
  },
};

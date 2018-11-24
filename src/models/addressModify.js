/* eslint-disable camelcase */
import dayjs from 'dayjs';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5, o } from '@/utils/AuthEncrypt';
import { ADDRESSMODIFY_NAMESPACE, BUYOO } from '@/common/constants';
import { ADDRESS_MODIFY } from '@/common/constants/actionTypes';
import {
  addressFetch,
  addressModifySuccess,
  addressModifyFailure,
} from '@/common/actions/addressModify';
import { addError } from '@/common/actions/error';
import { b } from '@/utils';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
  addressSelectedId: 0,
};

export default {
  namespace: ADDRESSMODIFY_NAMESPACE,

  state: initState,

  effects: {
    *[ADDRESS_MODIFY.REQUEST](action, { put, apply }) {
      try {
        const funid = o(b, BUYOO).result;

        const {
          addrid,
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
        } = action.payload;

        const Key = 'userKey';
        const appId = '3';
        const method = 'fun.uc.usermodifyaddr';
        const charset = 'utf-8';
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const version = '2.0';

        const signType = signTypeMD5(appId, method, charset, Key, false);

        const encrypt = encryptMD5(
          [
            {
              key: 'addrid',
              value: addrid,
            },
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

        const response = yield apply(buyoo, buyoo.userModifyAddr, [
          {
            appId,
            method,
            charset,
            signType,
            encrypt,
            timestamp,
            version,
            addrid,
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
          yield put(addressModifyFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(addressModifySuccess());
        }
      } catch (err) {
        yield put(addressModifyFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
    *[ADDRESS_MODIFY.SUCCESS](action, { put }) {
      try {
        yield put(addressFetch(true));
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    [ADDRESS_MODIFY.CLEAR]() {
      return {
        ...initState,
      };
    },
    [ADDRESS_MODIFY.REQUEST](state) {
      return {
        ...state,
        loading: true,
      };
    },
    [ADDRESS_MODIFY.SUCCESS](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
        isTrue: true,
      };
    },
    [ADDRESS_MODIFY.FAILURE](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
        isTrue: false,
      };
    },
  },
};

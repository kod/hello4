import dayjs from 'dayjs';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5, o } from '@/utils/AuthEncrypt';
import { GET_INVITE_RECORD_NAMESPACE, BUYOO } from '@/common/constants';
import { GET_INVITE_RECORD } from '@/common/constants/actionTypes';
import {
  getInviteRecordFetchSuccess,
  getInviteRecordFetchFailure,
} from '@/common/actions/getInviteRecord';
import { addError } from '@/common/actions/error';
import { localStorageGetItem } from '@/utils';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  item: null,
};

export default {
  namespace: GET_INVITE_RECORD_NAMESPACE,

  state: initState,

  effects: {
    *[GET_INVITE_RECORD.REQUEST](action, { apply, put }) {
      const { pagesize = 100, currentpage = 1 } = action.payload;
      try {
        const authUser = o(localStorageGetItem, BUYOO);

        const funid = authUser ? o(localStorageGetItem, BUYOO).result : '';

        const Key = 'tradeKey';
        const appId = '3';
        const method = 'fun.trade.getInviteRecord';
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
              key: 'pagesize',
              value: pagesize,
            },
            {
              key: 'currentpage',
              value: currentpage,
            },
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.getInviteRecord, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            funid,
            pagesize,
            currentpage,
          },
        ]);

        if (response.code !== 10000) {
          yield put(getInviteRecordFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(getInviteRecordFetchSuccess(response.result));
        }
      } catch (err) {
        yield put(getInviteRecordFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [GET_INVITE_RECORD.CLEAR]() {
      return {
        ...initState,
      };
    },
    [GET_INVITE_RECORD.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.payload.item,
      };
    },
    [GET_INVITE_RECORD.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
  },
};

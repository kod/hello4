import dayjs from 'dayjs';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5, o } from '@/utils/AuthEncrypt';
import { ENCHASHMENT_GETLIST_NAMESPACE, BUYOO } from '@/common/constants';
import { ENCHASHMENT_GETLIST } from '@/common/constants/actionTypes';
import {
  enchashmentGetListFetchSuccess,
  enchashmentGetListFetchFailure,
} from '@/common/actions/enchashmentGetList';
import { addError } from '@/common/actions/error';
import { localStorageGetItem } from '@/utils';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  item: null,
};

export default {
  namespace: ENCHASHMENT_GETLIST_NAMESPACE,

  state: initState,

  effects: {
    *[ENCHASHMENT_GETLIST.REQUEST](action, { apply, put }) {
      const { pagesize = 100, currentpage = 1 } = action.payload;
      try {
        const authUser = o(localStorageGetItem, BUYOO);

        const funid = authUser ? o(localStorageGetItem, BUYOO).result : '';

        const Key = 'userKey';
        const appId = '3';
        const method = 'fun.user.enchashment.getList';
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

        const response = yield apply(buyoo, buyoo.enchashmentGetList, [
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
          yield put(enchashmentGetListFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(enchashmentGetListFetchSuccess(response.result));
        }
      } catch (err) {
        yield put(enchashmentGetListFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [ENCHASHMENT_GETLIST.CLEAR]() {
      return {
        ...initState,
      };
    },
    [ENCHASHMENT_GETLIST.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.payload.item,
      };
    },
    [ENCHASHMENT_GETLIST.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
  },
};

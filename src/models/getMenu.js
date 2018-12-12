/* eslint-disable camelcase */
import dayjs from 'dayjs';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5, o } from '@/utils/AuthEncrypt';
import { GETMENU_NAMESPACE, BUYOO } from '@/common/constants';
import { GET_MENU, GET_MENU_INDEX } from '@/common/constants/actionTypes';
import {
  getMenuFetchSuccess,
  getMenuFetchFailure,
} from '@/common/actions/getMenu';
import { addError } from '@/common/actions/error';
import { localStorageGetItem } from '@/utils';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
  itemsList: [],
  itemsClassfy: [],
  itemsIndex: 0,
};

export default {
  namespace: GETMENU_NAMESPACE,

  state: initState,

  effects: {
    *[GET_MENU.REQUEST](action, { apply, put }) {
      try {
        const authUser = o(localStorageGetItem, BUYOO);
        const funid = authUser ? o(localStorageGetItem, BUYOO).result : '';
        const {
          typeid = 0,
          subclassfyid = 0,
          thirdclassfyid = 0,
        } = action.payload;

        const Key = 'commodityKey';
        const appId = '3';
        const method = 'fun.commodity.menu';
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
              key: 'typeid',
              value: typeid,
            },
            {
              key: 'subclassfyid',
              value: subclassfyid,
            },
            {
              key: 'thirdclassfyid',
              value: thirdclassfyid,
            },
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.getMenu, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            funid,
            typeid,
            subclassfyid,
            thirdclassfyid,
          },
        ]);

        if (response.code !== 10000) {
          yield put(getMenuFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(
            getMenuFetchSuccess({
              items: response.result,
              itemsList: response.result.map(val => val.list),
              itemsClassfy: response.result.map(val => val.classfy),
            }),
          );
        }
      } catch (err) {
        yield put(getMenuFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [GET_MENU.CLEAR]() {
      return {
        ...initState,
      };
    },
    [GET_MENU.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
        itemsList: action.payload.itemsList,
        itemsClassfy: action.payload.itemsClassfy,
      };
    },
    [GET_MENU.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
    [GET_MENU_INDEX.REQUEST](state, action) {
      return {
        ...state,
        itemsIndex: action.payload.index,
      };
    },
  },
};

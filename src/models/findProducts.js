import dayjs from 'dayjs';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5, o } from '@/utils/AuthEncrypt';
import { FINDPRODUCTS_NAMESPACE, BUYOO } from '@/common/constants';
import { FIND_PRODUCTS } from '@/common/constants/actionTypes';
import {
  findProductsFetchSuccess,
  findProductsFetchFailure,
} from '@/common/actions/findProducts';
import { addError } from '@/common/actions/error';
import { localStorageGetItem } from '@/utils';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default {
  namespace: FINDPRODUCTS_NAMESPACE,

  state: initState,

  effects: {
    *[FIND_PRODUCTS.REQUEST](action, { apply, put }) {
      try {
        const authUser = o(localStorageGetItem, BUYOO);
        const funid = authUser ? o(localStorageGetItem, BUYOO).result : '';
        const { findcontent, pagesize = 50, currentpage = 1 } = action.payload;

        const Key = 'commodityKey';
        const appId = '3';
        const method = 'fun.find.finding';
        const charset = 'utf-8';
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const version = '1.0';

        const signType = signTypeMD5(appId, method, charset, Key, true);

        const encrypt = encryptMD5(
          [
            {
              key: 'funid',
              value: funid,
            },
            {
              key: 'findcontent',
              value: findcontent,
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

        const response = yield apply(buyoo, buyoo.findProducts, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            funid,
            findcontent,
            pagesize,
            currentpage,
          },
        ]);

        if (response.code !== 10000) {
          yield put(findProductsFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(
            findProductsFetchSuccess(
              response.details.map(val => {
                val.imageUrl = val.iconUrl;
                return val;
              }),
            ),
          );
        }
      } catch (err) {
        yield put(findProductsFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [FIND_PRODUCTS.CLEAR]() {
      return {
        ...initState,
      };
    },
    [FIND_PRODUCTS.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
      };
    },
    [FIND_PRODUCTS.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
  },
};

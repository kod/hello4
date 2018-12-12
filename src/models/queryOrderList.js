import dayjs from 'dayjs';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5, o } from '@/utils/AuthEncrypt';
import { QUERYORDERLIST_NAMESPACE, BUYOO } from '@/common/constants';
import {
  QUERY_ORDER_LIST,
  QUERY_ORDER_LIST_INDEX,
} from '@/common/constants/actionTypes';
import {
  queryOrderListFetchSuccess,
  queryOrderListFetchFailure,
} from '@/common/actions/queryOrderList';
import { addError } from '@/common/actions/error';
import { localStorageGetItem } from '@/utils';

const initState = {
  scrollTabIndex: 0,
  rows: 10,
  item: {
    0: {
      loading: false,
      loaded: false,
      refreshing: false,
      page: 1,
      items: [],
    },
    1: {
      loading: false,
      loaded: false,
      refreshing: false,
      page: 1,
      items: [],
    },
    2: {
      loading: false,
      loaded: false,
      refreshing: false,
      page: 1,
      items: [],
    },
    3: {
      loading: false,
      loaded: false,
      refreshing: false,
      page: 1,
      items: [],
    },
  },
};

export default {
  namespace: QUERYORDERLIST_NAMESPACE,

  state: initState,

  effects: {
    *[QUERY_ORDER_LIST.REQUEST](action, { apply, put }) {
      try {
        const { page = 1, index = 0, status, rows = 100 } = action.payload;
        const authUser = o(localStorageGetItem, BUYOO);

        const funid = authUser ? o(localStorageGetItem, BUYOO).result : '';

        const Key = 'tradeKey';
        const appId = '3';
        const method = 'fun.trade.queryList';
        const charset = 'utf-8';
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const version = '2.1';

        const signType = signTypeMD5(appId, method, charset, Key, true);

        const encrypt = encryptMD5(
          [
            {
              key: 'funid',
              value: funid,
            },
            {
              key: 'page',
              value: page,
            },
            {
              key: 'rows',
              value: rows,
            },
            {
              key: 'status',
              value: status,
            },
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.queryOrderList, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            funid,
            page,
            rows,
            status,
          },
        ]);

        if (response.code !== 10000) {
          yield put(queryOrderListFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(
            queryOrderListFetchSuccess({
              page,
              index,
              count: response.count,
              result: response.details.map(val => ({
                ...val,
                goodList: val.goodList.map(val1 => ({
                  ...val1,
                  imageUrl: val1.iconUrl,
                  price: val1.totalAmount,
                  propertiesIds: '',
                })),
              })),
              // tradeNo: response.result.tradeNo,
              // orderNo: response.result.orderNo,
            }),
          );
        }
      } catch (err) {
        yield put(queryOrderListFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [QUERY_ORDER_LIST.CLEAR]() {
      return {
        ...initState,
      };
    },
    [QUERY_ORDER_LIST.REQUEST](state, action) {
      return {
        ...state,
        item: {
          ...state.item,
          [action.payload.index]: {
            ...state.item[action.payload.index],
            loading: true,
          },
        },
      };
    },
    [QUERY_ORDER_LIST.SUCCESS](state, action) {
      return {
        ...state,
        item: {
          ...state.item,
          [action.payload.index]: {
            ...state.item[action.payload.index],
            loading: false,
            loaded: true,
            page: action.payload.page,
            items: action.payload.result,
            // items: [ ...state.item[action.payload.index].items, ...action.payload.result ]
          },
        },
      };
    },
    [QUERY_ORDER_LIST_INDEX.REQUEST](state, action) {
      return {
        ...state,
        scrollTabIndex: action.payload.scrollTabIndex,
      };
    },
  },
};

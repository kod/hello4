import dayjs from 'dayjs';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { QUERYORDER_NAMESPACE } from '@/common/constants';
import { QUERY_ORDER } from '@/common/constants/actionTypes';
import {
  queryOrderFetchSuccess,
  queryOrderFetchFailure,
} from '@/common/actions/queryOrder';
import { addError } from '@/common/actions/error';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  item: {},
};

export default {
  namespace: QUERYORDER_NAMESPACE,

  state: initState,

  effects: {
    *[QUERY_ORDER.REQUEST](action, { apply, put }) {
      try {
        const { orderNo, tradeNo } = action.payload;

        const Key = 'tradeKey';
        const appId = '3';
        const method = 'fun.trade.query';
        const charset = 'utf-8';
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const version = '2.0';

        const signType = signTypeMD5(appId, method, charset, Key, false);

        const encrypt = encryptMD5(
          [
            {
              key: 'orderNo',
              value: orderNo,
            },
            {
              key: 'tradeNo',
              value: tradeNo,
            },
          ],
          Key,
        );

        let response = yield apply(buyoo, buyoo.queryOrder, [
          {
            // appId: 'VNOYX9GI72QE',
            // method: 'fun.trade.query',
            // charset: 'utf-8',
            // signType: 'b898f6ea1375b8f0871ef0c4a719b739',
            // encrypt: '722ea6ebd6a65b41dc8610d5b2180527',
            // timestamp: '2018-06-06 17:38:56',
            // version: '2.0',
            // orderNo: '220180606173139579374083127',
            // tradeNo: '210320180606173139579121',
            appId,
            method,
            charset,
            signType,
            encrypt,
            timestamp,
            version,
            orderNo,
            tradeNo,
          },
        ]);

        response = {
          ...response,
          goodsDetail: response.goodsDetail.map(val => {
            val.price = val.totalAmount;
            val.orgPrice = val.totalOrgAmount;
            val.imageUrl = val.iconUrl;
            return val;
          }),
        };

        if (response.code !== 10000) {
          yield put(queryOrderFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(queryOrderFetchSuccess(response));
        }
      } catch (err) {
        yield put(queryOrderFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [QUERY_ORDER.CLEAR]() {
      return {
        ...initState,
      };
    },
    [QUERY_ORDER.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.payload.item,
      };
    },
    [QUERY_ORDER.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
  },
};

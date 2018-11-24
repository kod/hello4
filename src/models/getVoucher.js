import dayjs from 'dayjs';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5, o } from '@/utils/AuthEncrypt';
import { GETVOUCHER_NAMESPACE, BUYOO } from '@/common/constants';
import { GET_VOUCHER } from '@/common/constants/actionTypes';
import {
  getVoucherFetchSuccess,
  getVoucherFetchFailure,
} from '@/common/actions/getVoucher';
import { addError } from '@/common/actions/error';
import { b } from '@/utils';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default {
  namespace: GETVOUCHER_NAMESPACE,

  state: initState,

  effects: {
    *[GET_VOUCHER.REQUEST](action, { apply, put }) {
      try {
        const authUser = o(b, BUYOO);
        const funid = authUser ? o(b, BUYOO).result : '';

        const {
          vouchertype = '',
          typeid = '',
          brandid = '',
          productid = '',
          currentpage = '1',
          pagesize = '100',
        } = action.payload;

        const Key = 'marketKey';
        const appId = '3';
        const method = 'fun.market.getVoucher';
        const charset = 'utf-8';
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const version = '2.0';

        const signType = signTypeMD5(appId, method, charset, Key, true);

        const encrypt = encryptMD5(
          [
            {
              key: 'vouchertype',
              value: vouchertype,
            },
            {
              key: 'funid',
              value: funid,
            },
            {
              key: 'typeid',
              value: typeid,
            },
            {
              key: 'brandid',
              value: brandid,
            },
            {
              key: 'productid',
              value: productid,
            },
            {
              key: 'currentpage',
              value: currentpage,
            },
            {
              key: 'pagesize',
              value: pagesize,
            },
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.getVoucher, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            vouchertype,
            funid,
            typeid,
            brandid,
            productid,
            currentpage,
            pagesize,
          },
        ]);

        if (response.code !== 10000) {
          yield put(getVoucherFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(getVoucherFetchSuccess(response.details));
        }
      } catch (err) {
        yield put(getVoucherFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [GET_VOUCHER.CLEAR]() {
      return {
        ...initState,
      };
    },
    [GET_VOUCHER.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
      };
    },
    [GET_VOUCHER.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
  },
};

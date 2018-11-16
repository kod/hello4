import moment from 'moment';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { JUDGEVOUCHER_NAMESPACE } from '@/common/constants';
import { JUDGE_VOUCHER } from '@/common/constants/actionTypes';
import {
  judgeVoucherFetchSuccess,
  judgeVoucherFetchFailure,
} from '@/common/actions/judgeVoucher';
import { addError } from '@/common/actions/error';
import { getAuthUserFunid } from '@/common/selectors';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default {
  namespace: JUDGEVOUCHER_NAMESPACE,

  state: initState,

  effects: {
    *[JUDGE_VOUCHER.REQUEST](action, { apply, put, select }) {
      try {
        const funid = yield select(getAuthUserFunid);
        const {
          products = '',
          currentpage = 1,
          pagesize = 100,
        } = action.payload;

        const Key = 'userKey';
        const appId = '3';
        const method = 'fun.usercenter.judgeVoucher';
        const charset = 'utf-8';
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        const version = '2.0';

        const signType = signTypeMD5(appId, method, charset, Key, true);

        const encrypt = encryptMD5(
          [
            {
              key: 'funid',
              value: funid,
            },
            {
              key: 'products',
              value: products,
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

        const response = yield apply(buyoo, buyoo.judgeVoucher, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            funid,
            products,
            currentpage,
            pagesize,
          },
        ]);

        if (response.code !== 10000) {
          yield put(judgeVoucherFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(
            judgeVoucherFetchSuccess({
              items: response.details,
            }),
          );
        }
      } catch (err) {
        yield put(judgeVoucherFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [JUDGE_VOUCHER.CLEAR]() {
      return {
        ...initState,
      };
    },
    [JUDGE_VOUCHER.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
      };
    },
    [JUDGE_VOUCHER.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
  },
};

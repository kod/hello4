import moment from 'moment';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { RECEIVEVOUCHER_NAMESPACE } from '@/common/constants';
import { RECEIVE_VOUCHER } from '@/common/constants/actionTypes';
import {
  receiveVoucherFetchSuccess,
  receiveVoucherFetchFailure,
} from '@/common/actions/receiveVoucher';
import { addError } from '@/common/actions/error';
import { getAuthUserFunid } from '@/common/selectors';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
};

export default {
  namespace: RECEIVEVOUCHER_NAMESPACE,

  state: initState,

  effects: {
    *[RECEIVE_VOUCHER.REQUEST](action, { apply, put, select }) {
      try {
        const { voucherid } = action.payload;
        const funid = yield select(getAuthUserFunid);

        const Key = 'userKey';
        const appId = '3';
        const method = 'fun.usercenter.receiveVoucher';
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
              key: 'voucherid',
              value: voucherid,
            },
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.receiveVoucher, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            funid,
            voucherid,
          },
        ]);

        if (response.code !== 10000) {
          yield put(receiveVoucherFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(receiveVoucherFetchSuccess());
        }
      } catch (err) {
        yield put(receiveVoucherFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [RECEIVE_VOUCHER.CLEAR]() {
      return {
        ...initState,
      };
    },
    [RECEIVE_VOUCHER.SUCCESS](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    },
    [RECEIVE_VOUCHER.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
  },
};

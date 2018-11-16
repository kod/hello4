import moment from 'moment';
import buyoo from '@/services/api';
// import { Modal } from 'antd-mobile';
// import { formatMessage } from 'umi/locale';
// import router from 'umi/router';

import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import {
  GETVOUCHERLIST_NAMESPACE,
  COUPONMY_TABNAVIGATOR_MAP,
} from '@/common/constants';
import { GET_VOUCHER_LIST } from '@/common/constants/actionTypes';
import {
  getVoucherListFetchSuccess,
  getVoucherListFetchFailure,
} from '@/common/actions/getVoucherList';
// import { getVoucherFetch } from '@/common/actions/getVoucher';
import { addError } from '@/common/actions/error';
import { getAuthUserFunid } from '@/common/selectors';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  CouponMyUnused: [],
  CouponMyUsed: [],
  CouponMyPast: [],
};

export default {
  namespace: GETVOUCHERLIST_NAMESPACE,

  state: initState,

  effects: {
    *[GET_VOUCHER_LIST.REQUEST](action, { apply, put, select }) {
      try {
        const funid = yield select(getAuthUserFunid);
        const {
          vouchertype = '',
          typeid = '',
          brandid = '',
          productid = '',
          cardno = '',
          status = '1',
          currentpage = '1',
          pagesize = '100',
        } = action.payload;

        const Key = 'userKey';
        const appId = '3';
        const method = 'fun.usercenter.getVoucher';
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
              key: 'vouchertype',
              value: vouchertype,
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
              key: 'cardno',
              value: cardno,
            },
            {
              key: 'status',
              value: status,
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

        const response = yield apply(buyoo, buyoo.getVoucherList, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            funid,
            vouchertype,
            typeid,
            brandid,
            productid,
            cardno,
            status,
            currentpage,
            pagesize,
          },
        ]);

        if (response.code !== 10000) {
          yield put(getVoucherListFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(
            getVoucherListFetchSuccess({
              items: response.details,
              status,
            }),
          );
        }
      } catch (err) {
        yield put(getVoucherListFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
    // *[GET_VOUCHER_LIST.SUCCESS](action, { put }) {
    //   try {
    //     yield put(getVoucherFetch());
    //     Modal.alert('', formatMessage({ id: 'success' }), [
    //       {
    //         text: formatMessage({ id: 'confirm' }),
    //         style: 'default',
    //         onPress: () => {
    //           router.go(-1);
    //         },
    //       },
    //     ]);
    //   } catch (err) {
    //     yield put(addError(typeof err === 'string' ? err : err.toString()));
    //   }
    // },
  },

  reducers: {
    [GET_VOUCHER_LIST.CLEAR]() {
      return {
        ...initState,
      };
    },
    [GET_VOUCHER_LIST.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        [COUPONMY_TABNAVIGATOR_MAP[action.payload.status]]:
          action.payload.items,
      };
    },
    [GET_VOUCHER_LIST.FAILURE](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    },
  },
};

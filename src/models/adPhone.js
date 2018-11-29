import dayjs from 'dayjs';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { ADPHONE_NAMESPACE } from '@/common/constants';
import { AD_PHONE } from '@/common/constants/actionTypes';
import {
  adPhoneFetchSuccess,
  adPhoneFetchFailure,
} from '@/common/actions/adPhone';
import { addError } from '@/common/actions/error';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  classfyinfo: [],
  phoneAdList: [],
  phoneAdBanerList: [],
};

export default {
  namespace: ADPHONE_NAMESPACE,

  state: initState,

  effects: {
    *[AD_PHONE.REQUEST](action, { apply, put }) {
      try {
        const { params = {} } = action.payload;
        const Key = 'commodityKey';
        const appId = '3';
        const method = 'fun.cellphone.ads';
        const charset = 'utf-8';
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const version = '1.0';

        const typeid = params.typeid || '1';
        const pagesize = params.pagesize || '8';
        const currentpage = params.currentpage || '1';

        const signType = signTypeMD5(appId, method, charset, Key, true);

        const encrypt = encryptMD5(
          [
            {
              key: 'typeid',
              value: typeid,
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

        const response = yield apply(buyoo, buyoo.initAdCellphone, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            typeid,
            pagesize,
            currentpage,
          },
        ]);

        const phoneAdList = [];
        const phoneAdBanerList = [];
        let classfyinfo = [];

        if (response.code === 10000) {
          const array = response.cellphoneadinfo;
          for (let index = 0; index < array.length; index += 1) {
            const element = array[index];
            if (element.position === 1) {
              phoneAdBanerList.push(element);
            }
            if (element.position === 3) {
              element.price = element.minprice;
              phoneAdList.push(element);
            }
          }
          ({ classfyinfo } = response);
        }

        yield put(
          adPhoneFetchSuccess(phoneAdList, phoneAdBanerList, classfyinfo),
        );
      } catch (err) {
        yield put(adPhoneFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [AD_PHONE.CLEAR]() {
      return {
        ...initState,
      };
    },
    [AD_PHONE.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        phoneAdList: action.payload.phoneAdList,
        phoneAdBanerList: action.payload.phoneAdBanerList,
        classfyinfo: action.payload.classfyinfo,
      };
    },
    [AD_PHONE.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
  },
};

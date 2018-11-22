import dayjs from 'dayjs';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { GETADVERSTTOPINFO_NAMESPACE } from '@/common/constants';
import { GET_ADVERST_TOP_INFO } from '@/common/constants/actionTypes';
import {
  getAdverstTopInfoFetchSuccess,
  getAdverstTopInfoFetchFailure,
} from '@/common/actions/getAdverstTopInfo';
import { addError } from '@/common/actions/error';
import { getAuthUserFunid, getAuthUser } from '@/common/selectors';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default {
  namespace: GETADVERSTTOPINFO_NAMESPACE,

  state: initState,

  effects: {
    *[GET_ADVERST_TOP_INFO.REQUEST](_, { apply, put, select }) {
      try {
        const authUser = yield select(getAuthUser) || '';
        const funid = authUser ? yield select(getAuthUserFunid) : '';
        const Key = 'commodityKey';
        const appId = '3';
        const method = 'fun.adverst.top';
        const charset = 'utf-8';
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const version = '1.0';

        const pagesize = '14';
        const currentpage = '1';

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

        const response = yield apply(buyoo, buyoo.getAdverstTopInfo, [
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
          yield put(getAdverstTopInfoFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(getAdverstTopInfoFetchSuccess(response.result));
          // dispatchEvent('tcy', {
          //   title: 'cccc',
          //   params: {
          //     a: 'haha',
          //   },
          // });
        }
      } catch (err) {
        // yield put(getAdverstTopInfoFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [GET_ADVERST_TOP_INFO.CLEAR]() {
      return {
        ...initState,
      };
    },
    [GET_ADVERST_TOP_INFO.SUCCESS](
      state,
      {
        payload: { items },
      },
    ) {
      return {
        ...state,
        loading: false,
        loaded: true,
        items,
      };
    },
    [GET_ADVERST_TOP_INFO.FAILURE](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    },
  },
};

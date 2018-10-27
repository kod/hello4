import moment from 'moment';
import buyoo from '@/services/api';
// import { getAuthUserFunid, getAuthUser } from '@/common/selectors';
import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { GETADVERSTTOPINFO } from '@/common/constants';
import { GET_ADVERST_TOP_INFO } from '@/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default {
  namespace: GETADVERSTTOPINFO,

  state: initState,

  effects: {
    *[GET_ADVERST_TOP_INFO.REQUEST](_, { apply }) {
      try {
        // const authUser = '';
        const funid = '';
        // const authUser = yield select(getAuthUser) || '';
        // const funid = authUser ? yield select(getAuthUserFunid) : '';
        const Key = 'commodityKey';
        const appId = '3';
        const method = 'fun.adverst.top';
        const charset = 'utf-8';
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
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
        console.log(response);

        // if (response.code !== 10000) {
        //   yield put(getAdverstTopInfoFetchFailure());
        //   yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        // } else {
        //   yield put(getAdverstTopInfoFetchSuccess(response.result));
        // }
      } catch (err) {
        console.log(err);
        // yield put(getAdverstTopInfoFetchFailure());
        // yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    clear() {
      return {
        ...initState,
      };
    },
    success(
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
    failure(state) {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    },
  },
};

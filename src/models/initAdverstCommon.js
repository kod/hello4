/* eslint-disable camelcase */
import dayjs from 'dayjs';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { INITADVERSTCOMMON_NAMESPACE } from '@/common/constants';
import { INIT_ADVERST_COMMON } from '@/common/constants/actionTypes';
import {
  initAdverstCommonFetchSuccess,
  initAdverstCommonFetchFailure,
} from '@/common/actions/initAdverstCommon';
import { addError } from '@/common/actions/error';
import { getAuthUserFunid, getAuthUser } from '@/common/selectors';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
  currentpage: 0,
  totalpage: 0,
};

export default {
  namespace: INITADVERSTCOMMON_NAMESPACE,

  state: initState,

  effects: {
    *[INIT_ADVERST_COMMON.REQUEST](action, { apply, put, select }) {
      const { pagesize, currentpage } = action.payload;
      const authUser = yield select(getAuthUser) || '';
      const funid = authUser ? yield select(getAuthUserFunid) : '';

      try {
        const Key = 'commodityKey';
        const appId = '3';
        const method = 'fun.commodity.initAdverstCommon';
        const charset = 'utf-8';
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const version = '2.0';

        const signType = signTypeMD5(appId, method, charset, Key, true);

        const encrypt = encryptMD5(
          [
            {
              key: 'pagesize',
              value: pagesize,
            },
            {
              key: 'currentpage',
              value: currentpage,
            },
            {
              key: 'funid',
              value: funid,
            },
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.initAdverstCommon, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            pagesize,
            currentpage,
            funid,
          },
        ]);

        const { result, msg, code } = response;

        if (code !== 10000) {
          yield put(initAdverstCommonFetchFailure());
          yield put(addError(`msg: ${msg}; code: ${code}`));
        } else {
          yield put(
            initAdverstCommonFetchSuccess(
              result.data,
              result.totalpage,
              result.currentpage,
            ),
          );
        }
      } catch (err) {
        console.log(err);
        yield put(initAdverstCommonFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [INIT_ADVERST_COMMON.CLEAR]() {
      return {
        ...initState,
      };
    },
    [INIT_ADVERST_COMMON.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        items: [...state.items, ...action.payload.items],
        currentpage: action.payload.currentpage,
        totalpage: action.payload.totalpage,
      };
    },
    [INIT_ADVERST_COMMON.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
  },
};

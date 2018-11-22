import dayjs from 'dayjs';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { GETSQUARESINFO_NAMESPACE } from '@/common/constants';
import { GET_SQUARES_INFO } from '@/common/constants/actionTypes';
import {
  getSquaresInfoFetchSuccess,
  getSquaresInfoFetchFailure,
} from '@/common/actions/getSquaresInfo';
import { addError } from '@/common/actions/error';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  totalsize: 0,
  totalpage: 0,
  pagesize: 0,
  currentpage: 0,
  items: [],
};

export default {
  namespace: GETSQUARESINFO_NAMESPACE,

  state: initState,

  effects: {
    *[GET_SQUARES_INFO.REQUEST](action, { apply, put }) {
      try {
        const { pagesize = 10, currentpage = 1 } = action.payload;

        const funid = '';

        const Key = 'commodityKey';
        const appId = '3';
        const method = 'fun.index.squares';
        const charset = 'utf-8';
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const version = '2.0';

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

        const response = yield apply(buyoo, buyoo.getSquaresInfo, [
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
          yield put(getSquaresInfoFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(
            getSquaresInfoFetchSuccess({
              squareinfo: response.result.squareinfo,
              totalsize: response.result.totalsize,
              totalpage: response.result.totalpage,
              pagesize: response.result.pagesize,
              currentpage: response.result.currentpage,
            }),
          );
        }
      } catch (err) {
        yield put(getSquaresInfoFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [GET_SQUARES_INFO.CLEAR]() {
      return {
        ...initState,
      };
    },
    [GET_SQUARES_INFO.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.squareinfo,
        totalsize: action.payload.totalsize,
        totalpage: action.payload.totalpage,
        pagesize: action.payload.pagesize,
        currentpage: action.payload.currentpage,
      };
    },
    [GET_SQUARES_INFO.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
  },
};

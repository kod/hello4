/* eslint-disable camelcase */
import moment from 'moment';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { GETNEWESTINFO_NAMESPACE } from '@/common/constants';
import { GET_NEWEST_INFO } from '@/common/constants/actionTypes';
import {
  getNewestInfoFetchSuccess,
  getNewestInfoFetchFailure,
} from '@/common/actions/getNewestInfo';
import { addError } from '@/common/actions/error';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default {
  namespace: GETNEWESTINFO_NAMESPACE,

  state: initState,

  effects: {
    *[GET_NEWEST_INFO.REQUEST](action, { apply, put }) {
      const {
        type_id = '0',
        classfy_id = '0',
        position = '3',
        pagesize = '8',
        currentPage = '1',
      } = action.payload;
      try {
        const Key = 'commodityKey';
        const appId = '3';
        const method = 'fun.newest.query';
        const charset = 'utf-8';
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        const version = '1.0';

        const signType = signTypeMD5(appId, method, charset, Key, false);

        const encrypt = encryptMD5(
          [
            {
              key: 'type_id',
              value: type_id,
            },
            {
              key: 'classfy_id',
              value: classfy_id,
            },
            {
              key: 'position',
              value: position,
            },
            {
              key: 'pagesize',
              value: pagesize,
            },
            {
              key: 'currentPage',
              value: currentPage,
            },
          ],
          Key,
        );

        let response = yield apply(buyoo, buyoo.getNewestInfo, [
          {
            appId,
            method,
            charset,
            signType,
            encrypt,
            timestamp,
            version,
            type_id,
            classfy_id,
            position,
            pagesize,
            currentPage,
          },
        ]);

        response = {
          ...response,
          details: response.details.map(val => {
            val.price = val.maxprice;
            return val;
          }),
        };

        if (response.code !== 10000) {
          yield put(getNewestInfoFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(getNewestInfoFetchSuccess(response.details));
        }
      } catch (err) {
        yield put(getNewestInfoFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [GET_NEWEST_INFO.CLEAR]() {
      return {
        ...initState,
      };
    },
    [GET_NEWEST_INFO.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
      };
    },
    [GET_NEWEST_INFO.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
  },
};

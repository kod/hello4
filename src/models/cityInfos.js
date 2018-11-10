import moment from 'moment';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { CITYINFOS_NAMESPACE } from '@/common/constants';
import { CITY_INFOS } from '@/common/constants/actionTypes';
import {
  cityInfosFetchSuccess,
  cityInfosFetchFailure,
} from '@/common/actions/cityInfos';
import { addError } from '@/common/actions/error';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  division2nd: [],
  division3rd: [],
  division4th: [],
};

export default {
  namespace: CITYINFOS_NAMESPACE,

  state: initState,

  effects: {
    *[CITY_INFOS.REQUEST](action, { apply, put }) {
      try {
        const { pid, level } = action.payload;

        const Key = 'userKey';
        const appId = '3';
        const method = 'fun.uc.getCityInfos';
        const charset = 'utf-8';
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        const version = '2.0';

        const signType = signTypeMD5(appId, method, charset, Key, true);

        const encrypt = encryptMD5(
          [
            {
              key: 'pid',
              value: pid,
            },
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.getCityInfos, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            pid,
          },
        ]);

        if (response.code !== 10000) {
          yield put(cityInfosFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(cityInfosFetchSuccess(response.details, level));
        }
      } catch (err) {
        yield put(cityInfosFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [CITY_INFOS.CLEAR]() {
      return {
        ...initState,
      };
    },
    [CITY_INFOS.REQUEST](state, action) {
      return {
        ...state,
        [action.payload.level]: [],
        loading: true,
      };
    },
    [CITY_INFOS.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        [action.payload.level]: action.payload.items,
      };
    },
    [CITY_INFOS.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
  },
};

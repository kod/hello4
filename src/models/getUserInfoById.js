import buyoo from '@/services/api';

import { encryptMD5, o } from '@/utils/AuthEncrypt';
import { GETUSERINFOBYID_NAMESPACE, BUYOO } from '@/common/constants';
import { GET_USERINFO_BYID } from '@/common/constants/actionTypes';
import {
  getUserInfoByIdFetchSuccess,
  getUserInfoByIdFetchFailure,
} from '@/common/actions/getUserInfoById';
import { addError } from '@/common/actions/error';
import { b } from '@/utils';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  item: {},
};

export default {
  namespace: GETUSERINFOBYID_NAMESPACE,

  state: initState,

  effects: {
    *[GET_USERINFO_BYID.REQUEST](action, { apply, put }) {
      try {
        const funid = o(b, BUYOO).result;

        const Key = 'userKey';
        const provider = '3';

        const encrypt = encryptMD5(
          [
            {
              key: 'provider',
              value: provider,
            },
            {
              key: 'id',
              value: funid,
            },
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.getUserInfoById, [
          {
            provider,
            id: funid,
            encryption: encrypt,
          },
        ]);

        if (response.status !== 10000) {
          yield put(getUserInfoByIdFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(getUserInfoByIdFetchSuccess(response.details));
        }
      } catch (err) {
        yield put(getUserInfoByIdFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [GET_USERINFO_BYID.CLEAR]() {
      return {
        ...initState,
      };
    },
    [GET_USERINFO_BYID.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        item: {
          ...action.payload.item,
          // userType: 2,
        },
      };
    },
    [GET_USERINFO_BYID.FAILURE](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    },
  },
};

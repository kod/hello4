import dayjs from 'dayjs';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { CARDQUERY_NAMESPACE } from '@/common/constants';
import { CARD_QUERY } from '@/common/constants/actionTypes';
import {
  cardQueryFetchSuccess,
  cardQueryFetchFailure,
} from '@/common/actions/cardQuery';
import { addError } from '@/common/actions/error';
import { getAuthUserFunid } from '@/common/selectors';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  item: {},
};

export default {
  namespace: CARDQUERY_NAMESPACE,

  state: initState,

  effects: {
    *[CARD_QUERY.REQUEST](_, { apply, put, select }) {
      try {
        const funid = yield select(getAuthUserFunid);

        const Key = 'userKey';
        const appId = '3';
        const method = 'fun.user.card.query';
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
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.cardQuery, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            funid,
          },
        ]);

        if (response.code !== 10000) {
          yield put(cardQueryFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          // yield put(cardQueryFetchSuccess(response.result));
          yield put(
            cardQueryFetchSuccess({
              ...response.result,
              // username: 'Nguyễn Thị Ban',
              // availableBalance: 7000000,
              // status: 0,
              // availableBalance: 8000000,
              // availableBalance: 7990000,
              // availableBalance: 7989999,
              // availableBalance: 3995001,
              // availableBalance: 3995000,
              // availableBalance: 3994999,
            }),
          );
        }
      } catch (err) {
        yield put(cardQueryFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [CARD_QUERY.CLEAR]() {
      return {
        ...initState,
      };
    },
    [CARD_QUERY.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.payload.item,
      };
    },
    [CARD_QUERY.FAILURE](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    },
  },
};

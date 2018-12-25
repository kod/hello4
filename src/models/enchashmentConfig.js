import buyoo from '@/services/api';

import { ENCHASHMENT_CONFIG_NAMESPACE } from '@/common/constants';
import { ENCHASHMENT_CONFIG } from '@/common/constants/actionTypes';
import {
  enchashmentConfigFetchSuccess,
  enchashmentConfigFetchFailure,
} from '@/common/actions/enchashmentConfig';
import { addError } from '@/common/actions/error';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  limit: null,
  feeRate: null,
};

export default {
  namespace: ENCHASHMENT_CONFIG_NAMESPACE,

  state: initState,

  effects: {
    *[ENCHASHMENT_CONFIG.REQUEST](action, { apply, put }) {
      try {
        const response = yield apply(buyoo, buyoo.enchashmentConfig, [{}]);
        yield put(
          enchashmentConfigFetchSuccess(response.feeRate, response.limit),
        );
      } catch (err) {
        yield put(enchashmentConfigFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [ENCHASHMENT_CONFIG.CLEAR]() {
      return {
        ...initState,
      };
    },
    [ENCHASHMENT_CONFIG.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        limit: action.payload.limit,
        feeRate: action.payload.feeRate,
      };
    },
    [ENCHASHMENT_CONFIG.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
  },
};

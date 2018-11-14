/* eslint-disable camelcase */
import moment from 'moment';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { ADDEVALUATION_NAMESPACE } from '@/common/constants';
import { ADD_EVALUATION } from '@/common/constants/actionTypes';
import {
  addEvaluationFetchSuccess,
  addEvaluationFetchFailure,
} from '@/common/actions/addEvaluation';
import { addError } from '@/common/actions/error';
import { getAuthUserMsisdn, getAuthUserFunid } from '@/common/selectors';
import { dispatchEvent } from '@/utils';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
};

export default {
  namespace: ADDEVALUATION_NAMESPACE,

  state: initState,

  effects: {
    *[ADD_EVALUATION.REQUEST](action, { apply, put, select }) {
      const msisdn = yield select(getAuthUserMsisdn);
      const funid = yield select(getAuthUserFunid);

      try {
        const { trade_no, order_no, comments, screen } = action.payload;

        const Key = 'commodityKey';
        const appId = '3';
        const method = 'fun.evaluation.add';
        const charset = 'utf-8';
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        const version = '2.0';

        const signType = signTypeMD5(appId, method, charset, Key, false);

        const encrypt = encryptMD5(
          [
            {
              key: 'funid',
              value: funid,
            },
            {
              key: 'msisdn',
              value: msisdn,
            },
            {
              key: 'username',
              value: msisdn,
            },
            {
              key: 'trade_no',
              value: trade_no,
            },
            {
              key: 'order_no',
              value: order_no,
            },
            {
              key: 'comments',
              value: comments,
            },
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.addEvaluation, [
          {
            appId,
            method,
            charset,
            signType,
            encrypt,
            timestamp,
            version,
            funid,
            msisdn,
            username: msisdn,
            trade_no,
            order_no,
            comments,
          },
        ]);

        if (response.code !== 10000) {
          yield put(addEvaluationFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(addEvaluationFetchSuccess());
          dispatchEvent(screen, {
            method: 'addEvaluation',
            params: {},
          });
          // yield apply(DeviceEventEmitter, DeviceEventEmitter.emit, [screen]);
        }
      } catch (err) {
        yield put(addEvaluationFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [ADD_EVALUATION.CLEAR]() {
      return {
        ...initState,
      };
    },
    [ADD_EVALUATION.SUCCESS](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    },
    [ADD_EVALUATION.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
  },
};

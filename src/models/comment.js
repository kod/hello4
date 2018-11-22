import dayjs from 'dayjs';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { COMMENT_NAMESPACE } from '@/common/constants';
import { COMMENT } from '@/common/constants/actionTypes';
import {
  commentFetchSuccess,
  commentFetchFailure,
} from '@/common/actions/comment';
import { addError } from '@/common/actions/error';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: {},
};

export default {
  namespace: COMMENT_NAMESPACE,

  state: initState,

  effects: {
    *[COMMENT.REQUEST](action, { apply, put }) {
      try {
        const { brand_id: brandId } = action.payload;

        const msisdn = '';
        const pagesize = '4';
        const currentpage = '1';

        const Key = 'commodityKey';
        const appId = '3';
        const method = 'fun.evaluation.query';
        const charset = 'utf-8';
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const version = '1.0';

        const signType = signTypeMD5(appId, method, charset, Key, false);

        const encrypt = encryptMD5(
          [
            {
              key: 'brand_id',
              value: brandId,
            },
            {
              key: 'msisdn',
              value: msisdn,
            },
            {
              key: 'pagesize',
              value: pagesize,
            },
            {
              key: 'currentPage',
              value: currentpage,
            },
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.getEvaluationInfo, [
          {
            appId,
            method,
            charset,
            signType,
            encrypt,
            timestamp,
            version,
            brand_id: brandId,
            msisdn,
            pagesize,
            currentPage: currentpage,
          },
        ]);

        if (response.code !== 10000) {
          yield put(commentFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          const responseEdited = {
            ...response,
            detail: response.detail.map(val => {
              val.imageUrls =
                val.imageUrls === '' ? [] : val.imageUrls.split('|');
              val.updateTime = val.updateTime.slice(0, 10);
              return val;
            }),
          };
          yield put(commentFetchSuccess(responseEdited));
        }
      } catch (err) {
        yield put(commentFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [COMMENT.CLEAR]() {
      return {
        ...initState,
      };
    },
    [COMMENT.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
      };
    },
    [COMMENT.FAILURE](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    },
  },
};

import buyoo from '@/services/api';
// import { Modal } from 'antd-mobile';
// import { formatMessage } from 'umi/locale';
// import router from 'umi/router';

import { encryptMD5, signTypeMD5, o } from '@/utils/AuthEncrypt';
import { OAUTH_REQUEST_NAMESPACE, BUYOO } from '@/common/constants';
import { OAUTH_REQUEST } from '@/common/constants/actionTypes';
import {
  oauthRequestFetchSuccess,
  oauthRequestFetchFailure,
} from '@/common/actions/oauthRequest';
import { addError } from '@/common/actions/error';
import { localStorageGetItem, dispatchEvent } from '@/utils';
import dayjs from 'dayjs';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
};

export default {
  namespace: OAUTH_REQUEST_NAMESPACE,

  state: initState,

  effects: {
    *[OAUTH_REQUEST.REQUEST](action, { apply, put }) {
      try {
        const {
          oauthtype = '',
          oauthid = '',
          oauthstr = '',
          accesstoken = '',
          nickname = '',
          avatar = '',
          screen = '',
        } = action.payload;

        const funid = o(localStorageGetItem, BUYOO).result;

        const Key = 'userKey';
        const appId = '3';
        const method = 'fun.oauth.request';
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
              key: 'oauthtype',
              value: oauthtype,
            },
            {
              key: 'oauthid',
              value: oauthid,
            },
            {
              key: 'oauthstr',
              value: oauthstr,
            },
            {
              key: 'accesstoken',
              value: accesstoken,
            },
            {
              key: 'nickname',
              value: nickname,
            },
            {
              key: 'avatar',
              value: avatar,
            },
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.oauthRequest, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            funid,
            oauthtype,
            oauthid,
            oauthstr,
            accesstoken,
            nickname,
            avatar,
          },
        ]);

        if (response.code !== 10000) {
          yield put(oauthRequestFetchFailure());
          yield put(addError(response.msg));
        } else {
          yield put(oauthRequestFetchSuccess(response, screen));
        }
      } catch (err) {
        yield put(oauthRequestFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
    *[OAUTH_REQUEST.SUCCESS](action, { put }) {
      try {
        const { response, screen } = action.payload;

        if (screen) {
          dispatchEvent(screen, {
            method: 'oauthRequest',
            params: {
              response,
            },
          });
        } else {
          // Modal.alert('', formatMessage({ id: 'signUpSuccessfully' }), [
          //   {
          //     text: formatMessage({ id: 'confirm' }),
          //     onPress: () => router.go(-3),
          //     style: 'default',
          //   },
          // ]);
        }
      } catch (error) {
        yield put(addError(typeof err === 'string' ? error : error.toString()));
      }
    },
  },

  reducers: {
    [OAUTH_REQUEST.CLEAR]() {
      return {
        ...initState,
      };
    },
    [OAUTH_REQUEST.SUCCESS](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    },
    [OAUTH_REQUEST.FAILURE](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    },
  },
};

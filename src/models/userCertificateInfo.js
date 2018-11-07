import moment from 'moment';

import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { USERCERTIFICATEINFO_NAMESPACE } from '@/common/constants';
import { USER_CERTIFICATE_INFO } from '@/common/constants/actionTypes';
import {
  userCertificateInfoFetchSuccess,
  userCertificateInfoFetchFailure,
} from '@/common/actions/userCertificateInfo';
import { certifiedInformationFetchSuccess } from '@/common/actions/certifiedInformation';

import { addError } from '@/common/actions/error';
import { getAuthUserFunid } from '@/common/selectors';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  certUser: null,
};

export default {
  namespace: USERCERTIFICATEINFO_NAMESPACE,

  state: initState,

  effects: {
    *[USER_CERTIFICATE_INFO.REQUEST](action, { apply, put, select }) {
      try {
        const funid = yield select(getAuthUserFunid);

        const Key = 'userKey';
        const appId = '3';
        const method = 'fun.uc.userviewdetail';
        const charset = 'utf-8';
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        const version = '1.0';

        const msisdn = '';

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
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.userCertificateInfo, [
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
          },
        ]);

        let result = {};

        if (response.code === 10000) {
          result = response;
        }

        yield put(userCertificateInfoFetchSuccess(result));
        yield put(certifiedInformationFetchSuccess(result));

        // switch (type) {
        //   case 'userCertificateInfo':
        //     yield put(userCertificateInfoFetchSuccess(result));
        //     break;

        //   case 'certifiedInformation':
        //     yield put(certifiedInformationFetchSuccess(result));
        //     break;

        //   default:
        //     yield put(userCertificateInfoFetchSuccess(result));
        //     break;
        // }
      } catch (err) {
        yield put(userCertificateInfoFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [USER_CERTIFICATE_INFO.CLEAR]() {
      return {
        ...initState,
      };
    },
    [USER_CERTIFICATE_INFO.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        certUser: action.payload.certUser,
      };
    },
    [USER_CERTIFICATE_INFO.FAILURE](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    },
  },
};

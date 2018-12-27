/* eslint-disable camelcase */
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  userAddDetailInfoFetchSuccess,
  userAddDetailInfoFetchFailure,
} from '@/common/actions/userAddDetailInfo';
import { addError } from '@/common/actions/error';
import buyoo from '@/services/api';
import {
  ADD_DETAIL_INFO,
  // ADD_DETAIL_INFO,
} from '@/common/constants/actionTypes';
import { encryptMD5, signTypeMD5, o } from '@/utils/AuthEncrypt';
import { getCertifiedInformationCertUser } from '@/common/selectors';
import { localStorageGetItem, dispatchEvent } from '@/utils';
import { BUYOO } from '../constants';
// import i18n from '@/common/helpers/i18n';

export function* userAddDetailInfoFetchWatchHandle(action) {
  const {
    usernameP,
    bank_name,
    bank_deposit,
    bank_card_no,
    screen = '',
  } = action.payload;

  try {
    const funid = o(localStorageGetItem, BUYOO).result;
    const certifiedInformationCertUser = yield select(
      getCertifiedInformationCertUser,
    );
    const {
      sex,
      identification,
      address,
      email,
      collegename,
      collegeaddr,
      department,
      specialty,
      degree = '',
      connectusername1,
      connectusermsisdn1,
      connectuserrelation1,
      connectuseridentification1,
      connectusername2,
      connectusermsisdn2,
      connectuserrelation2,
      connectuseridentification2,
      connectusername3,
      connectusermsisdn3,
      connectuserrelation3,
      connectuseridentification3,
      headimage,
    } = certifiedInformationCertUser;

    let {
      username,
      admissiontime,
      graduationtime,
      birthday,
    } = certifiedInformationCertUser;

    username = usernameP || username;

    birthday = birthday
      ? `${birthday.slice(6, 10)}-${birthday.slice(3, 5)}-${birthday.slice(
          0,
          2,
        )}`
      : '';
    admissiontime = admissiontime
      ? `${admissiontime.slice(6, 10)}-${admissiontime.slice(
          3,
          5,
        )}-${admissiontime.slice(0, 2)} 11:11:11`
      : '';
    graduationtime = graduationtime
      ? `${graduationtime.slice(6, 10)}-${graduationtime.slice(
          3,
          5,
        )}-${graduationtime.slice(0, 2)} 11:11:11`
      : '';

    const Key = 'userKey';
    const appId = '3';
    const method = 'fun.uc.useradddetail';
    const charset = 'utf-8';
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';

    const signType = signTypeMD5(appId, method, charset, Key, false);

    const encrypt = encryptMD5(
      [
        {
          key: 'username',
          value: username,
        },
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'birthday',
          value: birthday,
        },
        {
          key: 'identification',
          value: identification,
        },
        {
          key: 'address',
          value: address,
        },
        {
          key: 'email',
          value: email,
        },
        {
          key: 'connectusername1',
          value: connectusername1,
        },
        {
          key: 'connectusermsisdn1',
          value: connectusermsisdn1,
        },
        {
          key: 'connectuserrelation1',
          value: connectuserrelation1,
        },
        {
          key: 'connectuseridentification1',
          value: connectuseridentification1,
        },
        {
          key: 'connectusername2',
          value: connectusername2,
        },
        {
          key: 'connectusermsisdn2',
          value: connectusermsisdn2,
        },
        {
          key: 'connectuserrelation2',
          value: connectuserrelation2,
        },
        {
          key: 'connectuseridentification2',
          value: connectuseridentification2,
        },
        {
          key: 'connectusername3',
          value: connectusername3,
        },
        {
          key: 'connectusermsisdn3',
          value: connectusermsisdn3,
        },
        {
          key: 'connectuserrelation3',
          value: connectuserrelation3,
        },
        {
          key: 'connectuseridentification3',
          value: connectuseridentification3,
        },
        {
          key: 'collegeaddr',
          value: collegeaddr,
        },
        {
          key: 'collegename',
          value: collegename,
        },
        {
          key: 'degree',
          value: degree,
        },
        {
          key: 'headimage',
          value: headimage,
        },
        {
          key: 'sex',
          value: sex,
        },
        {
          key: 'department',
          value: department,
        },
        {
          key: 'specialty',
          value: specialty,
        },
        {
          key: 'admissiontime',
          value: admissiontime,
        },
        {
          key: 'graduationtime',
          value: graduationtime,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.userAddDetailInfo, [
      {
        appId,
        method,
        charset,
        signType,
        encrypt,
        timestamp,
        version,
        username,
        funid,
        birthday,
        identification,
        address,
        email,
        connectusername1,
        connectusermsisdn1,
        connectuserrelation1,
        connectuseridentification1,
        connectusername2,
        connectusermsisdn2,
        connectuserrelation2,
        connectuseridentification2,
        connectusername3,
        connectusermsisdn3,
        connectuserrelation3,
        connectuseridentification3,
        collegeaddr,
        collegename,
        degree,
        headimage,
        sex,
        department,
        specialty,
        admissiontime,
        graduationtime,
        bank_name,
        bank_deposit,
        bank_card_no,
      },
    ]);

    if (response.code !== 10000) {
      yield put(userAddDetailInfoFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(userAddDetailInfoFetchSuccess(screen));
    }
  } catch (err) {
    yield put(userAddDetailInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* userAddDetailInfoSuccessWatchHandle(action) {
  const { screen } = action.payload;
  try {
    if (screen) {
      yield dispatchEvent(screen, {
        method: 'userAddDetailInfo',
        params: {},
      });
    }
  } catch (error) {
    console.warn(error);
  }
}

export function* userAddDetailInfoFetchWatch() {
  yield takeEvery(ADD_DETAIL_INFO.REQUEST, userAddDetailInfoFetchWatchHandle);
}

export function* userAddDetailInfoSuccessWatch() {
  yield takeEvery(ADD_DETAIL_INFO.SUCCESS, userAddDetailInfoSuccessWatchHandle);
}

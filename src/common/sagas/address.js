import { Platform, DeviceEventEmitter } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
// import { SCREENS } from '@/common/constants';
import {
  addressFetch,
  addressFetchSuccess,
  addressFetchFailure,
  addressAddSuccess,
  addressAddFailure,
  addressRemoveSuccess,
  addressRemoveFailure,
  addressModifySuccess,
  addressModifyFailure,
} from '@/common/actions/address';
import { addError } from '@/common/actions/error';
import buyoo from '@/common/helpers/apiClient';
import {
  ADDRESS,
  ADDRESS_ADD,
  ADDRESS_REMOVE,
  ADDRESS_MODIFY,
} from '@/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@/components/AuthEncrypt';

import { getAuthUserFunid, getAuthUserMsisdn } from '@/common/selectors';

export function* addressFetchWatchHandle(/* action */) {
  try {
    const funid = yield select(getAuthUserFunid);
    const msisdn = yield select(getAuthUserMsisdn);

    const Key = 'userKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.uc.userviewaddr';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';

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
    const response = yield apply(buyoo, buyoo.userViewAddr, [
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

    if (response.code !== 10000) {
      yield put(addressFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      let addressSelectedId = 0;

      for (let index = 0; index < response.details.length; index += 1) {
        const element = response.details[index];
        if (element.isdefault === 'Y') addressSelectedId = element.id;
      }

      yield put(addressFetchSuccess(response.details, addressSelectedId));
    }
  } catch (err) {
    yield put(addressFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* addressAddFetchWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);

    const {
      msisdn,
      address,
      isdefault,
      username,
      division1st = 1,
      division2nd = 0,
      division3rd = 0,
      division4th = 0,
      division5th = 0,
      division6th = 0,
      screen,
    } = action.payload;

    const Key = 'userKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.uc.useraddaddr';
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
          key: 'address',
          value: address,
        },
        {
          key: 'isdefault',
          value: isdefault,
        },
        {
          key: 'username',
          value: username,
        },
        {
          key: 'division1st',
          value: division1st,
        },
        {
          key: 'division2nd',
          value: division2nd,
        },
        {
          key: 'division3rd',
          value: division3rd,
        },
        {
          key: 'division4th',
          value: division4th,
        },
        {
          key: 'division5th',
          value: division5th,
        },
        {
          key: 'division6th',
          value: division6th,
        },
      ],
      Key,
    );
    const response = yield apply(buyoo, buyoo.useraddaddr, [
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
        address,
        isdefault,
        username,
        division1st,
        division2nd,
        division3rd,
        division4th,
        division5th,
        division6th,
      },
    ]);

    if (response.code !== 10000) {
      yield put(addressAddFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(addressAddSuccess(screen));
    }
  } catch (err) {
    yield put(addressAddFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* addressAddSuccessWatchHandle(action) {
  const { screen } = action.payload;
  try {
    yield put(addressFetch());
    yield apply(DeviceEventEmitter, DeviceEventEmitter.emit, [screen]);
  } catch (err) {
    console.log(err);
  }
}

export function* addressRemoveWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);
    const { adds } = action.payload;

    const Key = 'userKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.uc.userDelAddrs';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'adds',
          value: adds,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.userDelAddrs, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        adds,
      },
    ]);

    if (response.code !== 10000) {
      yield put(addressRemoveFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(addressRemoveSuccess());
    }
  } catch (err) {
    yield put(addressRemoveFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* addressRemoveSuccessWatchHandle() {
  try {
    yield put(addressFetch());
  } catch (err) {
    console.log(err);
  }
}

export function* addressModifyWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);

    const {
      addrid,
      msisdn,
      address,
      isdefault,
      username,
      division1st = 1,
      division2nd = 0,
      division3rd = 0,
      division4th = 0,
      division5th = 0,
      division6th = 0,
    } = action.payload;

    const Key = 'userKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.uc.usermodifyaddr';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, false);

    const encrypt = encryptMD5(
      [
        {
          key: 'addrid',
          value: addrid,
        },
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'msisdn',
          value: msisdn,
        },
        {
          key: 'address',
          value: address,
        },
        {
          key: 'isdefault',
          value: isdefault,
        },
        {
          key: 'username',
          value: username,
        },
        {
          key: 'division1st',
          value: division1st,
        },
        {
          key: 'division2nd',
          value: division2nd,
        },
        {
          key: 'division3rd',
          value: division3rd,
        },
        {
          key: 'division4th',
          value: division4th,
        },
        {
          key: 'division5th',
          value: division5th,
        },
        {
          key: 'division6th',
          value: division6th,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.userModifyAddr, [
      {
        appId,
        method,
        charset,
        signType,
        encrypt,
        timestamp,
        version,
        addrid,
        funid,
        msisdn,
        address,
        isdefault,
        username,
        division1st,
        division2nd,
        division3rd,
        division4th,
        division5th,
        division6th,
      },
    ]);

    if (response.code !== 10000) {
      yield put(addressModifyFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(addressModifySuccess());
    }
  } catch (err) {
    yield put(addressModifyFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* addressModifySuccessWatchHandle() {
  try {
    yield put(addressFetch(true));
    // Alert.alert(
    //   '',
    //   i18n.success,
    //   [
    //     {
    //       text: i18n.confirm,
    //       onPress: () => {},
    //     },
    //   ],
    //   // { cancelable: false },
    // );
  } catch (err) {
    console.log(err);
  }
}

export function* addressFetchWatch() {
  yield takeEvery(ADDRESS.REQUEST, addressFetchWatchHandle);
}

export function* addressAddFetchWatch() {
  yield takeEvery(ADDRESS_ADD.REQUEST, addressAddFetchWatchHandle);
}

export function* addressAddSuccessWatch() {
  yield takeEvery(ADDRESS_ADD.SUCCESS, addressAddSuccessWatchHandle);
}

export function* addressRemoveWatch() {
  yield takeEvery(ADDRESS_REMOVE.REQUEST, addressRemoveWatchHandle);
}

export function* addressRemoveSuccessWatch() {
  yield takeEvery(ADDRESS_REMOVE.SUCCESS, addressRemoveSuccessWatchHandle);
}

export function* addressModifyWatch() {
  yield takeEvery(ADDRESS_MODIFY.REQUEST, addressModifyWatchHandle);
}

export function* addressModifySuccessWatch() {
  yield takeEvery(ADDRESS_MODIFY.SUCCESS, addressModifySuccessWatchHandle);
}

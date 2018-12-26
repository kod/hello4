/* eslint-disable no-case-declarations, camelcase, no-shadow */
import { takeEvery, apply, put } from 'redux-saga/effects';
import {
  bannerSwiperFetchSuccess,
  bannerSwiperFetchFailure,
} from '@/common/actions/bannerSwiper';
import { addError } from '@/common/actions/error';
import buyoo from '@/services/api';
import { BANNER_SWIPER } from '@/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import dayjs from 'dayjs';

export function* bannerSwiperFetchWatchHandle(action) {
  const { swiperId } = action.payload;
  try {
    let response = [];
    let item;

    const Key = 'commodityKey';
    const appId = '3';
    const charset = 'utf-8';
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';
    let method = '';
    let type_id = '';
    let classfy_id = '';
    let position = '';
    let pagesize = '';
    let currentPage = '';
    let typeid = '';
    let currentpage = '';

    let signType = '';
    let encrypt = '';

    switch (swiperId) {
      case 'one':
        method = 'fun.adverst.query';
        type_id = '';
        classfy_id = '0';
        position = '2';
        pagesize = '20';
        currentPage = '1';

        signType = signTypeMD5(appId, method, charset, Key, false);

        encrypt = encryptMD5(
          [
            {
              key: 'type_id',
              value: type_id,
            },
            {
              key: 'classfy_id',
              value: classfy_id,
            },
            {
              key: 'position',
              value: position,
            },
            {
              key: 'pagesize',
              value: pagesize,
            },
            {
              key: 'currentPage',
              value: currentPage,
            },
          ],
          Key,
        );

        item = yield apply(buyoo, buyoo.getAdverstInfo, [
          {
            appId,
            method,
            charset,
            signType,
            encrypt,
            timestamp,
            version,
            type_id,
            classfy_id,
            position,
            pagesize,
            currentPage,
          },
        ]);
        response = item.details;
        break;

      case 'two':
        method = 'fun.cellphone.topad';
        typeid = '1';
        pagesize = '5';
        currentpage = '1';

        signType = signTypeMD5(appId, method, charset, Key, true);

        encrypt = encryptMD5(
          [
            {
              key: 'typeid',
              value: typeid,
            },
            {
              key: 'pagesize',
              value: pagesize,
            },
            {
              key: 'currentpage',
              value: currentpage,
            },
          ],
          Key,
        );

        item = yield apply(buyoo, buyoo.initTopCellphone, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            typeid,
            pagesize,
            currentpage,
          },
        ]);
        response = item.topadinfo;

        // for (let index = 0; index < item.topadinfo.length; index += 1) {
        //   const element = item.topadinfo[index];
        //   response.push(element.imageUrl);
        // }

        break;

      case 'three':
        method = 'fun.computer.topad';
        typeid = '2';
        pagesize = '5';
        currentpage = '1';

        signType = signTypeMD5(appId, method, charset, Key, true);

        encrypt = encryptMD5(
          [
            {
              key: 'typeid',
              value: typeid,
            },
            {
              key: 'pagesize',
              value: pagesize,
            },
            {
              key: 'currentpage',
              value: currentpage,
            },
          ],
          Key,
        );

        item = yield apply(buyoo, buyoo.initTopComputer, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            typeid,
            pagesize,
            currentpage,
          },
        ]);

        response = item.computerltopadinfo;

        // for (let index = 0; index < item.computerltopadinfo.length; index += 1) {
        //   const element = item.computerltopadinfo[index];
        //   response.push(element.imageUrl);
        // }
        break;

      case 'four':
        method = 'fun.digital.topad';
        typeid = '5';
        pagesize = '5';
        currentpage = '1';

        signType = signTypeMD5(appId, method, charset, Key, true);

        encrypt = encryptMD5(
          [
            {
              key: 'typeid',
              value: typeid,
            },
            {
              key: 'pagesize',
              value: pagesize,
            },
            {
              key: 'currentpage',
              value: currentpage,
            },
          ],
          Key,
        );

        item = yield apply(buyoo, buyoo.initTopDigital, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            typeid,
            pagesize,
            currentpage,
          },
        ]);

        response = item.digitaltopadinfo;

        // for (let index = 0; index < item.digitaltopadinfo.length; index += 1) {
        //   const element = item.digitaltopadinfo[index];
        //   response.push(element.imageUrl);
        // }
        break;

      default:
        break;
    }

    yield put(bannerSwiperFetchSuccess(swiperId, response));
  } catch (err) {
    yield put(bannerSwiperFetchFailure(swiperId));
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* bannerSwiperFetchWatch() {
  yield takeEvery(BANNER_SWIPER.REQUEST, bannerSwiperFetchWatchHandle);
}

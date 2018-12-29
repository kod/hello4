/* eslint-disable camelcase */
// import { normalize } from 'normalizr';
import { takeEvery, apply, put } from 'redux-saga/effects';
import dayjs from 'dayjs';
import {
  productDetailInfoFetchSuccess,
  productDetailInfoFetchFailure,
} from '@src/common/actions/productDetailInfo';
import { addError } from '@src/common/actions/error';
import buyoo from '@src/services/api';
import {
  PRODUCT_DETAIL_INFO,
  PRODUCT_DETAIL_SELECT,
} from '@src/common/constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '@src/utils/AuthEncrypt';
import { dispatchEventBuyoo } from '@src/utils';

export function* productDetailInfoFetchWatchHandle(action) {
  // 获取默认显示商品(库存不为0)
  const getProductDetail = (data, productIdVIP) => {
    let productDetailResult = {};
    let propertiesIdsResult = '';

    Object.keys(data).forEach(val => {
      if (propertiesIdsResult === '') {
        if (productIdVIP) {
          if (data[val].id === parseInt(productIdVIP, 10)) {
            // 有商品id
            productDetailResult = data[val];
            propertiesIdsResult = val;
          }
        } else if (data[val].numbers > 0) {
          productDetailResult = data[val];
          propertiesIdsResult = val;
        }
      }
    });

    return {
      productDetailResult,
      propertiesIdsResult,
    };
  };

  // 属性归类
  const makePropertiesDetail = array => {
    const propertiesArray = [];
    const propertiesObject = {};
    const propertiesObjectForId = {};
    array.forEach(val => {
      if (propertiesArray.indexOf(val.name) === -1)
        propertiesArray.push(val.name);

      propertiesObjectForId[val.id] = val;
      if (propertiesObject[val.name]) {
        // 已存在
        propertiesObject[val.name].push(val);
      } else {
        // 不存在
        propertiesObject[val.name] = [];
        propertiesObject[val.name].push(val);
      }
    });
    return {
      propertiesArray: propertiesArray.sort(),
      propertiesObject,
      propertiesObjectForId,
    };
  };

  // 商品归类
  const roductDetailForPropertiesIds = array => {
    const result = {};
    array.forEach(val => {
      // // 库存大于0才加入列表
      // if (val.numbers > 0)
      result[
        val.propertiesIds
          .split('-')
          .sort()
          .join('-')
      ] = val;
    });
    return result;
  };

  const { brand_id, productIdVIP, screen } = action.payload;

  try {
    const Key = 'commodityKey';
    const appId = '3';
    const method = 'fun.brand.query';
    const charset = 'utf-8';
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.1';

    const signType = signTypeMD5(appId, method, charset, Key, false);

    const encrypt = encryptMD5(
      [
        {
          key: 'brand_id',
          value: brand_id,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.getProductDetailInfo, [
      {
        appId,
        method,
        charset,
        signType,
        encrypt,
        timestamp,
        version,
        brand_id,
      },
    ]);

    if (response.code !== 10000) {
      switch (response.code) {
        case 40004:
          yield put(addError(response.msg));
          break;

        default:
          yield put(productDetailInfoFetchFailure(response.msg));
          break;
      }
    } else {
      const { properties_detail, brand_detail } = response;

      const product_detail = response.product_detail.map(val => {
        val.imageUrls = val.imageUrls.split('|').map(val1 => {
          const result = {};
          result.imageUrl = val1;
          return result;
        });
        val.goodsProperties = val.goodsProperties
          ? val.goodsProperties.split('|')
          : [];
        return val;
      });

      const imageDesc = brand_detail.desc.split('|');

      const productDetailSort = roductDetailForPropertiesIds(product_detail);

      yield put(
        productDetailInfoFetchSuccess({
          product_detail,
          imageDesc,
          ...getProductDetail(productDetailSort, productIdVIP),
          ...makePropertiesDetail(properties_detail),
          productDetailSort,
          screen,
        }),
      );
    }
  } catch (err) {
    yield put(productDetailInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* productDetailInfoFetchWatch() {
  yield takeEvery(
    PRODUCT_DETAIL_INFO.REQUEST,
    productDetailInfoFetchWatchHandle,
  );
}

export function* productDetailInfoSuccessWatchHandle(action) {
  const { screen, detail } = action.payload;
  try {
    yield dispatchEventBuyoo(screen, {
      method: 'productDetailInfo',
      params: {
        ...detail,
      },
    });
  } catch (err) {
    console.warn(err);
  }
}

export function* productDetailInfoSuccessWatch() {
  yield takeEvery(
    PRODUCT_DETAIL_INFO.REQUEST,
    productDetailInfoSuccessWatchHandle,
  );
}

export function* productDetailSelectFetchWatchHandle(action) {
  const { screen, productDetail } = action.payload;
  try {
    yield dispatchEventBuyoo(screen, {
      method: 'productDetailSelect',
      params: {
        ...productDetail,
      },
    });
  } catch (err) {
    console.warn(err);
  }
}

export function* productDetailSelectFetchWatch() {
  yield takeEvery(
    PRODUCT_DETAIL_SELECT.REQUEST,
    productDetailSelectFetchWatchHandle,
  );
}

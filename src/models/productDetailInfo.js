/* eslint-disable camelcase */
import moment from 'moment';
import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { PRODUCTDETAILINFO_NAMESPACE } from '@/common/constants';
import {
  PRODUCT_DETAIL_INFO,
  PRODUCT_DETAIL_SELECT,
  PRODUCT_DETAIL_NUMBER,
  PRODUCT_DETAIL_OPACITY,
} from '@/common/constants/actionTypes';
import {
  productDetailInfoFetchSuccess,
  productDetailInfoFetchFailure,
} from '@/common/actions/productDetailInfo';
import { addError } from '@/common/actions/error';
import { dispatchEvent } from '@/utils';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  isTrue: false,
  msg: '',
  item: {
    propertiesIdsObject: '',
    imageDesc: [],
    imageUrls: [],
    productDetailOpacity: 0,
    productDetailNumber: 1,
    propertiesArray: [],
    propertiesObject: {},
    propertiesObjectForId: {},
    productDetailSort: {},
  },
};

export default {
  namespace: PRODUCTDETAILINFO_NAMESPACE,

  state: initState,

  effects: {
    *[PRODUCT_DETAIL_INFO.REQUEST](action, { apply, put }) {
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
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
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
          yield put(productDetailInfoFetchFailure(response.msg));
        } else {
          const { properties_detail, brand_detail } = response;

          const product_detail = response.product_detail.map(val => {
            val.imageUrls = val.imageUrls.split('|').map(val1 => {
              const result = {};
              result.imageUrl = val1;
              return result;
            });
            val.goodsProperties = val.goodsProperties.split('|');
            return val;
          });

          const imageDesc = brand_detail.desc.split('|');

          const productDetailSort = roductDetailForPropertiesIds(
            product_detail,
          );

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
    },
    *[PRODUCT_DETAIL_INFO.SUCCESS](action) {
      const { screen, detail } = action.payload;
      try {
        yield dispatchEvent(screen, {
          method: 'productDetailInfo',
          params: {
            ...detail,
          },
        });
      } catch (err) {
        console.warn(err);
      }
    },
    *[PRODUCT_DETAIL_SELECT.REQUEST](action) {
      const { screen, productDetail } = action.payload;
      try {
        yield dispatchEvent(screen, {
          method: 'productDetailSelect',
          params: {
            ...productDetail,
          },
        });
      } catch (err) {
        console.warn(err);
      }
    },
  },

  reducers: {
    [PRODUCT_DETAIL_INFO.CLEAR]() {
      return {
        ...initState,
      };
    },
    [PRODUCT_DETAIL_INFO.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        isTrue: true,
        item: {
          ...state.item,
          ...action.payload.detail,
          imageUrls: action.payload.detail.imageUrls,
          propertiesIdsObject: action.payload.propertiesIds,
          imageDesc: action.payload.imageDesc,
          propertiesArray: action.payload.propertiesArray,
          propertiesObject: action.payload.propertiesObject,
          propertiesObjectForId: action.payload.propertiesObjectForId,
          productDetailSort: action.payload.productDetailSort,
        },
      };
    },
    [PRODUCT_DETAIL_INFO.FAILURE](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        isTrue: false,
        msg: action.payload.msg,
      };
    },
    [PRODUCT_DETAIL_SELECT.REQUEST](state, action) {
      return {
        ...state,
        item: {
          ...state.item,
          ...action.payload.productDetail,
          propertiesIdsObject: action.payload.propertiesIdsObject,
        },
      };
    },
    [PRODUCT_DETAIL_NUMBER.REQUEST](state, action) {
      return {
        ...state,
        item: {
          ...state.item,
          productDetailNumber: action.payload.number,
        },
      };
    },
    [PRODUCT_DETAIL_OPACITY.REQUEST](state, action) {
      return {
        ...state,
        item: {
          ...state.item,
          productDetailOpacity: action.payload.opacity,
        },
      };
    },
  },
};

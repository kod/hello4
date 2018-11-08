/* eslint-disable max-len, no-confusing-arrow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */

import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import Schemas from '../constants/schemas';

// const defaultArray = [];
const defaultObject = {};
// const defaultString = '';

export const getAuth = state => state.login;
export const getAuthUser = state => state.login.user;
export const getAuthUserFunid = state => state.login.user.result;
export const getAuthUserMsisdn = state => state.login.user.msisdn;
export const getLang = state => state.i18n.lang;
export const getCart = state => state.cart;
export const getCartItems = state => state.cart.items;
export const getCartDetails = state => state.cart.details;
export const getCartProducts = state => state.cart.products;
export const getProductDetailInfoItem = state => state.productDetailInfo.item;
export const getCollectionItems = state => state.collection.items;
export const getSchoolInfoItems = state => state.schoolInfo.items;
export const getAddressItems = state => state.address.items;
export const getBillByYearItems = state => state.billByYear.items;
export const getSearchMonthItem = state => state.searchMonth.item;
export const getBillActiveYear = state => state.bill.activeYear;
export const getBillActiveMonth = state => state.bill.activeMonth;
export const getBillNowYear = state => state.bill.nowYear;
export const getBillNowMonth = state => state.bill.nowMonth;
export const getAddressSelectedId = state => state.address.addressSelectedId;
export const getCertifiedInformationCertUser = state =>
  state.certifiedInformation.certUser;
export const getQueryOrderListItem = state => state.queryOrderList.item;
export const getQueryOrderListScrollTabIndex = state =>
  state.queryOrderList.scrollTabIndex;

const getProps = (state, props) => props;
const selectEntities = state => state.entities;
const selectProductDetail = state => state.productDetail;
const selectProductDetailInfo = state => state.productDetailInfo;
const selectGetAllProductInfo = state => state.getAllProductInfo;

export const makegetProductDetailInfo = () =>
  createSelector(
    [selectProductDetailInfo, selectEntities, getProps],
    (productDetailInfo, entities, props) => {
      const brandId = props.brandId || props.navigation.state.params.brandId;
      return productDetailInfo[brandId]
        ? denormalize(
            productDetailInfo[brandId].result,
            Schemas.PRODUCTDETAIL,
            entities,
          )
        : defaultObject;
    },
  );

export const makegetProductDetailProperties = () => {
  const getProductDetailInfo = makegetProductDetailInfo();
  return createSelector(
    [getProductDetailInfo, selectProductDetailInfo, getProps],
    (productDetailInfo, productDetailInfoResult, props) => {
      let {
        brandId,
        propertiesIds,
        // propertiesIds,
      } = props.navigation.state.params;
      const { product_detail } = productDetailInfo;
      const result = {
        colorId: 0,
        versionId: 0,
      };
      brandId = props.brandId || brandId;
      propertiesIds = props.propertiesIds || propertiesIds || '';
      propertiesIds =
        propertiesIds ||
        (product_detail && product_detail[0]
          ? product_detail[0].propertiesIds
          : '');
      if (!propertiesIds || !productDetailInfo.product_detail) return result;

      const {
        properties_detail,
        // properties_detail,
      } = productDetailInfo;
      // let colorId = 0;
      // let versionId = 0;
      propertiesIds = propertiesIds.split('-');
      propertiesIds.forEach(id1 => {
        properties_detail.forEach(val1 => {
          const id2 = val1.id;
          if (parseInt(id1, 10) !== id2) return false;
          if (val1.image) {
            result.colorId = id2;
          } else {
            result.versionId = id2;
          }
          return true;
        });
      });
      return result;
    },
  );
};

export const makegetProductDetailItem = () => {
  const getProductDetailInfo = makegetProductDetailInfo();
  return createSelector(
    [getProductDetailInfo, selectProductDetail],
    (productDetailInfo, productDetail) => {
      const { product_detail } = productDetailInfo;
      let result = {};
      const propertiesArray = [];

      if (productDetail.colorId) propertiesArray.push(productDetail.colorId);
      if (productDetail.versionId)
        propertiesArray.push(productDetail.versionId);

      if (!product_detail || !propertiesArray.length) return defaultObject;

      product_detail.forEach(val => {
        const item = propertiesArray.every(
          val1 => val.propertiesIds.indexOf(val1.toString()) !== -1,
        );
        if (item) result = val;
      });
      return result;
    },
  );
};

export const makegetProductDetailColorVersionList = () => {
  const getProductDetailInfo = makegetProductDetailInfo();
  return createSelector([getProductDetailInfo], productDetailInfo => {
    const result = {
      product_color: [],
      product_version: [],
    };
    const { properties_detail } = productDetailInfo;
    if (!properties_detail) return result;

    properties_detail.forEach(val => {
      if (val.image) {
        result.product_color.push(val);
      } else {
        result.product_version.push(val);
      }
    });
    return result;
  });
};

export const getIsCollection = createSelector(
  [getProductDetailInfoItem, getCollectionItems],
  (productDetailInfoItem, collectionItems) => {
    if (!productDetailInfoItem.brandId || !collectionItems.details)
      return false;
    return collectionItems.details.some(
      val => val.brandId === productDetailInfoItem.brandId,
    );
  },
);

export const makegetSchoolName = () =>
  createSelector(
    [getSchoolInfoItems, getCertifiedInformationCertUser],
    (schoolInfoItems, certifiedInformationCertUser) => {
      if (schoolInfoItems.length === 0) return '';
      if (!certifiedInformationCertUser.collegename) return '';
      for (let index = 0; index < schoolInfoItems.length; index += 1) {
        const element = schoolInfoItems[index];
        if (
          element.id === parseInt(certifiedInformationCertUser.collegename, 10)
        )
          return element.name;
      }
      return true;
    },
  );

export const getAddressSelectedItem = createSelector(
  [getAddressItems, getAddressSelectedId],
  (addressItems, addressSelectedId) => {
    if (addressItems.length === 0 || addressSelectedId === 0)
      return defaultObject;
    for (let index = 0; index < addressItems.length; index += 1) {
      const element = addressItems[index];
      if (element.id === addressSelectedId) return element;
    }
    return defaultObject;
  },
);

export const getBillMonthItem = createSelector(
  [getBillByYearItems, getBillActiveYear, getBillActiveMonth],
  (billByYearItems, billActiveYear, billActiveMonth) =>
    billByYearItems[billActiveYear]
      ? billByYearItems[billActiveYear][billActiveMonth - 1]
      : defaultObject,
);

export const getOrderItem = createSelector(
  [getQueryOrderListItem, getQueryOrderListScrollTabIndex],
  (queryOrderListItem, queryOrderListScrollTabIndex) =>
    queryOrderListItem[queryOrderListScrollTabIndex],
);

export const getCartTotalMoney = createSelector(
  [getCartItems, getCartProducts, getCartDetails],
  (items, products, details) => {
    if (items.length === 0) {
      return 0;
    } else if (items.length === 1) {
      return products[items[0]] && products[items[0]].selected
        ? details[products[items[0]].detail].price * products[items[0]].quantity
        : 0;
    } else {
      return items.reduce((a, b, index) => {
        if (index === 1) {
          const aPrice = products[a].selected
            ? details[products[a].detail].price * products[a].quantity
            : 0;
          const bPrice = products[b].selected
            ? details[products[b].detail].price * products[b].quantity
            : 0;
          return aPrice + bPrice;
        } else {
          const bPrice = products[b].selected
            ? details[products[b].detail].price * products[b].quantity
            : 0;
          return a + bPrice;
        }
      });
    }
  },
);

export const getGetAllProductInfoItems = createSelector(
  [selectGetAllProductInfo, selectEntities],
  (getAllProductInfo, entities) =>
    denormalize(
      getAllProductInfo.items,
      Schemas.GETALLPRODUCTINFO_ARRAY,
      entities,
    ),
);

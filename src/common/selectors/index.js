import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import Schemas from '@/common/constants/schemas';
import { localStorageGetItem, getSKey, getSValue } from '@/utils';

// const defaultArray = [];
const defaultObject = {};
// const defaultString = '';

export const getAuth = state => state.login;
export const getAuthUser = state => state.login.user;
export const getAuthUserFunid = state => state.login.user.result;
export const getAuthUserMsisdn = state => state.login.user.msisdn;
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

export const getCartTotalMoney = createSelector(
  [getCartItems, getCartProducts, getCartDetails],
  (items, products, details) => {
    if (items.length === 0) {
      return 0;
    }
    if (items.length === 1) {
      return products[items[0]] && products[items[0]].selected
        ? details[products[items[0]].detail].price * products[items[0]].quantity
        : 0;
    }
    return items.reduce((a, b, index) => {
      if (index === 1) {
        const aPrice = products[a].selected
          ? details[products[a].detail].price * products[a].quantity
          : 0;
        const bPrice = products[b].selected
          ? details[products[b].detail].price * products[b].quantity
          : 0;
        return aPrice + bPrice;
      }
      const bPrice = products[b].selected
        ? details[products[b].detail].price * products[b].quantity
        : 0;
      return a + bPrice;
    });
  },
);

export const getGetAllProductInfoItems = createSelector(
  [selectGetAllProductInfo],
  getAllProductInfo =>
    denormalize(
      getAllProductInfo.items,
      Schemas.GETALLPRODUCTINFO_ARRAY,
      getAllProductInfo.entities,
    ),
);

export const getLoginUser = createSelector(
  [getAuthUser],
  authUser => {
    let result = null;
    // console.log(authUser);
    const SKey = localStorageGetItem(getSKey());
    // console.log(SKey);
    if (authUser && SKey) {
      // 存在key
      if (SKey === getSValue(authUser)) {
        result = authUser;
      }
    }
    // console.log(authUser);
    return result;
  },
);

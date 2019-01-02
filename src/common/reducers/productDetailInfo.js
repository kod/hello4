import {
  PRODUCT_DETAIL_INFO,
  PRODUCT_DETAIL_SELECT,
  PRODUCT_DETAIL_NUMBER,
  PRODUCT_DETAIL_OPACITY,
} from '@src/common/constants/actionTypes';

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

export default (state = initState, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_INFO.CLEAR:
      return {
        ...initState,
      };
    case PRODUCT_DETAIL_INFO.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAIL_INFO.SUCCESS:
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
    case PRODUCT_DETAIL_INFO.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
        isTrue: false,
        msg: action.payload.msg,
        // [action.payload.brand_id]: {
        //   ...state[action.payload.brand_id],
        // },
      };
    case PRODUCT_DETAIL_SELECT.REQUEST:
      return {
        ...state,
        item: {
          ...state.item,
          ...action.payload.productDetail,
          propertiesIdsObject: action.payload.propertiesIdsObject,
        },
      };
    case PRODUCT_DETAIL_NUMBER.REQUEST:
      return {
        ...state,
        item: {
          ...state.item,
          productDetailNumber: action.payload.number,
        },
      };
    case PRODUCT_DETAIL_OPACITY.REQUEST:
      return {
        ...state,
        item: {
          ...state.item,
          productDetailOpacity: action.payload.opacity,
        },
      };
    default:
      return state;
  }
};

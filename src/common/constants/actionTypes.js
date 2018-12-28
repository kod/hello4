import { defineAction } from 'redux-define';
import {
  REQUEST,
  SUCCESS,
  FAILURE,
  CLEAR,
  // CLEAR_ALL,
  ADD,
  // ADD_SUCCESS,
  // ADD_FAILURE,
  REMOVE,
  // REPLACE,
  OPEN,
  CLOSE,
  STOP,
} from '@/common/constants/stateConstants';

const appNamespace = defineAction('buyoo');

export const AUTH_LOGIN = defineAction(
  'AUTH_LOGIN',
  [REQUEST, SUCCESS, FAILURE, STOP],
  appNamespace,
);

export const AUTH_SIGNUP = defineAction(
  'AUTH_SIGNUP',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const AUTH_LOGOUT = defineAction('AUTH_LOGOUT', [SUCCESS], appNamespace);

export const AUTH_REFRESH_ACCESS_TOKEN = defineAction(
  'AUTH_REFRESH_ACCESS_TOKEN',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const AUTH_REHYDRATE = defineAction(
  'AUTH_REHYDRATE',
  [SUCCESS],
  appNamespace,
);

export const AD_DIGITAL = defineAction(
  'AD_DIGITAL',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const ADVERST_INFO = defineAction(
  'ADVERST_INFO',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const GET_ALL_PRODUCT_INFO = defineAction(
  'GET_ALL_PRODUCT_INFO',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const FIND_PRODUCTS = defineAction(
  'FIND_PRODUCTS',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const AD_PHONE = defineAction(
  'AD_PHONE',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const GET_NEWEST_INFO = defineAction(
  'GET_NEWEST_INFO',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const INIT_ADVERST_COMMON = defineAction(
  'INIT_ADVERST_COMMON',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const NEW_COMPUTER = defineAction(
  'NEW_COMPUTER',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const ADD_EVALUATION = defineAction(
  'ADD_EVALUATION',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const TOP_COMPUTER = defineAction(
  'TOP_COMPUTER',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const GET_ADVERST_TOP_INFO = defineAction(
  'GET_ADVERST_TOP_INFO',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const MERGE_GETINFO = defineAction(
  'MERGE_GETINFO',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const MERGE_GETDETAIL = defineAction(
  'MERGE_GETDETAIL',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const MERGE_GETSLAVE = defineAction(
  'MERGE_GETSLAVE',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const MERGE_CHECK = defineAction(
  'MERGE_CHECK',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const MERGE_GETMASTER = defineAction(
  'MERGE_GETMASTER',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const MERGE_GATE = defineAction(
  'MERGE_GATE',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const PROMOTION_INFO = defineAction(
  'PROMOTION_INFO',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const BANNER_SWIPER = defineAction(
  'BANNER_SWIPER',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const BANNER_HOME_RECOMMEND = defineAction(
  'BANNER_HOME_RECOMMEND',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const BANNER_HOME_TYPE = defineAction(
  'BANNER_HOME_TYPE',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const NEWESTINFO = defineAction(
  'NEWESTINFO',
  [REQUEST, SUCCESS, FAILURE, STOP],
  appNamespace,
);

export const USER_CERTIFICATE_INFO = defineAction(
  'USER_CERTIFICATE_INFO',
  [REQUEST, SUCCESS, FAILURE, STOP, CLEAR],
  appNamespace,
);

export const CERTIFIED_INFORMATION = defineAction(
  'CERTIFIED_INFORMATION',
  [REQUEST, SUCCESS, FAILURE, STOP, CLEAR],
  appNamespace,
);

export const CERTIFIED_INFORMATION_EDIT = defineAction(
  'CERTIFIED_INFORMATION_EDIT',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CART = defineAction(
  'CART',
  [REQUEST, SUCCESS, FAILURE, CLEAR, ADD, REMOVE],
  appNamespace,
);

export const CART_ADD = defineAction(
  'CART_ADD',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const OTP = defineAction(
  'OTP',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CHECK_PAY_PASWORD = defineAction(
  'CHECK_PAY_PASWORD',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const MODIFYPAYPASSWORD = defineAction(
  'MODIFYPAYPASSWORD',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const REGISTER = defineAction(
  'REGISTER',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const UPDATE_PERIOD = defineAction(
  'UPDATE_PERIOD',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const GET_USERINFO_BYID = defineAction(
  'GET_USERINFO_BYID',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const LOGIN = defineAction(
  'LOGIN',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CHANGE_PASSWORD = defineAction(
  'CHANGE_PASSWORD',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const LOGOUT = defineAction('LOGOUT', [SUCCESS], appNamespace);

export const CART_NUMBER = defineAction(
  'CART_NUMBER',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CART_SELECT = defineAction(
  'CART_SELECT',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CART_SELECTDELALL = defineAction(
  'CART_SELECTDELALL',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CART_SELECTALL = defineAction(
  'CART_SELECTALL',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CART_EDIT = defineAction(
  'CART_EDIT',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CART_EDITINIT = defineAction(
  'CART_EDITINIT',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CART_SUBMIT = defineAction(
  'CART_SUBMIT',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CART_DELETE = defineAction(
  'CART_DELETE',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const PRODUCT_DETAIL = defineAction(
  'PRODUCT_DETAIL',
  [REQUEST, SUCCESS, FAILURE, STOP, CLEAR],
  appNamespace,
);

export const PRODUCT_DETAIL_OPACITY = defineAction(
  'PRODUCT_DETAIL_OPACITY',
  [REQUEST],
  appNamespace,
);

export const PRODUCT_DETAIL_INFO = defineAction(
  'PRODUCT_DETAIL_INFO',
  [REQUEST, SUCCESS, FAILURE, STOP, CLEAR],
  appNamespace,
);

export const PRODUCT_DETAIL_NUMBER = defineAction(
  'PRODUCT_DETAIL_NUMBER',
  [REQUEST],
  appNamespace,
);

export const PRODUCT_DETAIL_COLORID = defineAction(
  'PRODUCT_DETAIL_COLORID',
  [REQUEST],
  appNamespace,
);

export const PRODUCT_DETAIL_VERSIONID = defineAction(
  'PRODUCT_DETAIL_VERSIONID',
  [REQUEST],
  appNamespace,
);

export const PRODUCT_DETAIL_SELECT = defineAction(
  'PRODUCT_DETAIL_SELECT',
  [REQUEST],
  appNamespace,
);

export const COMMENT = defineAction(
  'COMMENT',
  [REQUEST, SUCCESS, FAILURE, CLEAR, ADD, REMOVE],
  appNamespace,
);

export const GET_MENU = defineAction(
  'GET_MENU',
  [REQUEST, SUCCESS, FAILURE, CLEAR, ADD, REMOVE],
  appNamespace,
);

export const GET_MENU_INDEX = defineAction(
  'GET_MENU_INDEX',
  [REQUEST],
  appNamespace,
);

export const ADDRESS = defineAction(
  'ADDRESS',
  [REQUEST, SUCCESS, FAILURE, CLEAR, ADD, REMOVE],
  appNamespace,
);

export const ADDRESS_SELECT = defineAction(
  'ADDRESS_SELECT',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const ORDER_CREATE = defineAction(
  'ORDER_CREATE',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const CREATE_NORMAL_ORDER = defineAction(
  'CREATE_NORMAL_ORDER',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const PAY_NORMAL_ORDER = defineAction(
  'PAY_NORMAL_ORDER',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const QUERY_BILL_LIST = defineAction(
  'QUERY_BILL_LIST',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const INQUIRY_BILL = defineAction(
  'INQUIRY_BILL',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const QUERY_ORDER_LIST = defineAction(
  'QUERY_ORDER_LIST',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const QUERY_ORDER_LIST_INDEX = defineAction(
  'QUERY_ORDER_LIST_INDEX',
  [REQUEST],
  appNamespace,
);

export const ORDER_PAY = defineAction(
  'ORDER_PAY',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const ORDER_CANCEL = defineAction(
  'ORDER_CANCEL',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CARD_SUBMIT = defineAction(
  'CARD_SUBMIT',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const RECEIVE_VOUCHER = defineAction(
  'RECEIVE_VOUCHER',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const GET_VOUCHER_LIST = defineAction(
  'GET_VOUCHER_LIST',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const JUDGE_VOUCHER = defineAction(
  'JUDGE_VOUCHER',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CARD_QUERY = defineAction(
  'CARD_QUERY',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const QUERY_ORDER = defineAction(
  'QUERY_ORDER',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const GET_INVITE_RECORD = defineAction(
  'GET_INVITE_RECORD',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const ENCHASHMENT_GETLIST = defineAction(
  'ENCHASHMENT_GETLIST',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const ENCHASHMENT_APPLY = defineAction(
  'ENCHASHMENT_APPLY',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const ENCHASHMENT_CONFIG = defineAction(
  'ENCHASHMENT_CONFIG',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const CREATE_DISORDER = defineAction(
  'CREATE_DISORDER',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const RETURN_MONEY = defineAction(
  'RETURN_MONEY',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const ADDRESS_ADD = defineAction(
  'ADDRESS_ADD',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const ADDRESS_REMOVE = defineAction(
  'ADDRESS_REMOVE',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const ADDRESS_MODIFY = defineAction(
  'ADDRESS_MODIFY',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const CITY_INFOS = defineAction(
  'CITY_INFOS',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const SCHOOL_INFOS = defineAction(
  'SCHOOL_INFOS',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const GET_VOUCHER = defineAction(
  'GET_VOUCHER',
  [REQUEST, SUCCESS, FAILURE, CLEAR, ADD, REMOVE],
  appNamespace,
);

export const GET_IMG_URL = defineAction(
  'GET_IMG_URL',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const SUBMIT_INFO = defineAction(
  'SUBMIT_INFO',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const AUDIT_GET_INFO = defineAction(
  'AUDIT_GET_INFO',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const COLLECTION = defineAction(
  'COLLECTION',
  [REQUEST, SUCCESS, FAILURE, CLEAR, ADD, REMOVE],
  appNamespace,
);

export const COLLECTION_ADD = defineAction(
  'COLLECTION_ADD',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const COLLECTION_REMOVE = defineAction(
  'COLLECTION_REMOVE',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const ADD_DETAIL_INFO = defineAction(
  'ADD_DETAIL_INFO',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const QUERY_GOODS = defineAction(
  'QUERY_GOODS',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const BILL_DETAILS = defineAction(
  'BILL_DETAILS',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const OAUTH_REQUEST = defineAction(
  'OAUTH_REQUEST',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const REPAYMENT_RECORD = defineAction(
  'REPAYMENT_RECORD',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const SEARCH_MONTH = defineAction(
  'SEARCH_MONTH',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const SEARCH_MONTH_DETAIL = defineAction(
  'SEARCH_MONTH_DETAIL',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const GET_BILL_DETAIL = defineAction(
  'GET_BILL_DETAIL',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const BILL_BY_YEAR = defineAction(
  'BILL_BY_YEAR',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const BILL_YEAR = defineAction('BILL_YEAR', [REQUEST], appNamespace);

export const BILL_MONTH = defineAction('BILL_MONTH', [REQUEST], appNamespace);

export const BILL_PRICE = defineAction('BILL_PRICE', [REQUEST], appNamespace);

export const BILL_TOTAL_PRICE = defineAction(
  'BILL_TOTAL_PRICE',
  [REQUEST],
  appNamespace,
);

export const COLLECT_FILES = defineAction(
  'COLLECT_FILES',
  [REQUEST, SUCCESS, FAILURE, REMOVE],
  appNamespace,
);

export const UPLOAD_IMG = defineAction(
  'UPLOAD_IMG',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const PREPAID = defineAction(
  'PREPAID',
  [REQUEST, SUCCESS, FAILURE, REMOVE],
  appNamespace,
);

export const GET_SQUARES_INFO = defineAction(
  'GET_SQUARES_INFO',
  [REQUEST, SUCCESS, FAILURE, REMOVE],
  appNamespace,
);

export const GET_PHONE_RECHARGE = defineAction(
  'GET_PHONE_RECHARGE',
  [REQUEST, SUCCESS, FAILURE, REMOVE],
  appNamespace,
);

export const GET_PROVIDERS_CARD = defineAction(
  'GET_PROVIDERS_CARD',
  [REQUEST, SUCCESS, FAILURE, REMOVE],
  appNamespace,
);

export const GET_3GPROVIDERS_CARD = defineAction(
  'GET_3GPROVIDERS_CARD',
  [REQUEST, SUCCESS, FAILURE, REMOVE],
  appNamespace,
);

export const GET_PROVIDERS_VALUE = defineAction(
  'GET_PROVIDERS_VALUE',
  [REQUEST, SUCCESS, FAILURE, REMOVE],
  appNamespace,
);

export const SEARCH_HISTORY = defineAction(
  'SEARCH_HISTORY',
  [ADD, REMOVE],
  appNamespace,
);

export const COUPON_SELECT = defineAction(
  'COUPON_SELECT',
  [REQUEST, CLEAR],
  appNamespace,
);

export const ERROR = defineAction('ERROR', [ADD, CLEAR], appNamespace);

export const MODAL = defineAction('MODAL', [OPEN, CLOSE], appNamespace);

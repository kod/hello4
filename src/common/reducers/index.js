import { combineReducers } from 'redux';
import addEvaluation from './addEvaluation';
import address from './address';
import addressModify from './addressModify';
import adPhone from './adPhone';
import adverstInfo from './adverstInfo';
import bannerSwiper from './bannerSwiper';
import cardQuery from './cardQuery';
import cart from './cart';
import certifiedInformation from './certifiedInformation';
import changePassword from './changePassword';
import cityInfos from './cityInfos';
import collection from './collection';
import comment from './comment';
import couponSelect from './couponSelect';
import enchashmentApply from './enchashmentApply';
import enchashmentConfig from './enchashmentConfig';
import enchashmentGetList from './enchashmentGetList';
import error from './error';
import findProducts from './findProducts';
import getAdverstTopInfo from './getAdverstTopInfo';
import getAllProductInfo from './getAllProductInfo';
import getInviteRecord from './getInviteRecord';
import getMenu from './getMenu';
import getNewestInfo from './getNewestInfo';
import getSquaresInfo from './getSquaresInfo';
import getUserInfoById from './getUserInfoById';
import getVoucher from './getVoucher';
import getVoucherList from './getVoucherList';
import initAdverstCommon from './initAdverstCommon';
import judgeVoucher from './judgeVoucher';
import login from './login';
import modal from './modal';
import oauthRequest from './oauthRequest';
import orderCancel from './orderCancel';
import orderCreate from './orderCreate';
import orderPay from './orderPay';
import otp from './otp';
import productDetailInfo from './productDetailInfo';
import queryOrder from './queryOrder';
import queryOrderList from './queryOrderList';
import receiveVoucher from './receiveVoucher';
import register from './register';
import returnMoney from './returnMoney';
import searchHistory from './searchHistory';
import userAddAddr from './userAddAddr';
import userAddDetailInfo from './userAddDetailInfo';
import userCertificateInfo from './userCertificateInfo';

const rootReducer = combineReducers({
  userCertificateInfo,
  userAddDetailInfo,
  userAddAddr,
  searchHistory,
  returnMoney,
  register,
  receiveVoucher,
  queryOrderList,
  queryOrder,
  productDetailInfo,
  otp,
  orderPay,
  orderCreate,
  orderCancel,
  oauthRequest,
  modal,
  login,
  judgeVoucher,
  initAdverstCommon,
  getVoucherList,
  getVoucher,
  getUserInfoById,
  getSquaresInfo,
  getNewestInfo,
  getMenu,
  getInviteRecord,
  getAllProductInfo,
  getAdverstTopInfo,
  findProducts,
  error,
  enchashmentGetList,
  enchashmentConfig,
  enchashmentApply,
  addEvaluation,
  address,
  addressModify,
  adPhone,
  adverstInfo,
  bannerSwiper,
  cardQuery,
  cart,
  certifiedInformation,
  changePassword,
  cityInfos,
  collection,
  comment,
  couponSelect,
});

export default rootReducer;

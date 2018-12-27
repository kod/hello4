import { all } from 'redux-saga/effects';
import * as addEvaluation from './addEvaluation';
import * as address from './address';
import * as addressModify from './addressModify';
import * as adPhone from './adPhone';
import * as adverstInfo from './adverstInfo';
import * as bannerSwiper from './bannerSwiper';
import * as cardQuery from './cardQuery';
import * as cart from './cart';
import * as changePassword from './changePassword';
import * as cityInfos from './cityInfos';
import * as collectFiles from './collectFiles';
import * as collection from './collection';
import * as comment from './comment';
import * as enchashmentApply from './enchashmentApply';
import * as enchashmentConfig from './enchashmentConfig';
import * as enchashmentGetList from './enchashmentGetList';
import * as error from './error';
import * as findProducts from './findProducts';
import * as getAdverstTopInfo from './getAdverstTopInfo';
import * as getAllProductInfo from './getAllProductInfo';
import * as getInviteRecord from './getInviteRecord';
import * as getMenu from './getMenu';
import * as getNewestInfo from './getNewestInfo';
import * as getSquaresInfo from './getSquaresInfo';
import * as getUserInfoById from './getUserInfoById';
import * as getVoucher from './getVoucher';
import * as getVoucherList from './getVoucherList';
import * as initAdverstCommon from './initAdverstCommon';
import * as judgeVoucher from './judgeVoucher';
import * as login from './login';
import * as oauthRequest from './oauthRequest';
import * as orderCancel from './orderCancel';
import * as orderCreate from './orderCreate';
import * as orderPay from './orderPay';
import * as otp from './otp';
import * as productDetailInfo from './productDetailInfo';
import * as queryOrder from './queryOrder';
import * as queryOrderList from './queryOrderList';
import * as receiveVoucher from './receiveVoucher';
import * as register from './register';
import * as returnMoney from './returnMoney';
import * as userAddAddr from './userAddAddr';
import * as userAddDetailInfo from './userAddDetailInfo';
import * as userCertificateInfo from './userCertificateInfo';

export default function* rootSaga() {
  yield all([
    userCertificateInfo.userCertificateInfoFetchWatch(),
    userAddDetailInfo.userAddDetailInfoSuccessWatch(),
    userAddDetailInfo.userAddDetailInfoFetchWatch(),
    userAddAddr.userAddAddrSuccessWatch(),
    userAddAddr.userAddAddrFetchWatch(),
    returnMoney.returnMoneyFetchWatch(),
    register.registerSuccessWatch(),
    register.registerFetchWatch(),
    receiveVoucher.receiveVoucherSuccessWatch(),
    receiveVoucher.receiveVoucherFetchWatch(),
    queryOrderList.queryOrderListFetchWatch(),
    queryOrder.queryOrderFetchWatch(),
    productDetailInfo.productDetailSelectFetchWatch(),
    productDetailInfo.productDetailInfoSuccessWatch(),
    productDetailInfo.productDetailInfoFetchWatch(),
    otp.otpFetchWatch(),
    orderPay.orderPaySuccessWatch(),
    orderPay.orderPayFetchWatch(),
    orderCreate.orderCreateSuccessWatch(),
    orderCreate.orderCreateFetchWatch(),
    orderCancel.orderCancelSuccessWatch(),
    orderCancel.orderCancelFetchWatch(),
    oauthRequest.oauthRequestFetchWatch(),
    login.logoutSuccessWatch(),
    login.loginSuccessWatch(),
    login.loginFetchWatch(),
    judgeVoucher.judgeVoucherSuccessWatch(),
    initAdverstCommon.initAdverstCommonFetchWatch(),
    getVoucherList.getVoucherListFetchWatch(),
    getVoucher.getVoucherFetchWatch(),
    getUserInfoById.getUserInfoByIdFetchWatch(),
    getSquaresInfo.getSquaresInfoFetchWatch(),
    getNewestInfo.getNewestInfoFetchWatch(),
    getMenu.getMenuFetchWatch(),
    getInviteRecord.getInviteRecordFetchWatch(),
    getAllProductInfo.getAllProductInfoFetchWatch(),
    getAdverstTopInfo.getAdverstTopInfoFetchWatch(),
    findProducts.findProductsFetchWatch(),
    error.watchError(),
    enchashmentGetList.enchashmentGetListFetchWatch(),
    enchashmentConfig.enchashmentConfigFetchWatch(),
    enchashmentApply.enchashmentApplyFetchWatch(),
    enchashmentApply.enchashmentApplySuccessWatch(),
    addEvaluation.addEvaluationFetchWatch(),
    address.addressFetchWatch(),
    address.addressAddFetchWatch(),
    address.addressAddSuccessWatch(),
    address.addressRemoveWatch(),
    address.addressRemoveSuccessWatch(),
    addressModify.addressModifyWatch(),
    addressModify.addressModifySuccessWatch(),
    adPhone.adPhoneFetchWatch(),
    adverstInfo.adverstInfoFetchWatch(),
    bannerSwiper.bannerSwiperFetchWatch(),
    cardQuery.cardQueryFetchWatch(),
    cart.cartFetchWatch(),
    cart.cartNumberRequestWatch(),
    cart.cartDeleteRequestWatch(),
    cart.cartNumberSuccessWatch(),
    cart.cartDeleteSuccessWatch(),
    cart.cartSelectRequestWatch(),
    cart.cartSelectAllRequestWatch(),
    cart.cartAddRequestWatch(),
    cart.cartAddSuccessWatch(),
    changePassword.changePasswordFetchWatch(),
    changePassword.changePasswordSuccessWatch(),
    cityInfos.cityInfosFetchWatch(),
    collectFiles.collectFilesFetchWatch(),
    collection.collectionFetchWatch(),
    collection.collectionAddFetchWatch(),
    collection.collectionAddSuccessWatch(),
    collection.collectionRemoveFetchWatch(),
    collection.collectionRemoveSuccessWatch(),
    comment.commentFetchWatch(),
  ]);
}

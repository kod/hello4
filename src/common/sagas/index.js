import { all } from 'redux-saga/effects';
import * as addEvaluation from './addEvaluation';
import * as address from './address';
import * as addressModify from './addressModify';
import * as adPhone from './adPhone';
import * as adverstInfo from './adverstInfo';
import * as bannerSwiper from './bannerSwiper';

export default function* rootSaga() {
  yield all([
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
  ]);
}

import { combineReducers } from 'redux';
import addEvaluation from './addEvaluation';
import address from './address';
import addressModify from './addressModify';
import adPhone from './adPhone';
import adverstInfo from './adverstInfo';
import bannerSwiper from './bannerSwiper';

const rootReducer = combineReducers({
  addEvaluation,
  address,
  addressModify,
  adPhone,
  adverstInfo,
  bannerSwiper,
});

export default rootReducer;

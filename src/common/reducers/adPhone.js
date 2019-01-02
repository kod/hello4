import { AD_PHONE } from '@src/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  classfyinfo: [],
  phoneAdList: [],
  phoneAdBanerList: [],
};

export default function adPhone(state = initState, action) {
  switch (action.type) {
    case AD_PHONE.CLEAR:
      return {
        ...initState,
      };
    case AD_PHONE.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AD_PHONE.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        phoneAdList: action.payload.phoneAdList,
        phoneAdBanerList: action.payload.phoneAdBanerList,
        classfyinfo: action.payload.classfyinfo,
      };
    case AD_PHONE.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}

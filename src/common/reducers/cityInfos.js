import { CITY_INFOS } from '@/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  division2nd: [],
  division3rd: [],
  division4th: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case CITY_INFOS.CLEAR:
      return {
        ...initState,
      };
    case CITY_INFOS.REQUEST:
      return {
        ...state,
        [action.payload.level]: [],
        loading: true,
      };
    case CITY_INFOS.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        [action.payload.level]: action.payload.items,
      };
    case CITY_INFOS.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};

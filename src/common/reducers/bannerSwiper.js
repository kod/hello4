import { BANNER_SWIPER } from '@/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
  one: {
    loading: false,
    items: [],
  },
  two: {
    loaded: false,
    items: [],
  },
  four: {
    refreshing: false,
    items: [],
  },
};

export default (state = initState, action) => {
  switch (action.type) {
    case BANNER_SWIPER.CLEAR:
      return {
        ...state,
        [action.payload.swiperId]: initState,
      };
    case BANNER_SWIPER.REQUEST:
      return {
        ...state,
        [action.payload.swiperId]: {
          ...state[action.payload.swiperId],
          loading: true,
        },
      };
    case BANNER_SWIPER.SUCCESS:
      return {
        ...state,
        [action.payload.swiperId]: {
          ...state[action.payload.swiperId],
          loading: false,
          loaded: true,
          items: action.payload.items,
        },
      };
    case BANNER_SWIPER.FAILURE:
      return {
        ...state,
        [action.payload.swiperId]: {
          ...state[action.payload.swiperId],
          loading: false,
          loaded: true,
        },
      };
    default:
      return state;
  }
};

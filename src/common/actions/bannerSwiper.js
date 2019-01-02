import { BANNER_SWIPER } from '@src/common/constants/actionTypes';

export function bannerSwiperFetchSuccess(swiperId, items) {
  return {
    type: BANNER_SWIPER.SUCCESS,
    payload: {
      swiperId,
      items,
    },
  };
}

export function bannerSwiperFetchFailure(swiperId) {
  return {
    type: BANNER_SWIPER.FAILURE,
    payload: {
      swiperId,
    },
  };
}

export function bannerSwiperFetch(swiperId, refreshing = false) {
  return {
    type: BANNER_SWIPER.REQUEST,
    payload: {
      swiperId,
      refreshing,
    },
  };
}

export function bannerSwiperClear(swiperId) {
  return {
    type: BANNER_SWIPER.CLEAR,
    payload: {
      swiperId,
    },
  };
}

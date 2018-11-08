import { BANNER_SWIPER } from '@/common/constants/actionTypes';
import { BANNERSWIPER_NAMESPACE } from '@/common/constants';

export function bannerSwiperFetchSuccess(swiperId, items) {
  return {
    type: `${BANNERSWIPER_NAMESPACE}/${BANNER_SWIPER.SUCCESS}`,
    payload: {
      swiperId,
      items,
    },
  };
}

export function bannerSwiperFetchFailure(swiperId) {
  return {
    type: `${BANNERSWIPER_NAMESPACE}/${BANNER_SWIPER.FAILURE}`,
    payload: {
      swiperId,
    },
  };
}

export function bannerSwiperFetch(swiperId, refreshing = false) {
  return {
    type: `${BANNERSWIPER_NAMESPACE}/${BANNER_SWIPER.REQUEST}`,
    payload: {
      swiperId,
      refreshing,
    },
  };
}

export function bannerSwiperClear(swiperId) {
  return {
    type: `${BANNERSWIPER_NAMESPACE}/${BANNER_SWIPER.CLEAR}`,
    payload: {
      swiperId,
    },
  };
}

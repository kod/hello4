import { CITY_INFOS } from '@/common/constants/actionTypes';

export function cityInfosFetchSuccess(items, level) {
  return {
    type: CITY_INFOS.SUCCESS,
    payload: {
      items,
      level,
    },
  };
}

export function cityInfosFetchFailure() {
  return {
    type: CITY_INFOS.FAILURE,
    payload: {},
  };
}

export function cityInfosFetch(pid, level) {
  return {
    type: CITY_INFOS.REQUEST,
    payload: {
      pid,
      level,
    },
  };
}

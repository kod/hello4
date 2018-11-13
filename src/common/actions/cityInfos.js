import { CITY_INFOS } from '@/common/constants/actionTypes';
import { CITYINFOS_NAMESPACE } from '@/common/constants';

export function cityInfosFetchSuccess(items, level) {
  return {
    type: `${CITYINFOS_NAMESPACE}/${CITY_INFOS.SUCCESS}`,
    payload: {
      items,
      level,
    },
  };
}

export function cityInfosFetchFailure() {
  return {
    type: `${CITYINFOS_NAMESPACE}/${CITY_INFOS.FAILURE}`,
    payload: {},
  };
}

export function cityInfosFetch(pid, level) {
  return {
    type: `${CITYINFOS_NAMESPACE}/${CITY_INFOS.REQUEST}`,
    payload: {
      pid,
      level,
    },
  };
}

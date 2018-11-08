import { GET_USERINFO_BYID } from '@/common/constants/actionTypes';
import { GETUSERINFOBYID_NAMESPACE } from '@/common/constants';

export function getUserInfoByIdFetchSuccess(item) {
  return {
    type: `${GETUSERINFOBYID_NAMESPACE}/${GET_USERINFO_BYID.SUCCESS}`,
    payload: {
      item,
    },
  };
}

export function getUserInfoByIdFetchFailure() {
  return {
    type: `${GETUSERINFOBYID_NAMESPACE}/${GET_USERINFO_BYID.FAILURE}`,
    payload: {},
  };
}

export function getUserInfoByIdFetch() {
  return {
    type: `${GETUSERINFOBYID_NAMESPACE}/${GET_USERINFO_BYID.REQUEST}`,
    payload: {},
  };
}

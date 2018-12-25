import { GET_INVITE_RECORD } from '@/common/constants/actionTypes';
import { GET_INVITE_RECORD_NAMESPACE } from '@/common/constants';

export function getInviteRecordFetchSuccess(item) {
  return {
    type: `${GET_INVITE_RECORD_NAMESPACE}/${GET_INVITE_RECORD.SUCCESS}`,
    payload: {
      item,
    },
  };
}

export function getInviteRecordFetchFailure() {
  return {
    type: `${GET_INVITE_RECORD_NAMESPACE}/${GET_INVITE_RECORD.FAILURE}`,
    payload: {},
  };
}

export function getInviteRecordFetch(params) {
  return {
    type: `${GET_INVITE_RECORD_NAMESPACE}/${GET_INVITE_RECORD.REQUEST}`,
    payload: {
      ...params,
    },
  };
}

export function getInviteRecordClear() {
  return {
    type: `${GET_INVITE_RECORD_NAMESPACE}/${GET_INVITE_RECORD.CLEAR}`,
    payload: {},
  };
}

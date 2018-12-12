import { OAUTH_REQUEST } from '@/common/constants/actionTypes';
import { OAUTH_REQUEST_NAMESPACE } from '@/common/constants';

export function oauthRequestFetchSuccess(response, screen) {
  return {
    type: `${OAUTH_REQUEST_NAMESPACE}/${OAUTH_REQUEST.SUCCESS}`,
    payload: {
      response,
      screen,
    },
  };
}

export function oauthRequestFetchFailure() {
  return {
    type: `${OAUTH_REQUEST_NAMESPACE}/${OAUTH_REQUEST.FAILURE}`,
    payload: {},
  };
}

export function oauthRequestFetch(params) {
  return {
    type: `${OAUTH_REQUEST_NAMESPACE}/${OAUTH_REQUEST.REQUEST}`,
    payload: {
      ...params,
    },
  };
}

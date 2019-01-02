import { ERROR } from '@src/common/constants/actionTypes';

export function addError(error) {
  return {
    type: ERROR.ADD,
    error: true,
    payload: typeof error === 'string' ? error : 'Something bad happened',
  };
}

export function clearError() {
  return {
    type: ERROR.CLEAR,
    error: false,
  };
}

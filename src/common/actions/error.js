import { ERROR } from '@/common/constants/actionTypes';
import { ERROR_NAMESPACE } from '@/common/constants';

export function addError(error) {
  return {
    type: `${ERROR_NAMESPACE}/${ERROR.ADD}`,
    error: true,
    payload: typeof error === 'string' ? error : 'Something bad happened',
  };
}

export function clearError() {
  return {
    type: `${ERROR_NAMESPACE}/${ERROR.CLEAR}`,
    error: false,
  };
}

import { ADD_EVALUATION } from '@/common/constants/actionTypes';

export function addEvaluationFetchSuccess(params) {
  return {
    type: ADD_EVALUATION.SUCCESS,
    payload: {
      ...params,
    },
  };
}

export function addEvaluationFetchFailure() {
  return {
    type: ADD_EVALUATION.FAILURE,
    payload: {},
  };
}

export function addEvaluationFetch(params) {
  return {
    type: ADD_EVALUATION.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function addEvaluationClear() {
  return {
    type: ADD_EVALUATION.CLEAR,
    payload: {},
  };
}

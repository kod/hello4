import { ADD_EVALUATION } from '@/common/constants/actionTypes';
import { ADDEVALUATION_NAMESPACE } from '@/common/constants';

export function addEvaluationFetchSuccess(params) {
  return {
    type: `${ADDEVALUATION_NAMESPACE}/${ADD_EVALUATION.SUCCESS}`,
    payload: {
      ...params,
    },
  };
}

export function addEvaluationFetchFailure() {
  return {
    type: `${ADDEVALUATION_NAMESPACE}/${ADD_EVALUATION.FAILURE}`,
    payload: {},
  };
}

export function addEvaluationFetch(params) {
  return {
    type: `${ADDEVALUATION_NAMESPACE}/${ADD_EVALUATION.REQUEST}`,
    payload: {
      ...params,
    },
  };
}

export function addEvaluationClear() {
  return {
    type: `${ADDEVALUATION_NAMESPACE}/${ADD_EVALUATION.CLEAR}`,
    payload: {},
  };
}

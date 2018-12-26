import { all } from 'redux-saga/effects';
import { addEvaluationFetchWatch } from './addEvaluation';

export default function* rootSaga() {
  yield all([addEvaluationFetchWatch()]);
}

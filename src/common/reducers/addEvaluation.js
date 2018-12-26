import { ADD_EVALUATION } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
};

export default function addEvaluation(state = initState, action) {
  switch (action.type) {
    case ADD_EVALUATION.CLEAR:
      return {
        ...initState,
      };
    case ADD_EVALUATION.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_EVALUATION.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case ADD_EVALUATION.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}

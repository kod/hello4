import { GET_SQUARES_INFO } from '../constants/actionTypes';
import { GETSQUARESINFO_NAMESPACE } from '@/common/constants';

export function getSquaresInfoFetchSuccess({
  squareinfo,
  totalsize,
  totalpage,
  pagesize,
  currentpage,
}) {
  return {
    type: `${GETSQUARESINFO_NAMESPACE}/${GET_SQUARES_INFO.SUCCESS}`,
    payload: {
      squareinfo,
      totalsize,
      totalpage,
      pagesize,
      currentpage,
    },
  };
}

export function getSquaresInfoFetchFailure() {
  return {
    type: `${GETSQUARESINFO_NAMESPACE}/${GET_SQUARES_INFO.FAILURE}`,
    payload: {},
  };
}

export function getSquaresInfoFetch() {
  return {
    type: `${GETSQUARESINFO_NAMESPACE}/${GET_SQUARES_INFO.REQUEST}`,
    payload: {},
  };
}

export function getSquaresInfoClear() {
  return {
    type: `${GETSQUARESINFO_NAMESPACE}/${GET_SQUARES_INFO.CLEAR}`,
    payload: {},
  };
}

import { GET_SQUARES_INFO } from '@/common/constants/actionTypes';

export function getSquaresInfoFetchSuccess({
  squareinfo,
  totalsize,
  totalpage,
  pagesize,
  currentpage,
}) {
  return {
    type: GET_SQUARES_INFO.SUCCESS,
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
    type: GET_SQUARES_INFO.FAILURE,
    payload: {},
  };
}

export function getSquaresInfoFetch() {
  return {
    type: GET_SQUARES_INFO.REQUEST,
    payload: {},
  };
}

export function getSquaresInfoClear() {
  return {
    type: GET_SQUARES_INFO.CLEAR,
    payload: {},
  };
}

import { ERROR } from '@src/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ERROR.CLEAR:
      return {
        ...initState,
      };
    default:
      return state;
  }
};

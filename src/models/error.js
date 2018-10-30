import { Modal } from 'antd-mobile';
import { formatMessage } from 'umi/locale';
import { ERROR_NAMESPACE } from '@/common/constants';
import { ERROR } from '@/common/constants/actionTypes';
// import { Toast } from 'antd-mobile';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
};

export default {
  namespace: ERROR_NAMESPACE,

  state: initState,

  effects: {
    *[ERROR.ADD]({ payload }, { put }) {
      const error = payload;
      // alert(error);

      Modal.alert('', error, [
        { text: formatMessage({ id: 'cancel' }), style: 'default' },
      ]);

      yield put({
        type: ERROR.CLEAR,
        error: false,
      });
    },
  },

  reducers: {
    [ERROR.CLEAR]() {
      return {
        ...initState,
      };
    },
  },
};

import buyoo from '@/services/api';

import { COLLECTFILES_NAMESPACE } from '@/common/constants';
import { COLLECT_FILES } from '@/common/constants/actionTypes';
import {
  collectFilesFetchSuccess,
  collectFilesFetchFailure,
} from '@/common/actions/collectFiles';
import { addError } from '@/common/actions/error';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  images: [],
};

export default {
  namespace: COLLECTFILES_NAMESPACE,

  state: initState,

  effects: {
    *[COLLECT_FILES.REQUEST](action, { apply, put }) {
      try {
        const { productid = '1', files, fileOrigin = '' } = action.payload;
        const formData = new FormData();
        if (fileOrigin) {
          formData.append('files', fileOrigin);
        } else {
          formData.append('files', {
            uri: files.uri,
            type: files.type || 'image/jpeg',
            name: files.name || 'photo.jpg',
          });
        }
        formData.append('productid', productid);

        const response = yield apply(buyoo, buyoo.collectFiles, [formData]);

        if (response.code !== 10000) {
          yield put(collectFilesFetchFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(collectFilesFetchSuccess(response.url));
        }
      } catch (err) {
        yield put(collectFilesFetchFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [COLLECT_FILES.CLEAR]() {
      return {
        ...initState,
      };
    },
    [COLLECT_FILES.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        images: [...state.images, action.payload.item],
      };
    },
    [COLLECT_FILES.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
    [COLLECT_FILES.REMOVE](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        images: action.payload.index,
        // images: state.images.filter((val, key) => key !== action.payload.index),
      };
    },
  },
};

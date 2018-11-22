/* eslint-disable camelcase */
import dayjs from 'dayjs';
import { normalize } from 'normalizr';
import { Modal } from 'antd-mobile';
import { formatMessage } from 'umi/locale';

import buyoo from '@/services/api';

import { encryptMD5, signTypeMD5 } from '@/utils/AuthEncrypt';
import { CART_NAMESPACE } from '@/common/constants';
import Schemas from '@/common/constants/schemas';
import {
  CART,
  CART_NUMBER,
  CART_SELECT,
  CART_SELECTALL,
  CART_EDIT,
  CART_EDITINIT,
  CART_SUBMIT,
  CART_DELETE,
  CART_SELECTDELALL,
  CART_ADD,
} from '@/common/constants/actionTypes';
import {
  cartRequest,
  cartSuccess,
  cartFailure,
  // cartAddRequest,
  cartAddSuccess,
  cartAddFailure,
  cartNumberSuccess,
  cartNumberFailure,
  cartDeleteSuccess,
  cartDeleteFailure,
  // cartSelectRequest,
  cartSelectSuccess,
  cartSelectFailure,
  // cartSelectAllRequest,
  cartSelectAllSuccess,
  cartSelectAllFailure,
} from '@/common/actions/cart';
import { addError } from '@/common/actions/error';
import { getAuthUserFunid } from '@/common/selectors';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  allSelected: false,
  allSelectedDel: false,
  isEdit: false,
  // totalMoney: 0,
  items: [],
  products: {},
  details: {},
};

export default {
  namespace: CART_NAMESPACE,

  state: initState,

  effects: {
    *[CART.REQUEST](action, { apply, put, select }) {
      try {
        const funid = yield select(getAuthUserFunid);
        const Key = 'commodityKey';
        const appId = '3';
        const method = 'fun.cart.query';
        const charset = 'utf-8';
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const version = '2.0';

        const signType = signTypeMD5(appId, method, charset, Key, true);

        const encrypt = encryptMD5(
          [
            {
              key: 'funid',
              value: funid,
            },
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.cartGetInfo, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            funid,
          },
        ]);

        let cart = [];

        if (response.code === 10000) {
          const array = response.cartitems;

          cart = array.map(val => {
            val.detail = JSON.parse(val.detail) || {};
            val.imageUrl = val.iconUrl || '';
            val.selected = false;
            val.selectedDel = false;
            return val;
          });
          cart = normalize(cart, Schemas.PRODUCTS_ARRAY);
          // for (let index = 0; index < array.length; index += 1) {
          //   let element = array[index];
          //   element = {  ...JSON.parse(element.detail), ...element };
          //   element.imageUrl = element.iconUrl;
          //   element.selected = false;
          //   element.selectedDel = false;
          //   cart.push(element);
          // }
        }

        yield put(
          cartSuccess(
            cart.result,
            cart.entities.products,
            cart.entities.details,
          ),
        );
      } catch (err) {
        yield put(cartFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
    *[CART_NUMBER.REQUEST](action, { apply, put, select }) {
      const {
        cartitemid,
        quetity,
        // quetity,
      } = action.payload;
      try {
        const funid = yield select(getAuthUserFunid);

        const Key = 'commodityKey';
        const appId = '3';
        const method = 'fun.cart.change';
        const charset = 'utf-8';
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const version = '2.0';

        const signType = signTypeMD5(appId, method, charset, Key, true);

        const encrypt = encryptMD5(
          [
            {
              key: 'funid',
              value: funid,
            },
            {
              key: 'cartitemid',
              value: cartitemid,
            },
            {
              key: 'quetity',
              value: quetity,
            },
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.cartChangeNum, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            funid,
            cartitemid,
            quetity,
          },
        ]);

        let cart = [];
        cart = response;
        // if (response.code === 10000) {
        //   let array = response.cartitems;
        //   for (let index = 0; index < array.length; index += 1) {
        //     let element = array[index];
        //     element = { ...element, ... JSON.parse(element.detail) };
        //     element.imageUrl = element.iconUrl;
        //     cart.push(element);
        //   }
        // }

        yield put(cartNumberSuccess(cart));
      } catch (err) {
        yield put(cartNumberFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
    *[CART_DELETE.REQUEST](action, { apply, put, select }) {
      try {
        const funid = yield select(getAuthUserFunid);
        const { cartitemids, orderno = '' } = action.payload;

        const Key = 'commodityKey';
        const appId = '3';
        const method = 'fun.cart.remove';
        const charset = 'utf-8';
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const version = '2.0';

        const signType = signTypeMD5(appId, method, charset, Key, true);

        const encrypt = encryptMD5(
          [
            {
              key: 'funid',
              value: funid,
            },
            {
              key: 'cartitemids',
              value: cartitemids,
            },
            {
              key: 'orderno',
              value: orderno,
            },
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.cartRemove, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            funid,
            cartitemids,
            orderno,
          },
        ]);

        if (response.code === 10000) {
          yield put(cartDeleteSuccess());
        } else {
          yield put(cartDeleteFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        }
      } catch (err) {
        yield put(cartDeleteFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
    *[CART_NUMBER.SUCCESS](action, { put }) {
      try {
        yield put(cartRequest());
      } catch (err) {
        // yield put(cartNumberFailure());
        // yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
    *[CART_DELETE.SUCCESS](action, { put }) {
      try {
        yield put(cartRequest());
      } catch (err) {
        // yield put(cartDeleteFailure());
        // yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
    *[CART_SELECT.REQUEST](action, { put }) {
      try {
        yield put(cartSelectSuccess());
      } catch (err) {
        yield put(cartSelectFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
    *[CART_SELECTALL.REQUEST](action, { put }) {
      try {
        yield put(cartSelectAllSuccess());
      } catch (err) {
        yield put(cartSelectAllFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
    *[CART_SELECTALL.REQUEST](action, { put }) {
      try {
        yield put(cartSelectAllSuccess());
      } catch (err) {
        yield put(cartSelectAllFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
    *[CART_ADD.REQUEST](action, { put, select, apply }) {
      try {
        const funid = yield select(getAuthUserFunid);
        const { cartitems } = action.payload;

        const Key = 'commodityKey';
        const appId = '3';
        const method = 'fun.cart.gate';
        const charset = 'utf-8';
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const version = '2.0';

        const signType = signTypeMD5(appId, method, charset, Key, true);

        const encrypt = encryptMD5(
          [
            {
              key: 'funid',
              value: funid,
            },
            {
              key: 'cartitems',
              value: cartitems,
            },
          ],
          Key,
        );

        const response = yield apply(buyoo, buyoo.cartGate, [
          {
            appid: appId,
            method,
            charset,
            signtype: signType,
            encrypt,
            timestamp,
            version,
            funid,
            cartitems,
          },
        ]);

        if (response.code !== 10000) {
          yield put(cartAddFailure());
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
        } else {
          yield put(cartAddSuccess());
        }
      } catch (err) {
        yield put(cartAddFailure());
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
    *[CART_ADD.SUCCESS](action, { put }) {
      try {
        Modal.alert('', formatMessage({ id: 'success' }), [
          { text: formatMessage({ id: 'confirm' }), style: 'default' },
        ]);
      } catch (err) {
        yield put(addError(typeof err === 'string' ? err : err.toString()));
      }
    },
  },

  reducers: {
    [CART.CLEAR]() {
      return {
        ...initState,
      };
    },
    [CART.SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        // totalMoney: 0,
        items: action.payload.items,
        products: action.payload.products,
        details: action.payload.details,
      };
    },
    [CART.FAILURE](state) {
      return {
        ...state,
        loaded: true,
      };
    },
    [CART_NUMBER.REQUEST](state, action) {
      return {
        ...state,
        loading: true,
        funid: action.payload.funid,
        cartitemid: action.payload.cartitemid,
        quetity: action.payload.quetity,
      };
    },
    [CART_NUMBER.SUCCESS](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
        allSelected: false,
        // items: action.payload.cart,
      };
    },
    [CART_NUMBER.FAILURE](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    },
    [CART_SELECT.REQUEST](state, action) {
      return {
        ...state,
        products: {
          ...state.products,
          [action.payload.id]: {
            ...state.products[action.payload.id],
            [state.isEdit ? 'selectedDel' : 'selected']: action.payload
              .selected,
          },
        },
      };
    },
    [CART_SELECT.SUCCESS](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
        allSelected: state.items.every(elem => state.products[elem].selected),
        // totalMoney: state.items.reduce((a, b, index) => {
        //   if (index === 1) {
        //     const aPrice = state.products[a].selected ? state.details[state.products[a].detail].price * state.products[a].quantity : 0;
        //     const bPrice = state.products[b].selected ? state.details[state.products[b].detail].price * state.products[b].quantity : 0;
        //     return aPrice + bPrice;
        //   } else {
        //     const bPrice = state.products[b].selected ? state.details[state.products[b].detail].price * state.products[b].quantity : 0;
        //     return a + bPrice;
        //   }
        //   return a + b;
        // }),
      };
    },
    [CART_SELECT.FAILURE](state) {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    },
    [CART_SELECTDELALL.REQUEST](state) {
      return {
        ...state,
        allSelectedDel: !state.allSelectedDel,
        products: state.items.reduce((a, b, index) => {
          if (index === 1) {
            return {
              ...state.products,
              [a]: {
                ...state.products[a],
                selectedDel: !state.allSelectedDel,
              },
              [b]: {
                ...state.products[b],
                selectedDel: !state.allSelectedDel,
              },
            };
          }
          return {
            ...a,
            [b]: {
              ...state.products[b],
              selectedDel: !state.allSelectedDel,
            },
          };
        }),
      };
    },
    [CART_SELECTALL.REQUEST](state) {
      return {
        ...state,
        allSelected: !state.allSelected,
        products: state.items.reduce((a, b, index) => {
          if (index === 1) {
            return {
              ...state.products,
              [a]: {
                ...state.products[a],
                selected: !state.allSelected,
              },
              [b]: {
                ...state.products[b],
                selected: !state.allSelected,
              },
            };
          }
          return {
            ...a,
            [b]: {
              ...state.products[b],
              selected: !state.allSelected,
            },
          };
        }),
      };
    },
    [CART_SELECTALL.SUCCESS](state) {
      return {
        ...state,
        // totalMoney: state.items.reduce((a, b, index) => {
        //   if (index === 1) {
        //     const aPrice = state.products[a].selected ? state.details[state.products[a].detail].price * state.products[a].quantity : 0;
        //     const bPrice = state.products[b].selected ? state.details[state.products[b].detail].price * state.products[b].quantity : 0;
        //     return aPrice + bPrice;
        //   } else {
        //     const bPrice = state.products[b].selected ? state.details[state.products[b].detail].price * state.products[b].quantity : 0;
        //     return a + bPrice;
        //   }
        //   return a + b;
        // }),
      };
    },
    [CART_EDIT.REQUEST](state) {
      return {
        ...state,
        isEdit: !state.isEdit,
      };
    },
    [CART_EDITINIT.REQUEST](state) {
      return {
        ...state,
        allSelectedDel: false,
        products: state.items.reduce((a, b, index) => {
          if (index === 1) {
            return {
              ...state.products,
              [a]: {
                ...state.products[a],
                selectedDel: false,
              },
              [b]: {
                ...state.products[b],
                selectedDel: false,
              },
            };
          }
          return {
            ...a,
            [b]: {
              ...state.products[b],
              selectedDel: false,
            },
          };
        }),
      };
    },
    [CART_SUBMIT.REQUEST](state) {
      return {
        ...state,
        loading: true,
      };
    },
    [CART_DELETE.REQUEST](state) {
      return {
        ...state,
        loading: true,
      };
    },
  },
};

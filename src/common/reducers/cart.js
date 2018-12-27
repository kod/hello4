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
} from '@/common/constants/actionTypes';

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

export default (state = initState, action) => {
  switch (action.type) {
    case CART.CLEAR:
      return {
        ...initState,
      };
    case CART.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CART.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        // totalMoney: 0,
        items: action.payload.items,
        products: action.payload.products,
        details: action.payload.details,
      };
    case CART.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case CART_NUMBER.REQUEST:
      return {
        ...state,
        loading: true,
        funid: action.payload.funid,
        cartitemid: action.payload.cartitemid,
        quetity: action.payload.quetity,
      };
    case CART_NUMBER.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        allSelected: false,
        // items: action.payload.cart,
      };
    case CART_NUMBER.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case CART_SELECT.REQUEST:
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
    case CART_SELECT.SUCCESS:
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
    case CART_SELECT.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case CART_SELECTDELALL.REQUEST:
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
    case CART_SELECTALL.REQUEST:
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
    case CART_SELECTALL.SUCCESS:
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
    case CART_EDIT.REQUEST:
      return {
        ...state,
        isEdit: !state.isEdit,
      };
    case CART_EDITINIT.REQUEST:
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
    case CART_SUBMIT.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CART_DELETE.REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

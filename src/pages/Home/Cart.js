import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import { Modal } from 'antd-mobile';
import router from 'umi/router';
import qs from 'qs';

import * as cartActionCreators from '@/common/actions/cart';
import BYHeader from '@/components/BYHeader';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  MONETARY,
  WINDOW_HEIGHT,
  SCREENS,
  BUYOO,
} from '@/common/constants';
import { BORDER_COLOR, RED_COLOR, PRIMARY_COLOR } from '@/styles/variables';
import CartItem from '@/components/CartItem';
import CustomIcon from '@/components/CustomIcon';
import priceFormat from '@/utils/priceFormat';
import EmptyState from '@/components/EmptyState';
import { getCartTotalMoney } from '@/common/selectors';
import { addEventListener, removeEventListener, b } from '@/utils';
import { o } from '@/utils/AuthEncrypt';

const ouhrigdfnjsoeijehrJpg =
  'https://oss.buyoo.vn/usercollect/1/20181101180309_67w.jpg';

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.addEventListenerCartShow = this.addEventListenerCartShow.bind(this);
  }

  componentDidMount() {
    addEventListener('CartShow', this.addEventListenerCartShow);

    this.addEventListenerCartShow();
    // cartRequest();
  }

  componentWillUnmount() {
    removeEventListener('popstate', this.addEventListenerCartShow);
  }

  addEventListenerCartShow = () => {
    const { cartRequest, authUser } = this.props;
    console.log(this.props);
    console.log(authUser);
    if (authUser) cartRequest();
  };

  renderHeaderTitle = () => {
    const { cart } = this.props;
    const stylesX = {
      container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingLeft: cart.items.length === 0 ? 0 : 60,
        // paddingRight: cart.items.length === 0 ? 25 : 0,
        height: '100%',
      },
      title: {
        fontSize: 16,
        color: '#333',
        marginRight: 5,
      },
    };

    return (
      <div style={stylesX.container}>
        <div style={stylesX.title}>{formatMessage({ id: 'cart' })}</div>
      </div>
    );
  };

  renderHeaderRight = () => {
    const stylesX = {
      headerRight: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      },
      headerRightText: {
        fontSize: 14,
        color: '#666',
        // height: '100%',
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      },
    };

    const {
      isEdit,
      cartEditRequest,
      cartEditInitRequest,
      cart: { items },
    } = this.props;

    const onPressHandle = () => {
      cartEditRequest();
      if (items.length !== 1 && isEdit) cartEditInitRequest();
    };

    return (
      <div style={stylesX.headerRight} onClick={() => onPressHandle()}>
        <div style={stylesX.headerRightText}>
          {isEdit
            ? formatMessage({ id: 'save' })
            : formatMessage({ id: 'edit' })}
        </div>
      </div>
    );
  };

  onPressSelectAllHandle = () => {
    const {
      isEdit,
      cartSelectAllRequest,
      cartSelectDelAllRequest,
      cart: { items },
    } = this.props;
    if (items.length < 2) return false;
    if (isEdit === false) {
      cartSelectAllRequest();
    } else {
      // delete
      cartSelectDelAllRequest();
    }
    return true;
  };

  onPressSubmitHandle = () => {
    const { isEdit, cart, cartDeleteRequest } = this.props;

    const getSelectedDelId = () => {
      const { items, products } = cart;
      const result = [];
      items.forEach(value => {
        if (products[value].selectedDel) result.push(value);
      });
      return result.join(',');
    };

    const getSelectedId = () => {
      const { items, products } = cart;
      const result = [];
      items.forEach(value => {
        if (products[value].selected) result.push(value);
      });
      return result.join(',');
    };

    const submit = () => {
      const { items, products, details } = cart;
      const productsCart = [];
      const adverstInfo = [];

      for (let index = 0; index < items.length; index += 1) {
        const val = items[index];

        if (products[val].selected) {
          productsCart.push({
            id: products[val].detail,
            amount:
              products[val].quantity * details[products[val].detail].price,
          });

          adverstInfo.push({
            cartitemid: val,
            productid: products[val].itemId,
            brandId: details[products[val].detail].brandId,
            propertiesIds: '',
            imageUrl: details[products[val].detail].iconUrl,
            name: details[products[val].detail].name,
            price: details[products[val].detail].price,
            number: products[val].quantity,
          });
        }
      }

      return {
        products: JSON.stringify(productsCart),
        adverstInfo: JSON.stringify(adverstInfo),
      };
    };

    if (isEdit === false) {
      // submit
      const selectedIdStr = getSelectedId();
      if (!selectedIdStr) return false;

      router.push(
        `/${SCREENS.OrderWrite}?${qs.stringify({
          ...submit(cart),
          isCart: true,
        })}`,
      );
    } else {
      // delete
      const selectedDelIdStr = getSelectedDelId();
      if (!selectedDelIdStr) return false;
      Modal.alert('', formatMessage({ id: 'confirmDelete' }), [
        { text: formatMessage({ id: 'cancel' }), style: 'default' },
        {
          text: formatMessage({ id: 'delete' }),
          onPress: () => {
            cartDeleteRequest(selectedDelIdStr);
          },
        },
      ]);
    }
    return true;
  };

  render() {
    const {
      cart,
      loading,
      allSelected,
      allSelectedDel,
      isEdit,
      totalMoney,
    } = this.props;

    const styles = {
      container: {
        backgroundColor: '#fff',
      },
      main: {
        display: 'flex',
        flexDirection: 'column',
        height: WINDOW_HEIGHT - 45 - 50 - 50,
        overflowY: 'auto',
      },
      overview: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopColor: BORDER_COLOR,
        borderTopWidth: 1,
        borderTopStyle: 'solid',
      },
      overviewIconWrap: {
        paddingLeft: WINDOW_WIDTH * 0.045,
      },
      overviewSelectAll: {
        display: 'flex',
        flexDirection: 'row',
      },
      overviewIcon: {
        height: 50,
        lineHeight: '50px',
        fontSize: 20,
        color: '#666',
        marginRight: WINDOW_WIDTH * 0.02,
      },
      overviewIconSelected: {
        color: PRIMARY_COLOR,
      },
      overviewIconSelectedDel: {
        color: RED_COLOR,
      },
      overviewSelect: {
        height: 49,
        lineHeight: '49px',
        fontSize: 16,
        color: '#666',
        paddingRight: WINDOW_WIDTH * 0.02,
      },
      overviewPrice: {
        ddisplay: 'flex',
        flex: 1,
        height: 50,
        lineHeight: '50px',
        textAlign: 'center',
        fontSize: 16,
        color: RED_COLOR,
        fontWeight: '700',
      },
      overviewSubmitText: {
        height: 50,
        lineHeight: '50px',
        textAlign: 'center',
        width: WINDOW_WIDTH * 0.25,
        color: '#fff',
        fontSize: 14,
        backgroundColor: PRIMARY_COLOR,
      },
      overviewSubmitTextDel: {
        backgroundColor: RED_COLOR,
      },
    };

    const isEmptyCart = cart.items.length === 0;
    return (
      <div style={styles.container}>
        <BYHeader
          headerTitle={this.renderHeaderTitle()}
          headerRight={!isEmptyCart && this.renderHeaderRight()}
          showBackButton={false}
        />
        {!isEmptyCart && (
          <div style={styles.main}>
            {!isEmptyCart && (
              <div>
                <CartItem
                  data={cart}
                  styleItem={{
                    marginBottom: 25,
                    borderTopColor: BORDER_COLOR,
                    borderTopWidth: 1,
                    borderTopStyle: 'solid',
                  }}
                  styleItemLeft={{
                    paddingLeft: 0,
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                />
              </div>
            )}
            {!isEmptyCart && <div style={{ flex: 1 }} />}
          </div>
        )}
        {!isEmptyCart && (
          <div style={styles.overview}>
            <div
              style={styles.overviewSelectAll}
              onClick={() => this.onPressSelectAllHandle()}
            >
              <div style={styles.overviewIconWrap}>
                {isEdit ? (
                  <CustomIcon
                    type={allSelectedDel ? 'roundcheckfill' : 'round'}
                    style={{
                      ...styles.overviewIcon,
                      ...(allSelectedDel && styles.overviewIconSelectedDel),
                    }}
                  />
                ) : (
                  <CustomIcon
                    type={allSelected ? 'roundcheckfill' : 'round'}
                    style={{
                      ...styles.overviewIcon,
                      ...(allSelected && styles.overviewIconSelected),
                    }}
                  />
                )}
              </div>
              <div style={styles.overviewSelect}>
                {formatMessage({ id: 'selectAll' })}
              </div>
            </div>
            <div style={styles.overviewPrice}>
              {!isEdit && `${priceFormat(totalMoney)} ${MONETARY}`}
            </div>
            <div
              style={styles.overviewSubmit}
              onClick={() => this.onPressSubmitHandle()}
            >
              <div
                style={{
                  ...styles.overviewSubmitText,
                  ...(isEdit && styles.overviewSubmitTextDel),
                }}
              >
                {isEdit
                  ? formatMessage({ id: 'delete' })
                  : formatMessage({ id: 'buy' })}
              </div>
            </div>
          </div>
        )}
        {!loading && isEmptyCart && (
          <EmptyState
            source={ouhrigdfnjsoeijehrJpg}
            text={formatMessage({ id: 'noData' })}
            styleText={{ marginBottom: 0 }}
          />
        )}
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    const { cart } = state;

    return {
      authUser: o(b, BUYOO),
      cart,
      totalMoney: getCartTotalMoney(state, props),
      loading: cart.loading,
      allSelected: cart.allSelected,
      allSelectedDel: cart.allSelectedDel,
      isEdit: cart.isEdit,
    };
  },
  {
    ...cartActionCreators,
  },
)(Index);

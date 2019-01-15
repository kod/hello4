import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { i18n, View } from '@src/API';
import { Modal } from 'antd-mobile';
import router from 'umi/lib/router';
import qs from 'qs';

import * as cartActionCreators from '@src/common/actions/cart';
import BYHeader from '@src/components/BYHeader';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  MONETARY,
  WINDOW_HEIGHT,
  SCREENS,
} from '@src/common/constants';
import { BORDER_COLOR } from '@src/styles/variables';
import CartItem from '@src/components/CartItem';
import CustomIcon from '@src/components/CustomIcon';
import priceFormat from '@src/utils/priceFormat';
import EmptyState from '@src/components/EmptyState';
import { getCartTotalMoney, getLoginUser } from '@src/common/selectors';
import { addEventListenerBuyoo, removeEventListenerBuyoo } from '@src/utils';

import classNames from 'classnames';

import styles from './Cart.less';
import renderHeaderTitleStyles from './renderHeaderTitle.less';
import renderHeaderRightStyles from './renderHeaderRight.less';

const ouhrigdfnjsoeijehrJpg =
  'https://oss.buyoo.vn/usercollect/1/20181101180309_67w.jpg';

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.addEventListenerCartShow = this.addEventListenerCartShow.bind(this);
  }

  componentDidMount() {
    addEventListenerBuyoo('CartShow', this.addEventListenerCartShow);

    this.addEventListenerCartShow();
    // cartRequest();
  }

  componentWillUnmount() {
    removeEventListenerBuyoo('CartShow', this.addEventListenerCartShow);
  }

  addEventListenerCartShow = () => {
    const { cartRequest, authUser } = this.props;
    if (authUser) cartRequest();
  };

  renderHeaderTitle = () => {
    const { cart } = this.props;
    // const stylesX = {
    //   container: {
    //     display: 'flex',
    //     flex: 1,
    //     align-items: 'center',
    //     justify-content: 'center',
    //     flex-direction: row,
    //     padding-left: cart.items.length === 0 ? 0 : 60,
    //     // padding-right: cart.items.length === 0 ? 25 : 0,
    //     height: '100%',
    //   },
    //   title: {
    //     font-size: 16,
    //     color: '#333',
    //     margin-right: 5,
    //   },
    // };

    return (
      <View
        style={{
          paddingLeft: cart.items.length === 0 ? 0 : 60,
        }}
        className={renderHeaderTitleStyles.container}
      >
        <View className={renderHeaderTitleStyles.title}>{i18n.cart}</View>
      </View>
    );
  };

  renderHeaderRight = () => {
    // const stylesX = {
    //   headerRight: {
    //     display: 'flex',
    //     align-items: 'center',
    //     justify-content: 'center',
    //     height: '100%',
    //   },
    //   headerRightText: {
    //     font-size: 14,
    //     color: '#666',
    //     // height: '100%',
    //     padding-left: SIDEINTERVAL,
    //     padding-right: SIDEINTERVAL,
    //   },
    // };

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
      <View
        className={renderHeaderRightStyles.headerRight}
        onClick={() => onPressHandle()}
      >
        <View
          style={{
            paddingLeft: SIDEINTERVAL,
            paddingRight: SIDEINTERVAL,
          }}
          className={renderHeaderRightStyles.headerRightText}
        >
          {isEdit ? i18n.save : i18n.edit}
        </View>
      </View>
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
      Modal.alert('', i18n.confirmDelete, [
        { text: i18n.cancel, style: 'default' },
        {
          text: i18n.delete,
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

    const isEmptyCart = cart.items.length === 0;
    return (
      <View className={styles.container}>
        <BYHeader
          headerTitle={this.renderHeaderTitle()}
          headerRight={!isEmptyCart && this.renderHeaderRight()}
          showBackButton={false}
        />
        {!isEmptyCart && (
          <View
            style={{
              height: WINDOW_HEIGHT - 45 - 50 - 50,
            }}
            className={styles.main}
          >
            {!isEmptyCart && (
              <View>
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
              </View>
            )}
            {!isEmptyCart && <View style={{ flex: 1 }} />}
          </View>
        )}
        {!isEmptyCart && (
          <View className={styles.overview}>
            <View
              className={styles.overviewSelectAll}
              onClick={() => this.onPressSelectAllHandle()}
            >
              <View
                style={{
                  paddingLeft: WINDOW_WIDTH * 0.045,
                }}
              >
                {isEdit ? (
                  <CustomIcon
                    name={allSelectedDel ? 'roundcheckfill' : 'round'}
                    type={allSelectedDel ? 'roundcheckfill' : 'round'}
                    style={{
                      marginRight: WINDOW_WIDTH * 0.02,
                    }}
                    className={classNames(styles.overviewIcon, {
                      [styles.overviewIconSelectedDel]: !!allSelectedDel,
                    })}
                  />
                ) : (
                  <CustomIcon
                    name={allSelected ? 'roundcheckfill' : 'round'}
                    type={allSelected ? 'roundcheckfill' : 'round'}
                    style={{
                      marginRight: WINDOW_WIDTH * 0.02,
                    }}
                    className={classNames(styles.overviewIcon, {
                      [styles.overviewIconSelected]: !!allSelectedDel,
                    })}
                  />
                )}
              </View>
              <View
                style={{
                  paddingRight: WINDOW_WIDTH * 0.02,
                }}
                className={styles.overviewSelect}
              >
                {i18n.selectAll}
              </View>
            </View>
            <View className={styles.overviewPrice}>
              {!isEdit && `${priceFormat(totalMoney)} ${MONETARY}`}
            </View>
            <View onClick={() => this.onPressSubmitHandle()}>
              <View
                style={{
                  width: WINDOW_WIDTH * 0.25,
                }}
                className={classNames(styles.overviewSubmitText, {
                  [styles.overviewSubmitTextDel]: !!isEdit,
                })}
              >
                {isEdit ? i18n.delete : i18n.buy}
              </View>
            </View>
          </View>
        )}
        {!loading && isEmptyCart && (
          <EmptyState
            source={ouhrigdfnjsoeijehrJpg}
            text={i18n.noData}
            styleText={{ marginBottom: 0 }}
          />
        )}
      </View>
    );
  }
}

export default connect(
  (state, props) => {
    const { cart } = state;

    return {
      authUser: getLoginUser(state, props),
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

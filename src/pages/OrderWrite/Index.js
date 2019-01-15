/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { i18n, View } from '@src/API';
import { Modal, ActionSheet } from 'antd-mobile';
import BYHeader from '@src/components/BYHeader';
import { getAddressSelectedItem, getLoginUser } from '@src/common/selectors';
import router from 'umi/lib/router';
import qs from 'qs';

import Loader from '@src/components/Loader';
import SeparateBar from '@src/components/SeparateBar';
import Address from '@src/components/Address';
import ProductItem2 from '@src/components/ProductItem2';
import NavBar2 from '@src/components/NavBar2';
import * as addressActionCreators from '@src/common/actions/address';
import * as getUserInfoByIdActionCreators from '@src/common/actions/getUserInfoById';
import * as orderCreateActionCreators from '@src/common/actions/orderCreate';
import * as orderPayActionCreators from '@src/common/actions/orderPay';
import * as couponSelectActionCreators from '@src/common/actions/couponSelect';
import * as modalActionCreators from '@src/common/actions/modal';
import * as productDetailInfoActionCreators from '@src/common/actions/productDetailInfo';
import * as judgeVoucherActionCreators from '@src/common/actions/judgeVoucher';
import {
  addEventListenerBuyoo,
  removeEventListenerBuyoo,
  orderWritePayWayArray,
  payWayToText,
  localStorageGetItem,
} from '@src/utils';
import {
  SCREENS,
  SIDEINTERVAL,
  MONETARY,
  WINDOW_HEIGHT,
  ONLINE_PAYWAY,
  ONDELIVERY_PAYWAY,
  LOCALSTORAGE_INVITE,
} from '@src/common/constants';
import priceFormat from '@src/utils/priceFormat';
import MustLogin from '@src/components/MustLogin';

import styles from './index.less';

class OrderWrite extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      payWayButtons: orderWritePayWayArray(),
      payWayIndex: ONLINE_PAYWAY,
    };
    this.addEventListenerHandle = this.addEventListenerHandle.bind(this);
    this.getInviteID = this.getInviteID.bind(this);
  }

  componentDidMount() {
    const {
      addressFetch,
      getUserInfoByIdFetch,
      productDetailInfoFetch,
      productDetailInfoClear,
      brandId,
      productIdVIP,
    } = this.props;

    addressFetch();
    getUserInfoByIdFetch();

    productDetailInfoClear(brandId);
    productDetailInfoFetch({
      brandId,
      propertiesIds: '',
      productIdVIP,
      screen: 'ProductDetailMain',
    });

    addEventListenerBuyoo(SCREENS.OrderWrite, this.addEventListenerHandle);
  }

  componentWillUnmount() {
    removeEventListenerBuyoo(SCREENS.OrderWrite, this.addEventListenerHandle);
  }

  getInviteID() {
    let result = '';

    const { authUser } = this.props;
    if (!authUser) return router.push('/Login');

    let localStorageInvite = localStorageGetItem(LOCALSTORAGE_INVITE);
    if (localStorageInvite) {
      localStorageInvite = JSON.parse(localStorageInvite);
      if (Date.now() <= localStorageInvite.validTime) {
        // 时间有效
        result = localStorageInvite.inviteID;
      }
    }

    return result;
  }

  addEventListenerHandle = ({ detail: { method, params } }) => {
    const { payWayIndex } = this.state;
    const { orderPayFetch } = this.props;
    switch (method) {
      case 'orderCreate':
        if (payWayIndex === ONDELIVERY_PAYWAY) {
          // 货到付款，自动下单
          orderPayFetch({
            orderno: params.orderNo,
            tradeno: params.tradeNo,
            payway: ONDELIVERY_PAYWAY,
            paypassword: '',
            payrate: 100,
            repaymentmonth: 0,
            payvalue: 0,
            screen: SCREENS.OrderWrite,
          });
        } else {
          // 线上付款，转跳付款页面
          router.push(`/${SCREENS.Pay}?${qs.stringify(params)}`);
        }
        break;

      case 'orderPay':
        // （货到付款）提交订单成功
        Modal.alert('', i18n.submitOrderSuccessfully, [
          {
            text: i18n.confirm,
            style: 'default',
            onPress: () => {
              router.push(
                `/${SCREENS.OrderDetail}?${qs.stringify({
                  tradeNo: params.tradeno,
                  orderNo: params.orderno,
                  from: SCREENS.OrderWrite,
                })}`,
              );
            },
          },
        ]);
        break;

      default:
        break;
    }
  };

  showActionSheet = () => {
    const { payWayButtons } = this.state;

    const BUTTONS = [...payWayButtons.map(val => val.value), i18n.cancel];
    ActionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        message: i18n.paymentMethod,
        maskClosable: true,
      },
      buttonIndex => {
        if (buttonIndex !== payWayButtons.length) {
          this.setState({
            payWayIndex: payWayButtons[buttonIndex].key,
          });
        }
      },
    );
  };

  handleOnPressAddress() {
    const { authUser } = this.props;

    if (!authUser) return router.push('/Login');

    return router.push('/Address?isSelect=true');
  }

  handleOnPressCoupon() {
    const { isCart, cartProducts, authUser, detailItem } = this.props;

    if (!authUser) return router.push('/Login');

    let products; // 请求judgeVoucher接口所需参数

    if (isCart) {
      products = cartProducts;
    } else {
      products = [
        {
          id: detailItem.id,
          amount: detailItem.price * detailItem.productDetailNumber,
        },
      ];
    }

    return router.push(
      `/CouponSelect?${qs.stringify({
        products: JSON.stringify(products),
      })}`,
    );
  }

  handleOnPressSubmit() {
    const {
      addressSelectedId,
      authUser,
      detailItem,
      cartAdverstInfo,
      isCart,
      orderCreateFetch,
      groupon,
    } = this.props;

    if (!authUser) return router.push('/Login');

    const getGoodsdetail = () => {
      if (isCart) {
        return cartAdverstInfo.map(val => {
          val.rechargeaccount = '';
          val.rechargecode = '';
          val.repaymentamount = 0;
          return {
            number: val.number,
            cartitemid: val.cartitemid,
            productid: val.productid,
            rechargeaccount: '',
            rechargecode: '',
            repaymentamount: 0,
          };
        });
      }
      return [
        {
          number: detailItem.productDetailNumber,
          cartitemid: 0,
          productid: detailItem.id,
          rechargeaccount: '',
          rechargecode: '',
          repaymentamount: 0,
        },
      ];
    };

    const getSubject = () => {
      let result = '';
      if (isCart) {
        result = cartAdverstInfo.map(val => val.name).join('_');
      } else {
        result = detailItem.name;
      }
      return result;
    };

    const getCoupondetail = () => {
      const {
        couponSelectItem,
        // couponSelectItem,
      } = this.props;

      if (!couponSelectItem.id) return '';
      return JSON.stringify({
        couponcard: couponSelectItem.cardno,
        couponpassword: couponSelectItem.pincode,
        couponbrandid: couponSelectItem.brandId,
        coupontypeid: couponSelectItem.typeId,
        couponproductid: couponSelectItem.productId,
        coupontype: couponSelectItem.voucherType,
        couponvalue: couponSelectItem.voucherValue,
      });
    };

    const getObject = () => {
      let result;
      if (groupon) {
        result = {
          screen: SCREENS.OrderWrite,
          ordertype: isCart ? '3' : '2',
          addrid: addressSelectedId.toString(),
          goodsdetail: '',
          mergedetail: JSON.stringify({
            mergeorderid: '',
            mergemasterid: '',
            mergename: '',
            mergepersonnum: '',
            mergeheadimage: '',
            mergedesc: '',
            mergeusername: '',
          }),
          coupondetail: getCoupondetail(),
          subject: getSubject(isCart),
          invitefunid: this.getInviteID(),
        };
      } else {
        result = {
          screen: SCREENS.OrderWrite,
          ordertype: isCart ? '3' : '2',
          addrid: addressSelectedId.toString(),
          goodsdetail: JSON.stringify(getGoodsdetail()),
          mergedetail: '',
          coupondetail: getCoupondetail(),
          subject: getSubject(isCart),
          invitefunid: this.getInviteID(),
        };
      }
      return result;
    };

    if (addressSelectedId === 0) {
      Modal.alert('', i18n.pleaseSelectourShippingAddress, [
        { text: i18n.confirm, style: 'default' },
      ]);
      return false;
    }

    return orderCreateFetch(getObject());
  }

  calcMoney() {
    const {
      isCart,
      cartAdverstInfo,
      detailItem: { price, productDetailNumber },
      couponSelectItem,
    } = this.props;
    let money = 0;

    if (isCart) {
      // money
      if (cartAdverstInfo.length === 1) {
        money = cartAdverstInfo[0].price * cartAdverstInfo[0].number;
      } else {
        money = cartAdverstInfo.reduce((a, b, index) => {
          let result;
          if (index === 1) {
            const aTotalMoney = a.price * a.number;
            const bTotalMoney = b.price * b.number;
            result = aTotalMoney + bTotalMoney;
          } else {
            const bTotalMoney = b.price * b.number;
            result = a + bTotalMoney;
          }
          return result;
        });
      }
    } else {
      money = productDetailNumber * price;
    }

    if (couponSelectItem.id) {
      if (couponSelectItem.voucherType === 0) {
        // 打折券
        money *= couponSelectItem.voucherValue * 0.01;
      } else {
        money -= couponSelectItem.voucherValue;
      }
    }

    return priceFormat(money);
  }

  renderBottom() {
    // const stylesX = {
    //   nav: {
    //     display: 'flex',
    //     flex-direction: row,
    //     border-top-width: 1,
    //     border-top-color: BORDER_COLOR,
    //     border-top-style: 'solid',
    //   },
    //   navLeft: {
    //     flex: 2,
    //   },
    //   navLeftBottom: {
    //     color: RED_COLOR,
    //     font-size: 18,
    //     padding-left: SIDEINTERVAL,
    //     font-weight: 700,
    //     height: 50,
    //     line-height: '50px',
    //   },
    //   navRight: {
    //     flex: 1,
    //     height: 50,
    //     line-height: '50px',
    //     text-align: center,
    //     color: #fff,
    //     background-color: PRIMARY_COLOR,
    //   },
    // };

    return (
      <View className={styles.nav}>
        <View className={styles.navLeft}>
          <View
            style={{
              paddingLeft: SIDEINTERVAL,
            }}
            className={styles.navLeftBottom}
          >
            {`${this.calcMoney()} ${MONETARY}`}
          </View>
        </View>
        <View
          className={styles.navRight}
          onClick={() => this.handleOnPressSubmit()}
        >
          {i18n.submitOrder}
        </View>
      </View>
    );
  }

  renderContent() {
    const { payWayIndex } = this.state;

    const {
      isCart,
      cartAdverstInfo,
      addressSelectedItem,
      detailItem,
      getUserInfoByIdLoading,
      orderpayLoading,
      orderCreateLoading,
      couponSelectItem,
      addressLoaded,
      getUserInfoByIdLoaded,
    } = this.props;

    const adverstInfo = isCart
      ? cartAdverstInfo
      : [
          {
            brandId: detailItem.brandId,
            propertiesIds: detailItem.propertiesIds,
            imageUrl:
              detailItem.imageUrls[0] && detailItem.imageUrls[0].imageUrl,
            name: detailItem.name,
            price: detailItem.price,
            number: detailItem.productDetailNumber,
            isOnPress: false,
          },
        ];

    if (addressLoaded === false || getUserInfoByIdLoaded === false)
      return <Loader />;

    return (
      <View
        style={{
          height: WINDOW_HEIGHT - 45,
        }}
        className={styles.container}
      >
        {(getUserInfoByIdLoading || orderCreateLoading || orderpayLoading) && (
          <Loader />
        )}
        <View className={styles.main}>
          <Address
            addressSelectedItem={addressSelectedItem}
            onClick={() => this.handleOnPressAddress()}
          />
          <SeparateBar />
          <ProductItem2
            data={adverstInfo}
            stylePricePrice={{ color: '#666' }}
            isShowNumber
          />
          <SeparateBar />
          <NavBar2
            onClick={() => this.showActionSheet()}
            valueLeft={i18n.paymentMethod}
            valueMiddle={payWayToText(payWayIndex)}
          />
          <NavBar2
            onClick={() => this.handleOnPressCoupon()}
            valueLeft={i18n.coupon}
            valueMiddle={
              couponSelectItem.id ? couponSelectItem.voucherName : ''
            }
          />
        </View>
        {this.renderBottom()}
      </View>
    );
  }

  render() {
    const { authUser } = this.props;
    return (
      <View className={styles.containerRender}>
        <BYHeader title={i18n.fillOrder} />
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          i18n={i18n}
          router={router}
          SCREENS={SCREENS}
        />
        {this.renderContent()}
      </View>
    );
  }
}

export default connect(
  (state, props) => {
    const {
      address,
      getUserInfoById,
      orderCreate,
      productDetailInfo,
      couponSelect,
      orderPay,
    } = state;
    const {
      location: { query = {} },
    } = props;
    const { brandId, id } = query;
    const { mergeMasterInfo, isCart, products, adverstInfo } = query;
    const detailItem = productDetailInfo.item;
    return {
      orderCreateLoading: orderCreate.loading,
      getUserInfoByIdLoading: getUserInfoById.loading,
      orderpayLoading: orderPay.loading,
      couponSelectItem: couponSelect.item,
      groupon: false,
      mergeMasterInfo,
      isCart,
      brandId,
      productIdVIP: id,
      cartProducts: products && JSON.parse(products),
      cartAdverstInfo: adverstInfo && JSON.parse(adverstInfo),
      detailItem,
      orderCreate,
      addressSelectedItem: getAddressSelectedItem(state, props),
      addressItems: address.items,
      addressSelectedId: address.addressSelectedId,
      authUser: getLoginUser(state, props),
      getUserInfoById,
      getUserInfoByIdLoaded: getUserInfoById.loaded,
      userType: getUserInfoById.item.userType || null,
    };
  },
  {
    ...addressActionCreators,
    ...getUserInfoByIdActionCreators,
    ...orderCreateActionCreators,
    ...orderPayActionCreators,
    ...couponSelectActionCreators,
    ...modalActionCreators,
    ...productDetailInfoActionCreators,
    ...judgeVoucherActionCreators,
  },
)(OrderWrite);

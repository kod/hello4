import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import { Modal, ActionSheet } from 'antd-mobile';
import BYHeader from '@/components/BYHeader';
import { getAddressSelectedItem } from '@/common/selectors';
import router from 'umi/router';
import qs from 'qs';

import Loader from '@/components/Loader';
import SeparateBar from '@/components/SeparateBar';
import Address from '@/components/Address';
import ProductItem2 from '@/components/ProductItem2';
import NavBar2 from '@/components/NavBar2';
import * as addressActionCreators from '@/common/actions/address';
import * as getUserInfoByIdActionCreators from '@/common/actions/getUserInfoById';
import * as orderCreateActionCreators from '@/common/actions/orderCreate';
import * as orderPayActionCreators from '@/common/actions/orderPay';
import * as couponSelectActionCreators from '@/common/actions/couponSelect';
import * as modalActionCreators from '@/common/actions/modal';
import {
  addEventListener,
  removeEventListener,
  orderWritePayWayArray,
  payWayToText,
} from '@/utils';
import {
  SCREENS,
  SIDEINTERVAL,
  MONETARY,
  WINDOW_HEIGHT,
  ONLINE_PAYWAY,
  ONDELIVERY_PAYWAY,
  ORDERCREATE_NAMESPACE,
  GETUSERINFOBYID_NAMESPACE,
  ORDERPAY_NAMESPACE,
} from '@/common/constants';
import priceFormat from '@/utils/priceFormat';
import { BORDER_COLOR, RED_COLOR, PRIMARY_COLOR } from '@/styles/variables';
import MustLogin from '@/components/MustLogin';
import {
  ORDER_CREATE,
  GET_USERINFO_BYID,
  ORDER_PAY,
} from '@/common/constants/actionTypes';

@connect(
  (state, props) => {
    const {
      address,
      getUserInfoById,
      orderCreate,
      productDetailInfo,
      couponSelect,
      login,
      loading,
    } = state;
    const {
      location: { query = {} },
    } = props;
    const { mergeMasterInfo, isCart, products, adverstInfo } = query;
    const detailItem = productDetailInfo.item;
    return {
      orderCreateLoading:
        loading.effects[`${ORDERCREATE_NAMESPACE}/${ORDER_CREATE.REQUEST}`],
      getUserInfoByIdLoading:
        loading.effects[
          `${GETUSERINFOBYID_NAMESPACE}/${GET_USERINFO_BYID.REQUEST}`
        ],
      orderpayLoading:
        loading.effects[`${ORDERPAY_NAMESPACE}/${ORDER_PAY.REQUEST}`],
      couponSelectItem: couponSelect.item,
      groupon: false,
      mergeMasterInfo,
      isCart,
      cartProducts: products,
      cartAdverstInfo: adverstInfo,
      detailItem,
      orderCreate,
      addressSelectedItem: getAddressSelectedItem(state, props),
      addressItems: address.items,
      addressSelectedId: address.addressSelectedId,
      funid: state.login.user ? state.login.user.result : null,
      authUser: login.user,
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
  },
)
class OrderWrite extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      payWayButtons: orderWritePayWayArray(),
      payWayIndex: ONLINE_PAYWAY,
    };
  }

  componentDidMount() {
    const { addressFetch, getUserInfoByIdFetch } = this.props;

    addressFetch();
    getUserInfoByIdFetch();

    addEventListener(SCREENS.OrderWrite, this.addEventListenerHandle);
  }

  componentWillUnmount() {
    removeEventListener(SCREENS.OrderWrite, this.addEventListenerHandle);
  }

  addEventListenerHandle = ({ method, params = {} }) => {
    const { payWayIndex } = this.state;
    const { orderPayFetch } = this.props;
    console.log(method);
    console.log(params);
    switch (method) {
      case 'orderCreateSuccess':
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
        Modal.alert('', formatMessage({ id: 'submitOrderSuccessfully' }), [
          {
            text: formatMessage({ id: 'confirm' }),
            style: 'default',
            onPress: () => {
              router.push(
                `/${SCREENS.OrderDetail}?${qs.stringify({
                  tradeNo: params.tradeno,
                  orderNo: params.orderno,
                })}`,
              );

              console.log('（货到付款）提交订单成功');
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

    const BUTTONS = [
      ...payWayButtons.map(val => val.value),
      formatMessage({ id: 'cancel' }),
    ];
    ActionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        message: formatMessage({ id: 'paymentMethod' }),
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
        };
      }
      return result;
    };

    if (addressSelectedId === 0) {
      Modal.alert('', formatMessage({ id: 'pleaseSelectourShippingAddress' }), [
        { text: formatMessage({ id: 'confirm' }), style: 'default' },
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
    const stylesX = {
      nav: {
        display: 'flex',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: BORDER_COLOR,
      },
      navLeft: {
        flex: 2,
      },
      navLeftBottom: {
        color: RED_COLOR,
        fontSize: 18,
        paddingLeft: SIDEINTERVAL,
        fontWeight: '700',
        height: 50,
        lineHeight: '50px',
      },
      navRight: {
        flex: 1,
        height: 50,
        lineHeight: '50px',
        textAlign: 'center',
        color: '#fff',
        backgroundColor: PRIMARY_COLOR,
      },
    };

    return (
      <div style={stylesX.nav}>
        <div style={stylesX.navLeft}>
          <div style={stylesX.navLeftBottom}>
            {`${this.calcMoney()} ${MONETARY}`}
          </div>
        </div>
        <div
          style={stylesX.navRight}
          onClick={() => this.handleOnPressSubmit()}
        >
          {formatMessage({ id: 'submitOrder' })}
        </div>
      </div>
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

    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        height: WINDOW_HEIGHT - 45,
      },
      main: {
        flex: 1,
        overflowX: 'auto',
      },
    };

    if (addressLoaded === false || getUserInfoByIdLoaded === false)
      return <Loader />;

    return (
      <div style={styles.container}>
        {(getUserInfoByIdLoading || orderCreateLoading || orderpayLoading) && (
          <Loader />
        )}
        <div style={styles.main}>
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
            valueLeft={formatMessage({ id: 'paymentMethod' })}
            valueMiddle={payWayToText(payWayIndex)}
          />
          <NavBar2
            onClick={() => this.handleOnPressCoupon()}
            valueLeft={formatMessage({ id: 'coupon' })}
            valueMiddle={
              couponSelectItem.id ? couponSelectItem.voucherName : ''
            }
          />
        </div>
        {this.renderBottom()}
      </div>
    );
  }

  render() {
    const { authUser } = this.props;
    const styles = {
      container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#fff',
      },
    };
    return (
      <div style={styles.container}>
        <BYHeader title={formatMessage({ id: 'fillOrder' })} />
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          formatMessage={formatMessage}
          router={router}
          SCREENS={SCREENS}
        />
        {this.renderContent()}
      </div>
    );
  }
}

export default OrderWrite;

import React from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import BYHeader from '@src/components/BYHeader';
import { i18n, View } from '@src/API';
import { Modal } from 'antd-mobile';
import router from 'umi/lib/router';
import qs from 'qs';

import * as addressActionCreators from '@src/common/actions/address';
import * as queryOrderActionCreators from '@src/common/actions/queryOrder';
import * as orderPayActionCreators from '@src/common/actions/orderPay';
import * as getUserInfoByIdActionCreators from '@src/common/actions/getUserInfoById';
import * as orderCancelActionCreators from '@src/common/actions/orderCancel';
import * as modalActionCreators from '@src/common/actions/modal';
import {
  SIDEINTERVAL,
  WINDOW_WIDTH,
  MONETARY,
  SCREENS,
  MODAL_TYPES,
  WINDOW_HEIGHT,
} from '@src/common/constants';
import {
  tradeStatusCodes,
  payWayToText,
  addEventListenerBuyoo,
  removeEventListenerBuyoo,
} from '@src/utils';
import SeparateBar from '@src/components/SeparateBar';
import ProductItem2 from '@src/components/ProductItem2';
import priceFormat from '@src/utils/priceFormat';
import NavBar2 from '@src/components/NavBar2';
import MustLogin from '@src/components/MustLogin';
import Loader from '@src/components/Loader';
import Address from '@src/components/Address';
import { getAddressSelectedItem, getLoginUser } from '@src/common/selectors';

import styles from './index.less';
import navStyles from './nav.less';
import cardStyles from './card.less';
import orderNoStyles from './orderNo.less';

class OrderDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      payWayIndex: 0,
    };
    this.addEventListenerPopstate = this.addEventListenerPopstate.bind(this);
  }

  componentDidMount() {
    const {
      addressFetch,
      orderNo,
      tradeNo,
      queryOrderFetch,
      queryOrderClear,
      getUserInfoByIdFetch,
      locationPathname,
      locationSearch,
    } = this.props;

    router.push(`${locationPathname}${locationSearch}#123`);

    addEventListenerBuyoo(SCREENS.OrderDetail, this.addEventListenerHandle);
    addEventListenerBuyoo('popstate', this.addEventListenerPopstate);

    queryOrderClear();

    // 1分钟请求一次，刷新订单信息
    this.setIntervalId = setInterval(() => {
      queryOrderFetch({
        orderNo,
        tradeNo,
      });
    }, 60 * 1000);

    addressFetch();
    getUserInfoByIdFetch();

    queryOrderFetch({
      orderNo,
      tradeNo,
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      loading: prevLoading,
      queryOrderItem: prevQueryOrderItem,
    } = this.props;
    const { loading, openModal, closeModal, queryOrderItem } = nextProps;

    if (
      prevQueryOrderItem.payWay !== queryOrderItem.payWay &&
      queryOrderItem.payWay !== 0
    ) {
      this.setState({
        payWayIndex: queryOrderItem.payWay,
      });
    }

    if (prevLoading !== loading) {
      if (loading === false) {
        closeModal();
      } else {
        openModal(MODAL_TYPES.LOADER);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.setIntervalId);
    removeEventListenerBuyoo(SCREENS.OrderDetail, this.addEventListenerHandle);
    removeEventListenerBuyoo('popstate', this.addEventListenerPopstate);
  }

  addEventListenerHandle = ({ detail: { method } }) => {
    const { orderNo, tradeNo, queryOrderClear, queryOrderFetch } = this.props;
    switch (method) {
      case 'orderCancel':
        queryOrderClear();
        queryOrderFetch({
          orderNo,
          tradeNo,
        });
        break;

      default:
        break;
    }
  };

  addEventListenerPopstate = () => {
    this.handleOnPressBack();
  };

  makeRemainTimeText = val => {
    let result = '';
    const remainAllSeconds = (Date.parse(val) - Date.now()) / 1000; // 剩余的秒数
    if (remainAllSeconds > 0) {
      const remainDays = ~~(remainAllSeconds / (3600 * 24)); // 剩余天数
      const remainHours = ~~((remainAllSeconds % (3600 * 24)) / 3600); // 剩余小时数
      const remainMinutes = ~~(((remainAllSeconds % (3600 * 24)) % 3600) / 60); // 剩余分钟数
      if (remainDays > 0) {
        result = i18n.remainTime1
          .replace('$days$', remainDays)
          .replace('$hours$', remainHours)
          .replace('$minutes$', remainMinutes);
      } else if (remainHours > 0) {
        result = i18n.remainTime2
          .replace('$hours$', remainHours)
          .replace('$minutes$', remainMinutes);
      } else if (remainMinutes > 0) {
        result = i18n.remainTime3.replace('$minutes$', remainMinutes);
      } else {
        // 小于60秒
        result = i18n.remainTime3.replace('$minutes$', 1);
      }
    } else {
      // 已过期
    }
    return result;
  };

  async handleOnPressCopy(/* val */) {
    const { authUser } = this.props;

    if (authUser) {
      // Clipboard.setString(val);
      Modal.alert('', i18n.successfulCopy, [
        {
          text: i18n.confirm,
          style: 'default',
          onPress: () => {
            router.go(-1);
          },
        },
      ]);
    }
  }

  handleOnPressCancel() {
    const { orderCancelFetch, orderNo, tradeNo } = this.props;

    Modal.alert('', i18n.confirmDelete, [
      {
        text: i18n.cancel,
      },
      {
        text: i18n.confirm,
        style: 'default',
        onPress: () => {
          orderCancelFetch({
            screen: SCREENS.OrderDetail,
            orderno: orderNo,
            tradeno: tradeNo,
            status: '40000',
          });
        },
      },
    ]);
  }

  handleOnPressBack() {
    const { from } = this.props;
    switch (from) {
      case SCREENS.Pay:
        router.go(-3);
        break;

      case SCREENS.OrderWrite:
        router.go(-2);
        break;

      default:
        router.go(-1);
        break;
    }
  }

  renderBottom() {
    const {
      queryOrderItem: {
        tradeStatus,
        payWay,
        totalAmount = 0,
        payRate,
        repaymentMonth,
      },
      tradeNo,
      orderNo,
    } = this.props;

    return (
      <View className={navStyles.nav}>
        <View className={navStyles.navLeft}>
          <View className={navStyles.navLeftTop}>{i18n.subtotal}</View>
          <View className={navStyles.navLeftBottom}>{`${priceFormat(
            totalAmount,
          )} ${MONETARY}`}</View>
        </View>
        {tradeStatus === '10000' && (
          <View
            className={navStyles.navCancel}
            onClick={() => this.handleOnPressCancel()}
          >
            {i18n.cancelOrder}
          </View>
        )}
        {tradeStatus === '10000' && (
          <View
            className={navStyles.navRight}
            onClick={() =>
              payWay === 5
                ? router.push(
                    `/${SCREENS.PaymentCode}?${qs.stringify({
                      orderNo,
                      tradeNo,
                      payway: payWay,
                      payrate: payRate,
                      repaymentmonth: repaymentMonth,
                      totalAmount,
                    })}`,
                  )
                : router.push(
                    `/${SCREENS.Pay}?${qs.stringify({
                      tradeNo,
                      orderNo,
                    })}`,
                  )
            }
          >
            {payWay === 5 ? i18n.viewPaymentCode : i18n.payment}
          </View>
        )}
      </View>
    );
  }

  renderCard() {
    const {
      queryOrderItem: { rechargeCard },
    } = this.props;

    return (
      <View
        style={{
          paddingLeft: SIDEINTERVAL,
          paddingRight: SIDEINTERVAL,
        }}
        className={cardStyles.card}
      >
        <View className={cardStyles.cardMain}>
          {rechargeCard &&
            rechargeCard.map(val => (
              <View
                style={{
                  paddingLeft: SIDEINTERVAL,
                  paddingRight: SIDEINTERVAL,
                }}
                className={cardStyles.cardItem}
                key={val.cardCode}
              >
                <View className={cardStyles.cardItemText}>{i18n.cardNum}</View>
                <View className={cardStyles.cardItemValue}>
                  <View className={cardStyles.cardItemNumber}>
                    {val.cardCode}
                  </View>
                  <View
                    style={{
                      minWidth: WINDOW_WIDTH * 0.1,
                      paddingLeft: WINDOW_WIDTH * 0.03,
                      paddingRight: WINDOW_WIDTH * 0.03,
                    }}
                    className={cardStyles.cardItemCopy}
                  >
                    <View
                      className={cardStyles.cardItemCopyText}
                      onClick={() => this.handleOnPressCopy(val.cardCode)}
                    >
                      {i18n.copy}
                    </View>
                  </View>
                </View>
                <View className={cardStyles.cardItemText}>{i18n.password}</View>
                <View className={cardStyles.cardItemValue}>
                  <View className={cardStyles.cardItemNumber}>
                    {val.cardPassword}
                  </View>
                  <View className={cardStyles.cardItemCopy}>
                    <View
                      className={cardStyles.cardItemCopyText}
                      onClick={() => this.handleOnPressCopy(val.cardPassword)}
                    >
                      {i18n.copy}
                    </View>
                  </View>
                </View>
                <View className={cardStyles.cardItemTime}>
                  {`${i18n.usefulDate}: ${dayjs().format('DD-MM-YYYY')}`}
                </View>
              </View>
            ))}
        </View>
      </View>
    );
  }

  renderOrderNo() {
    const {
      queryOrderItem: { orderNo },
    } = this.props;
    return (
      <View className={orderNoStyles.orderNo}>
        <View
          style={{
            paddingLeft: SIDEINTERVAL,
          }}
          className={orderNoStyles.orderNoTitle}
        >{`${i18n.orderNumber}:`}</View>
        <View
          style={{
            paddingLeft: SIDEINTERVAL,
            paddingRight: SIDEINTERVAL,
          }}
          className={orderNoStyles.orderNoMain}
        >
          <View className={orderNoStyles.orderNoLeft}>{orderNo}</View>
          {/* <SmallButton
            text={i18n.copy}
            onClick={() => this.handleOnPressCopy(orderNo)}
          /> */}
        </View>
      </View>
    );
  }

  renderContent() {
    const { payWayIndex } = this.state;

    const {
      getUserInfoByIdLoading,
      queryOrderItem: {
        totalAmount,
        goodsDetail,
        address,
        couponValue,
        username,
        msisdn,
        division1stName,
        division2ndName,
        division3rdName,
        division4thName,
        tradeStatus,
        sourceOrderType,
        timeoutExpress,
        createTime,
      },
    } = this.props;

    const addressSelectedItem = {
      id: 1,
      address,
      username,
      msisdn,
      division1stName,
      division2ndName,
      division3rdName,
      division4thName,
    };

    if (getUserInfoByIdLoading) return <Loader />;

    return (
      <View className={styles.container}>
        <View
          style={{
            height: WINDOW_HEIGHT - 45 - 55,
          }}
          className={styles.main}
        >
          <View
            style={{
              paddingLeft: SIDEINTERVAL,
              paddingRight: SIDEINTERVAL,
              paddingTop: SIDEINTERVAL,
              paddingBottom: SIDEINTERVAL,
            }}
            className={styles.status}
          >
            <View className={styles.statusText}>
              {tradeStatusCodes(tradeStatus)}
            </View>
            {parseInt(tradeStatus, 10) === 10000 && (
              <View className={styles.statusTime}>
                {this.makeRemainTimeText(timeoutExpress)}
              </View>
            )}
          </View>
          {sourceOrderType !== 3 && (
            <Address addressSelectedItem={addressSelectedItem} />
          )}
          <SeparateBar />
          <ProductItem2
            data={goodsDetail}
            stylePricePrice={{ color: '#666' }}
            isShowNumber
            isPress={sourceOrderType !== 3}
          />
          <View
            style={{
              paddingLeft: SIDEINTERVAL,
              paddingRight: SIDEINTERVAL,
            }}
            className={styles.totalPrice}
          >
            {`${priceFormat(totalAmount + couponValue)} ${MONETARY}`}
          </View>
          <SeparateBar />
          {tradeStatus !== '10000' && (
            <NavBar2
              isShowRight={false}
              valueLeft={i18n.paymentMethod}
              valueMiddle={payWayToText(payWayIndex)}
            />
          )}
          <NavBar2
            // onClick={() => this.handleOnPressToggleBottomSheet()}
            valueLeft={i18n.couponValue}
            valueMiddle={couponValue}
            isShowRight={false}
          />
          <NavBar2
            valueLeft={i18n.orderTime}
            valueMiddle={`${dayjs(createTime).format('DD-MM-YYYY HH:mm:ss')}`}
            isShowRight={false}
          />
          {this.renderOrderNo()}
          <View style={{ height: 5 }} />
          {/* {this.renderCard()} */}
        </View>
        {this.renderBottom()}
      </View>
    );
  }

  render() {
    const { authUser } = this.props;
    return (
      <View className={styles.container}>
        <BYHeader
          title={i18n.details}
          // onPressBackButton={() => this.handleOnPressBack()}
        />
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
    const { address, queryOrder, getUserInfoById, orderPay } = state;
    const {
      location: {
        query: { orderNo, tradeNo, from = '' },
        pathname: locationPathname,
        search: locationSearch,
      },
    } = props;

    return {
      loading: orderPay.loading,
      addressSelectedItem: getAddressSelectedItem(state, props),
      addressItems: address.items,
      authUser: getLoginUser(state, props),
      queryOrderItem: queryOrder.item,
      locationPathname,
      locationSearch,
      from,
      orderNo,
      tradeNo,
      getUserInfoById,
      getUserInfoByIdLoading: getUserInfoById.loading,
      initPassword: getUserInfoById.item.initPassword || null,
      userType: getUserInfoById.item.userType || null,
    };
  },
  {
    ...addressActionCreators,
    ...queryOrderActionCreators,
    ...orderPayActionCreators,
    ...getUserInfoByIdActionCreators,
    ...orderCancelActionCreators,
    ...modalActionCreators,
  },
)(OrderDetail);

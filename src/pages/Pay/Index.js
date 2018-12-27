/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { formatMessage } from 'umi/locale';
import { Modal, ActionSheet } from 'antd-mobile';
import qs from 'qs';
import router from 'umi/router';

import BYHeader from '@/components/BYHeader';
import Loader from '@/components/Loader';

import * as orderPayActionCreators from '@/common/actions/orderPay';
import * as queryOrderActionCreators from '@/common/actions/queryOrder';
import * as modalActionCreators from '@/common/actions/modal';
import {
  MONETARY,
  SCREENS,
  INTERNET_BANK_PAYWAY,
  OFFLINE_PAYWAY,
  WINDOW_HEIGHT,
  CREDIT_PAYWAY,
  ORDERPAY_NAMESPACE,
  DEBUG,
  BUYOO,
} from '@/common/constants';
import {
  payWayArray,
  addEventListener,
  removeEventListener,
  submitDuplicateFreeze,
  payWayToText,
  localStorageGetItem,
} from '@/utils';
import priceFormat from '@/utils/priceFormat';
import NavBar2 from '@/components/NavBar2';
import SeparateBar from '@/components/SeparateBar';
import BYButton from '@/components/BYButton';
import MustLogin from '@/components/MustLogin';
import { ORDER_PAY } from '@/common/constants/actionTypes';
import { o } from '@/utils/AuthEncrypt';

class Pay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitfreeze: false,
      payWayButtons: payWayArray(DEBUG),
      payWayIndex: INTERNET_BANK_PAYWAY,
    };
    this.addEventListenerHandle = this.addEventListenerHandle.bind(this);
  }

  componentDidMount() {
    const { orderNo, tradeNo, queryOrderFetch, queryOrderClear } = this.props;

    queryOrderClear();

    addEventListener(SCREENS.Pay, this.addEventListenerHandle);

    queryOrderFetch({
      orderNo,
      tradeNo,
    });
    return true;
  }

  componentWillUnmount() {
    removeEventListener(SCREENS.Pay, this.addEventListenerHandle);
    clearTimeout(this.setTimeoutId);
  }

  addEventListenerHandle = ({ detail: { method, params } }) => {
    const { orderNo, tradeNo, queryOrderFetch } = this.props;
    switch (method) {
      case 'orderPay':
        queryOrderFetch({
          orderNo,
          tradeNo,
        });
        if (params.payway === OFFLINE_PAYWAY) {
          // 线下支付
          router.push(
            `/${SCREENS.PaymentCode}?${qs.stringify({
              orderNo,
              tradeNo,
              payway: params.payway,
              payrate: 0,
              repaymentmonth: 0,
              totalAmount: params.payvalue,
              from: SCREENS.Pay,
            })}`,
          );
        } else {
          Modal.alert('', formatMessage({ id: 'success' }), [
            {
              text: formatMessage({ id: 'confirm' }),
              style: 'default',
              onPress: () => {
                router.push(
                  `/${SCREENS.OrderDetail}?${qs.stringify({
                    tradeNo: params.tradeno,
                    orderNo: params.orderno,
                    from: SCREENS.Pay,
                  })}`,
                );
              },
            },
          ]);
        }
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

  // actionSheetCallback(ret) {
  //   const { payWayButtons } = this.state;
  //   if (ret.buttonIndex === -1) return false;
  //   return this.setState({
  //     payWayIndex: payWayButtons[ret.buttonIndex].key,
  //   });
  // }

  handleOnPressToggleModal(key, val) {
    const {
      key: [key1],
      // [key],
    } = this.state;
    this.setState({
      [key]: typeof val !== 'boolean' ? !key1 : val,
    });
  }

  handleOnPressSubmit() {
    const { submitfreeze, payWayIndex } = this.state;
    const {
      orderPayFetch,
      queryOrderItem: { totalAmount, orderNo, tradeNo },
    } = this.props;

    switch (payWayIndex) {
      case INTERNET_BANK_PAYWAY: // 网银
      case OFFLINE_PAYWAY: // 线下支付
      case CREDIT_PAYWAY: // 余额
        submitDuplicateFreeze(submitfreeze, this, () => {
          orderPayFetch({
            orderno: orderNo,
            tradeno: tradeNo,
            payway: payWayIndex,
            paypassword: DEBUG ? 'mmmmmmmm' : '',
            payrate: 0,
            repaymentmonth: 0,
            payvalue: totalAmount,
            screen: SCREENS.Pay,
            pop: payWayIndex === INTERNET_BANK_PAYWAY ? 2 : 1,
          });
        });
        break;

      default:
        break;
    }
    return true;
  }

  renderContent() {
    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        height: WINDOW_HEIGHT - 45,
      },
      main: {
        flex: 1,
      },
    };

    const { payWayIndex } = this.state;
    const {
      queryOrderItem: { totalAmount },
      queryOrderLoaded,
      cardQueryLoaded,
      orderpayLoading,
    } = this.props;

    if (queryOrderLoaded === false || cardQueryLoaded === false)
      return <Loader />;

    return (
      <div style={styles.container}>
        {orderpayLoading && <Loader />}
        <div style={styles.main}>
          <NavBar2
            valueLeft={formatMessage({ id: 'totalMoney' })}
            valueMiddle={`${priceFormat(totalAmount)} ${MONETARY}`}
            isShowRight={false}
          />
          <SeparateBar />
          <NavBar2
            onClick={() => this.showActionSheet()}
            valueLeft={formatMessage({ id: 'paymentMethod' })}
            valueMiddle={payWayToText(payWayIndex)}
            isShowBorderBottom
          />
        </div>
        <BYButton
          text={formatMessage({ id: 'payment' })}
          styleWrap={{ padding: 0 }}
          onClick={() => this.handleOnPressSubmit()}
        />
      </div>
    );
  }

  render() {
    const { authUser } = this.props;

    const styles = {
      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
    };
    return (
      <div style={styles.container}>
        <BYHeader />
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

export default connect(
  (state, props) => {
    const { queryOrder, loading } = state;

    const {
      location: {
        query: { orderNo, tradeNo },
      },
    } = props;

    return {
      authUser: o(localStorageGetItem, BUYOO),
      orderNo,
      tradeNo,
      queryOrderItem: queryOrder.item,
      queryOrderLoaded: queryOrder.loaded,
      orderpayLoading:
        loading.effects[`${ORDERPAY_NAMESPACE}/${ORDER_PAY.REQUEST}`],
    };
  },
  {
    ...orderPayActionCreators,
    ...queryOrderActionCreators,
    ...modalActionCreators,
  },
)(Pay);

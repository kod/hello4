/* eslint-disable react/no-array-index-key */
import React from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import BYHeader from '@/components/BYHeader';
import { formatMessage } from 'umi/locale';
import { Modal } from 'antd-mobile';
import router from 'umi/router';
import qs from 'qs';

import * as addressActionCreators from '@/common/actions/address';
import * as queryOrderActionCreators from '@/common/actions/queryOrder';
import * as orderPayActionCreators from '@/common/actions/orderPay';
import * as getUserInfoByIdActionCreators from '@/common/actions/getUserInfoById';
import * as orderCancelActionCreators from '@/common/actions/orderCancel';
import * as modalActionCreators from '@/common/actions/modal';
import { RED_COLOR, PRIMARY_COLOR, BORDER_COLOR } from '@/styles/variables';
import {
  SIDEINTERVAL,
  WINDOW_WIDTH,
  MONETARY,
  SCREENS,
  MODAL_TYPES,
  WINDOW_HEIGHT,
  BUYOO,
  ORDERPAY_NAMESPACE,
  GETUSERINFOBYID_NAMESPACE,
} from '@/common/constants';
import {
  tradeStatusCodes,
  payWayToText,
  addEventListener,
  removeEventListener,
  localStorageGetItem,
} from '@/utils';
import SeparateBar from '@/components/SeparateBar';
import ProductItem2 from '@/components/ProductItem2';
import priceFormat from '@/utils/priceFormat';
import NavBar2 from '@/components/NavBar2';
import MustLogin from '@/components/MustLogin';
import Loader from '@/components/Loader';
// import SmallButton from '@/components/SmallButton';
import Address from '@/components/Address';
import { getAddressSelectedItem } from '@/common/selectors';
import { o } from '@/utils/AuthEncrypt';
import { ORDER_PAY, GET_USERINFO_BYID } from '@/common/constants/actionTypes';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    overflowX: 'auto',
    height: WINDOW_HEIGHT - 45 - 55,
  },
  totalPrice: {
    height: 40,
    lineHeight: '40px',
    textAlign: 'right',
    color: RED_COLOR,
    fontSize: 14,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  title: {
    height: 40,
    lineHeight: '40px',
    paddingLeft: SIDEINTERVAL,
    color: '#333',
  },
  payment: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: SIDEINTERVAL,
    flexWrap: 'wrap',
  },
  paymentItem: {
    width: (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3,
    height: 40,
    lineHeight: '40px',
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
    marginRight: SIDEINTERVAL,
    marginBottom: SIDEINTERVAL,
    borderColor: '#eee',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  paymentItemActive: {
    color: '#fff',
    backgroundColor: PRIMARY_COLOR,
    borderWidth: 0,
  },
  alertIcon: {
    color: RED_COLOR,
    // backgroundColor: RED_COLOR,
    fontSize: 16,
  },
  status: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    paddingTop: SIDEINTERVAL,
    paddingBottom: SIDEINTERVAL,
    backgroundColor: '#E0E3EF',
    color: '#666',
    lineHeight: '24px',
  },
};

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

    addEventListener(SCREENS.OrderDetail, this.addEventListenerHandle);
    addEventListener('popstate', this.addEventListenerPopstate);

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
    removeEventListener('popstate', this.addEventListenerPopstate);
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
        result = formatMessage({ id: 'remainTime1' })
          .replace('$days$', remainDays)
          .replace('$hours$', remainHours)
          .replace('$minutes$', remainMinutes);
      } else if (remainHours > 0) {
        result = formatMessage({ id: 'remainTime2' })
          .replace('$hours$', remainHours)
          .replace('$minutes$', remainMinutes);
      } else if (remainMinutes > 0) {
        result = formatMessage({ id: 'remainTime3' }).replace(
          '$minutes$',
          remainMinutes,
        );
      } else {
        // 小于60秒
        result = formatMessage({ id: 'remainTime3' }).replace('$minutes$', 1);
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
      Modal.alert('', formatMessage({ id: 'successfulCopy' }), [
        {
          text: formatMessage({ id: 'confirm' }),
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

    Modal.alert('', formatMessage({ id: 'confirmDelete' }), [
      {
        text: formatMessage({ id: 'cancel' }),
      },
      {
        text: formatMessage({ id: 'confirm' }),
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
    const stylesX = {
      nav: {
        display: 'flex',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: BORDER_COLOR,
        borderTopStyle: 'solid',
      },
      navLeft: {
        flex: 1,
        height: 54,
      },
      navLeftTop: {
        color: RED_COLOR,
        fontSize: 11,
        textAlign: 'center',
        paddingTop: 5,
      },
      navLeftBottom: {
        color: RED_COLOR,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '700',
      },
      navCancel: {
        flex: 1,
        height: 55,
        lineHeight: '55px',
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#ccc',
      },
      navRight: {
        flex: 1,
        height: 55,
        lineHeight: '55px',
        textAlign: 'center',
        color: '#fff',
        backgroundColor: PRIMARY_COLOR,
      },
    };

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
      <div style={stylesX.nav}>
        <div style={stylesX.navLeft}>
          <div style={stylesX.navLeftTop}>
            {formatMessage({ id: 'subtotal' })}
          </div>
          <div style={stylesX.navLeftBottom}>{`${priceFormat(
            totalAmount,
          )} ${MONETARY}`}</div>
        </div>
        {tradeStatus === '10000' && (
          <div
            style={stylesX.navCancel}
            onClick={() => this.handleOnPressCancel()}
          >
            {formatMessage({ id: 'cancelOrder' })}
          </div>
        )}
        {tradeStatus === '10000' && (
          <div
            style={stylesX.navRight}
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
            {payWay === 5
              ? formatMessage({ id: 'viewPaymentCode' })
              : formatMessage({ id: 'payment' })}
          </div>
        )}
      </div>
    );
  }

  renderCard() {
    const stylesX = {
      card: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        marginBottom: 15,
      },
      cardMain: {
        backgroundColor: '#f5f6f7',
      },
      cardItem: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingTop: 10,
        paddingBottom: 5,
      },
      cardItemText: {
        fontSize: 12,
      },
      cardItemValue: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
      },
      cardItemNumber: {
        flex: 1,
        height: 25,
        lineHeight: '25px',
        color: '#333',
        fontWeight: '700',
      },
      cardItemCopy: {
        display: 'flex',
        height: 25,
        minWidth: WINDOW_WIDTH * 0.1,
        paddingLeft: WINDOW_WIDTH * 0.03,
        paddingRight: WINDOW_WIDTH * 0.03,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#0076F7',
        borderStyle: 'solid',
        marginRight: 1,
      },
      cardItemCopyText: {
        color: '#0076F7',
        fontSize: 11,
      },
      cardItemTime: {
        color: '#aaa',
        fontSize: 12,
        marginBottom: 10,
      },
    };

    const {
      queryOrderItem: { rechargeCard },
    } = this.props;

    return (
      <div style={stylesX.card}>
        <div style={stylesX.cardMain}>
          {rechargeCard &&
            rechargeCard.map(val => (
              <div style={stylesX.cardItem} key={val.cardCode}>
                <div style={stylesX.cardItemText}>
                  {formatMessage({ id: 'cardNum' })}
                </div>
                <div style={stylesX.cardItemValue}>
                  <div style={stylesX.cardItemNumber}>{val.cardCode}</div>
                  <div style={stylesX.cardItemCopy}>
                    <div
                      style={stylesX.cardItemCopyText}
                      onClick={() => this.handleOnPressCopy(val.cardCode)}
                    >
                      {formatMessage({ id: 'copy' })}
                    </div>
                  </div>
                </div>
                <div style={stylesX.cardItemText}>
                  {formatMessage({ id: 'password' })}
                </div>
                <div style={stylesX.cardItemValue}>
                  <div style={stylesX.cardItemNumber}>{val.cardPassword}</div>
                  <div style={stylesX.cardItemCopy}>
                    <div
                      style={stylesX.cardItemCopyText}
                      onClick={() => this.handleOnPressCopy(val.cardPassword)}
                    >
                      {formatMessage({ id: 'copy' })}
                    </div>
                  </div>
                </div>
                <div style={stylesX.cardItemTime}>
                  {`${formatMessage({ id: 'usefulDate' })}: ${dayjs().format(
                    'DD-MM-YYYY',
                  )}`}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  renderOrderNo() {
    const {
      queryOrderItem: { orderNo },
    } = this.props;
    const stylesX = {
      orderNo: {},
      orderNoTitle: {
        paddingLeft: SIDEINTERVAL,
        paddingTop: 10,
      },
      orderNoMain: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      },
      orderNoLeft: {
        height: 35,
        lineHeight: '35px',
      },
    };
    return (
      <div style={stylesX.orderNo}>
        <div style={stylesX.orderNoTitle}>{`${formatMessage({
          id: 'orderNumber',
        })}:`}</div>
        <div style={stylesX.orderNoMain}>
          <div style={stylesX.orderNoLeft}>{orderNo}</div>
          {/* <SmallButton
            text={formatMessage({ id: 'copy' })}
            onClick={() => this.handleOnPressCopy(orderNo)}
          /> */}
        </div>
      </div>
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

    const stylesX = {
      status: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingTop: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
        backgroundColor: '#E0E3EF',
      },
      statusText: {
        color: '#333',
        marginBottom: 5,
      },
      statusTime: {
        color: '#666',
      },
    };

    return (
      <div style={styles.container}>
        <div style={styles.main}>
          <div style={stylesX.status}>
            <div style={stylesX.statusText}>
              {tradeStatusCodes(tradeStatus)}
            </div>
            {parseInt(tradeStatus, 10) === 10000 && (
              <div style={stylesX.statusTime}>
                {this.makeRemainTimeText(timeoutExpress)}
              </div>
            )}
          </div>
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
          <div style={styles.totalPrice}>
            {`${priceFormat(totalAmount + couponValue)} ${MONETARY}`}
          </div>
          <SeparateBar />
          {tradeStatus !== '10000' && (
            <NavBar2
              isShowRight={false}
              valueLeft={formatMessage({ id: 'paymentMethod' })}
              valueMiddle={payWayToText(payWayIndex)}
            />
          )}
          <NavBar2
            // onClick={() => this.handleOnPressToggleBottomSheet()}
            valueLeft={formatMessage({ id: 'couponValue' })}
            valueMiddle={couponValue}
            isShowRight={false}
          />
          <NavBar2
            valueLeft={formatMessage({ id: 'orderTime' })}
            valueMiddle={`${dayjs(createTime).format('DD-MM-YYYY HH:mm:ss')}`}
            isShowRight={false}
          />
          {this.renderOrderNo()}
          <div style={{ height: 5 }} />
          {/* {this.renderCard()} */}
        </div>
        {this.renderBottom()}
      </div>
    );
  }

  render() {
    const { authUser } = this.props;
    return (
      <div style={styles.container}>
        <BYHeader
          title={formatMessage({ id: 'details' })}
          // onPressBackButton={() => this.handleOnPressBack()}
        />
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
    const { address, queryOrder, getUserInfoById, loading } = state;
    const {
      location: {
        query: { orderNo, tradeNo, from = '' },
        pathname: locationPathname,
        search: locationSearch,
      },
    } = props;

    return {
      loading: loading.effects[`${ORDERPAY_NAMESPACE}/${ORDER_PAY.REQUEST}`],
      addressSelectedItem: getAddressSelectedItem(state, props),
      addressItems: address.items,
      authUser: o(localStorageGetItem, BUYOO),
      queryOrderItem: queryOrder.item,
      locationPathname,
      locationSearch,
      from,
      orderNo,
      tradeNo,
      getUserInfoById,
      getUserInfoByIdLoading:
        loading.effects[
          `${GETUSERINFOBYID_NAMESPACE}/${GET_USERINFO_BYID.REQUEST}`
        ],
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

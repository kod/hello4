/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { PullToRefresh } from 'antd-mobile';
import qs from 'qs';
import router from 'umi/lib/router';

import {
  WINDOW_HEIGHT,
  SIDEINTERVAL,
  WINDOW_WIDTH,
  MONETARY,
  SCREENS,
} from '@src/common/constants';
import { i18n, View } from '@src/API';

import * as queryOrderListActionCreators from '@src/common/actions/queryOrderList';
import ProductItem2 from '@src/components/ProductItem2';
import { tradeStatusCodes, operateForTradeStatusCodes } from '@src/utils';
import priceFormat from '@src/utils/priceFormat';
import SeparateBar from '@src/components/SeparateBar';
import EmptyState from '@src/components/EmptyState';
import { getLoginUser } from '@src/common/selectors';

import styles from './index.less';

const ouhrigdfnjsoeijehrJpg =
  'https://oss.buyoo.vn/usercollect/1/20181101180309_67w.jpg';

// const stylesScrollable = {
//   container: {
//     display: 'flex',
//     flex: 1,
//   },
//   totalPrice: {
//     display: 'flex',
//     padding-left: SIDEINTERVAL,
//     flex-direction: row,
//     justify-content: 'space-between',
//     align-items: 'center',
//     border-bottom-color: BORDER_COLOR,
//     border-bottom-width: 1,
//     borderBottomStyle: 'solid',
//   },
//   payText: {
//     flex: 1,
//   },
//   price: {
//     flex: 1.2,
//     height: 40,
//     line-height: '40px',
//     text-align: right,
//     padding-right: SIDEINTERVAL,
//     color: '#666',
//   },
//   pay: {
//     display: 'flex',
//     flex-direction: row,
//     justify-content: 'flex-end',
//     align-items: 'center',
//     // padding-left: SIDEINTERVAL,
//     padding-right: SIDEINTERVAL,
//     padding-top: 10,
//     // padding-bottom: 15,
//     // height: 50,
//     flex-wrap: 'wrap',
//   },
//   payButton: {
//     height: 25,
//     line-height: '25px',
//     font-size: 11,
//     color: PRIMARY_COLOR,
//     padding-left: WINDOW_WIDTH * 0.05,
//     padding-right: WINDOW_WIDTH * 0.05,
//     margin-left: SIDEINTERVAL,
//     margin-bottom: 10,
//     border-radius: 14,
//     border-color: PRIMARY_COLOR,
//     border-style: 'solid',
//     border-width: 1,
//   },
// };

class Scrollable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh() {
    const { itemKey, status, queryOrderListFetch } = this.props;
    queryOrderListFetch({
      index: itemKey,
      status,
    });
  }

  handleOnPressOperate = (operateText, val) => {
    switch (operateText) {
      case i18n.payment:
        router.push(
          `/${SCREENS.Pay}?${qs.stringify({
            tradeNo: val.tradeNo,
            orderNo: val.orderNo,
          })}`,
        );
        break;

      case i18n.evaluation:
        router.push(
          `/${SCREENS.Evalution}?${qs.stringify({
            tradeNo: val.tradeNo,
            orderNo: val.orderNo,
            brandId: val.goodList[0].brandId,
          })}`,
        );

        break;

      case i18n.viewPaymentCode:
        router.push(
          `/${SCREENS.PaymentCode}?${qs.stringify({
            orderNo: val.orderNo,
            tradeNo: val.tradeNo,
            payway: val.payWay,
            payrate: val.payRate,
            repaymentmonth: val.repaymentMonth,
            totalAmount: val.totalAmount,
          })}`,
        );

        break;

      default:
        router.push(
          `/${SCREENS.OrderDetail}?${qs.stringify({
            tradeNo: val.tradeNo,
            orderNo: val.orderNo,
          })}`,
        );

        break;
    }
  };

  handleOnPressGoods = val => {
    router.push(
      `/${SCREENS.OrderDetail}?${qs.stringify({
        tradeNo: val.tradeNo,
        orderNo: val.orderNo,
      })}`,
    );
  };

  render() {
    const { refreshing } = this.state;
    const { queryOrderListItem, itemKey } = this.props;

    const module = queryOrderListItem[itemKey];
    const { items } = module;
    if (items.length === 0 && module.loading === false)
      return (
        <View style={{ height: WINDOW_HEIGHT - 45 - 45 }}>
          <EmptyState
            source={ouhrigdfnjsoeijehrJpg}
            text={i18n.noData}
            style={{ paddingTop: WINDOW_HEIGHT * 0.1 }}
          />
        </View>
      );
    return (
      <View>
        <PullToRefresh
          // damping={60}
          // ref={el => (this.ptr = el)}
          style={{
            height: WINDOW_HEIGHT - 45 - 50,
            overflow: 'auto',
          }}
          // indicator={down ? {} : { deactivate: '上拉可以刷新' }}
          direction="down"
          refreshing={refreshing}
          onRefresh={() => {
            this.onRefresh();
            this.setState({ refreshing: true });
            setTimeout(() => {
              this.setState({ refreshing: false });
            }, 1400);
          }}
        >
          {items.map(val => (
            <View key={val.tradeNo}>
              <ProductItem2
                data={val.goodList}
                stylePricePrice={{ color: '#666' }}
                stylePricePeriods={{ color: '#666' }}
                isShowNumber
                clickProps={() => this.handleOnPressGoods(val)}
              />
              <View
                style={{
                  paddingLeft: SIDEINTERVAL,
                }}
                className={styles.totalPrice}
              >
                <View className={styles.payText}>
                  {tradeStatusCodes(val.tradeStatus)}
                </View>
                <View
                  style={{
                    paddingRight: SIDEINTERVAL,
                  }}
                  className={styles.price}
                >{`${i18n.subtotal}: ${priceFormat(
                  val.totalAmount,
                )} ${MONETARY}`}</View>
              </View>
              <View
                style={{
                  paddingRight: SIDEINTERVAL,
                }}
                className={styles.pay}
              >
                {operateForTradeStatusCodes(val.tradeStatus, val.payWay).map(
                  (val1, index1) => (
                    <View
                      style={{
                        paddingLeft: WINDOW_WIDTH * 0.05,
                        paddingRight: WINDOW_WIDTH * 0.05,
                        marginLeft: SIDEINTERVAL,
                      }}
                      className={styles.payButton}
                      onClick={() => this.handleOnPressOperate(val1, val)}
                      key={index1}
                    >
                      {val1}
                    </View>
                  ),
                )}
              </View>
              <SeparateBar />
            </View>
          ))}
        </PullToRefresh>
      </View>
    );
  }
}

export default connect(
  (state, props) => {
    const { queryOrderList } = state;

    return {
      authUser: getLoginUser(state, props),
      queryOrderListItem: queryOrderList.item,
    };
  },
  {
    ...queryOrderListActionCreators,
  },
)(Scrollable);

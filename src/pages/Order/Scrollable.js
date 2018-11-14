/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'dva';
import { PullToRefresh } from 'antd-mobile';
import qs from 'qs';
import router from 'umi/router';

import {
  WINDOW_HEIGHT,
  SIDEINTERVAL,
  WINDOW_WIDTH,
  MONETARY,
  SCREENS,
} from '@/common/constants';
import { formatMessage } from 'umi/locale';

import * as queryOrderListActionCreators from '@/common/actions/queryOrderList';
import { BORDER_COLOR, PRIMARY_COLOR } from '@/styles/variables';
import ProductItem2 from '@/components/ProductItem2';
import { tradeStatusCodes, operateForTradeStatusCodes } from '@/utils';
import priceFormat from '@/utils/priceFormat';
import SeparateBar from '@/components/SeparateBar';
import EmptyState from '@/components/EmptyState';

const ouhrigdfnjsoeijehrJpg =
  'https://oss.buyoo.vn/usercollect/1/20181101180309_67w.jpg';

const stylesScrollable = {
  container: {
    display: 'flex',
    flex: 1,
  },
  totalPrice: {
    display: 'flex',
    paddingLeft: SIDEINTERVAL,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
  },
  payText: {
    flex: 1,
  },
  price: {
    flex: 1.2,
    height: 40,
    lineHeight: '40px',
    textAlign: 'right',
    paddingRight: SIDEINTERVAL,
    color: '#666',
  },
  pay: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    paddingTop: 10,
    // paddingBottom: 15,
    // height: 50,
    flexWrap: 'wrap',
  },
  payButton: {
    height: 25,
    lineHeight: '25px',
    fontSize: 11,
    color: PRIMARY_COLOR,
    paddingLeft: WINDOW_WIDTH * 0.05,
    paddingRight: WINDOW_WIDTH * 0.05,
    marginLeft: SIDEINTERVAL,
    marginBottom: 10,
    borderRadius: 14,
    borderColor: PRIMARY_COLOR,
    borderStyle: 'solid',
    borderWidth: 1,
  },
};

@connect(
  state => {
    const { login, queryOrderList } = state;

    return {
      authUser: login.user,
      queryOrderListItem: queryOrderList.item,
    };
  },
  {
    ...queryOrderListActionCreators,
  },
)
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
      case formatMessage({ id: 'payment' }):
        router.push(
          `/${SCREENS.Pay}?${qs.stringify({
            tradeNo: val.tradeNo,
            orderNo: val.orderNo,
          })}`,
        );
        break;

      case formatMessage({ id: 'evaluation' }):
        router.push(
          `/${SCREENS.Evalution}?${qs.stringify({
            tradeNo: val.tradeNo,
            orderNo: val.orderNo,
            brandId: val.goodList[0].brandId,
          })}`,
        );

        break;

      case formatMessage({ id: 'viewPaymentCode' }):
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
        <div style={{ height: WINDOW_HEIGHT - 45 - 45 }}>
          <EmptyState
            source={ouhrigdfnjsoeijehrJpg}
            text={formatMessage({ id: 'noData' })}
            style={{ paddingTop: WINDOW_HEIGHT * 0.1 }}
          />
        </div>
      );
    return (
      <div>
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
            <div key={val.tradeNo}>
              <ProductItem2
                data={val.goodList}
                stylePricePrice={{ color: '#666' }}
                stylePricePeriods={{ color: '#666' }}
                isShowNumber
                onClick={() => this.handleOnPressGoods(val)}
              />
              <div style={stylesScrollable.totalPrice}>
                <div style={stylesScrollable.payText}>
                  {tradeStatusCodes(val.tradeStatus)}
                </div>
                <div style={stylesScrollable.price}>{`${formatMessage({
                  id: 'subtotal',
                })}: ${priceFormat(val.totalAmount)} ${MONETARY}`}</div>
              </div>
              <div style={stylesScrollable.pay}>
                {operateForTradeStatusCodes(val.tradeStatus, val.payWay).map(
                  (val1, index1) => (
                    <div
                      style={stylesScrollable.payButton}
                      onClick={() => this.handleOnPressOperate(val1, val)}
                      key={index1}
                    >
                      {val1}
                    </div>
                  ),
                )}
              </div>
              <SeparateBar />
            </div>
          ))}
        </PullToRefresh>
      </div>
    );
  }
}

export default Scrollable;

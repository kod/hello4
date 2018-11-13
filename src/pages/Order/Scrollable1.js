/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import qs from 'qs';
import router from 'umi/router';
import { PullToRefresh, ListView } from 'antd-mobile';

import * as queryOrderListActionCreators from '@/common/actions/queryOrderList';
import {
  SCREENS,
  SIDEINTERVAL,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
} from '@/common/constants';
import { BORDER_COLOR, PRIMARY_COLOR } from '@/styles/variables';
import EmptyState from '@/components/EmptyState';
import SeparateBar from '@/components/SeparateBar';
import priceFormat from '@/utils/priceFormat';
import { tradeStatusCodes, operateForTradeStatusCodes } from '@/utils';
import ProductItem2 from '@/components/ProductItem2';

const ouhrigdfnjsoeijehrJpg =
  'https://oss.buyoo.vn/usercollect/1/20181101180309_67w.jpg';

const stylesScrollable = {
  container: {
    flex: 1,
  },
  totalPrice: {
    paddingLeft: SIDEINTERVAL,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
  },
  price: {
    height: 40,
    lineHeight: '40px',
    textAlign: 'right',
    paddingRight: SIDEINTERVAL,
    color: '#666',
  },
  pay: {
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
    borderWidth: 1,
  },
};

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: "McDonald's invites you",
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
];
const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataArr = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${pIndex * NUM_ROWS + i}`);
  }
  return dataArr;
}

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
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
    };
  }

  componentDidMount() {
    const { height } = this.state;
    const hei = height - 100;

    setTimeout(() => {
      const { dataSource } = this.state;
      this.rData = genData();
      this.setState({
        dataSource: dataSource.cloneWithRows(genData()),
        height: hei,
        refreshing: false,
        isLoading: false,
      });
    }, 1500);
  }

  onRefresh = () => {
    const { dataSource } = this.state;

    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false,
      });
    }, 600);
  };

  onEndReached = event => {
    const { isLoading, hasMore, dataSource } = this.state;
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (isLoading && !hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = [...this.rData, ...genData(++pageIndex)];
      this.setState({
        dataSource: dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  };

  handleOnPressGoods(val) {
    const { queryOrderListItem } = this.props;
    console.log(queryOrderListItem);
    router.push(
      `/${SCREENS.OrderDetail}?${qs.stringify({
        tradeNo: val.tradeNo,
        orderNo: val.orderNo,
      })}`,
    );

    // navigate(SCREENS.OrderDetail, {
    //   tradeNo: val.tradeNo,
    //   orderNo: val.orderNo,
    // });
  }

  handleOnPressOperate(operateText, val) {
    const { queryOrderListItem } = this.props;
    console.log(queryOrderListItem);

    switch (operateText) {
      case formatMessage({ id: 'payment' }):
        router.push(
          `/${SCREENS.Pay}?${qs.stringify({
            tradeNo: val.tradeNo,
            orderNo: val.orderNo,
          })}`,
        );
        // navigate(SCREENS.Pay, {
        //   tradeNo: val.tradeNo,
        //   orderNo: val.orderNo,
        // });
        break;

      case formatMessage({ id: 'evaluation' }):
        router.push(
          `/${SCREENS.Evalution}?${qs.stringify({
            tradeNo: val.tradeNo,
            orderNo: val.orderNo,
            brandId: val.goodList[0].brandId,
          })}`,
        );

        // navigate(SCREENS.Evalution, {
        //   tradeNo: val.tradeNo,
        //   orderNo: val.orderNo,
        //   brandId: val.goodList[0].brandId,
        // });
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

        // navigate(SCREENS.PaymentCode, {
        //   orderNo: val.orderNo,
        //   tradeNo: val.tradeNo,
        //   payway: val.payWay,
        //   payrate: val.payRate,
        //   repaymentmonth: val.repaymentMonth,
        //   totalAmount: val.totalAmount,
        // });
        break;

      default:
        router.push(
          `/${SCREENS.OrderDetail}?${qs.stringify({
            tradeNo: val.tradeNo,
            orderNo: val.orderNo,
          })}`,
        );

        // navigate(SCREENS.OrderDetail, {
        //   tradeNo: val.tradeNo,
        //   orderNo: val.orderNo,
        // });
        break;
    }
  }

  render() {
    const { dataSource, isLoading, refreshing } = this.state;
    const { itemKey, queryOrderListItem } = this.props;

    console.log(queryOrderListItem);
    console.log(itemKey);
    const module = queryOrderListItem[itemKey];
    console.log(module);
    const { items } = module;

    // const row1 = (val, sectionID, rowID) => (
    //   <div key={val.tradeNo}>
    //     <ProductItem2
    //       data={val.goodList}
    //       stylePricePrice={{ color: '#666' }}
    //       stylePricePeriods={{ color: '#666' }}
    //       isShowNumber
    //       onPress={() => this.handleOnPressGoods(val)}
    //     />
    //     <div style={stylesScrollable.totalPrice}>
    //       <div style={stylesScrollable.payText}>
    //         {tradeStatusCodes(val.tradeStatus)}
    //       </div>
    //       <div style={stylesScrollable.price}>{`${formatMessage({
    //         id: 'subtotal',
    //       })}: ${priceFormat(val.totalAmount)} ${MONETARY}`}</div>
    //     </div>
    //     <div style={stylesScrollable.pay}>
    //       {operateForTradeStatusCodes(val.tradeStatus, val.payWay).map(
    //         (val1, index1) => (
    //           <div
    //             style={stylesScrollable.payButton}
    //             onPress={() => this.handleOnPressOperate(val1, val)}
    //             key={index1}
    //           >
    //             {val1}
    //           </div>
    //         ),
    //       )}
    //     </div>
    //     <SeparateBar />
    //   </div>
    // );

    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div
          key={rowID}
          style={{
            padding: '0 15px',
            backgroundColor: 'white',
          }}
        >
          <div
            style={{
              height: '50px',
              lineHeight: '50px',
              color: '#888',
              fontSize: '18px',
              borderBottom: '1px solid #ddd',
            }}
          >
            {obj.title}
          </div>
          <div
            style={{ display: '-webkit-box', display: 'flex', padding: '15px' }}
          >
            <img
              style={{ height: '63px', width: '63px', marginRight: '15px' }}
              src={obj.img}
              alt=""
            />
            <div style={{ display: 'inline-block' }}>
              <div
                style={{
                  marginBottom: '8px',
                  color: '#000',
                  fontSize: '16px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '250px',
                }}
              >
                {obj.des}-{rowData}
              </div>
              <div style={{ fontSize: '16px' }}>
                <span style={{ fontSize: '30px', color: '#FF6E27' }}>
                  {rowID}
                </span>{' '}
                元/任务
              </div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <div>
        <ListView
          dataSource={dataSource}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: 'center' }}>
              {isLoading ? 'Loading...' : 'Loaded'}
            </div>
          )}
          renderRow={row}
          renderSeparator={separator}
          useBodyScroll
          // style={
          //   this.state.useBodyScroll
          //     ? {}
          //     : {
          //         height: this.state.height,
          //         border: '1px solid #ddd',
          //         margin: '5px 0',
          //       }
          // }
          pullToRefresh={
            <PullToRefresh refreshing={refreshing} onRefresh={this.onRefresh} />
          }
          onEndReached={this.onEndReached}
          pageSize={5}
        />
      </div>
    );

    if (items.length === 0 && module.loading === false)
      return (
        <EmptyState
          source={ouhrigdfnjsoeijehrJpg}
          text={formatMessage({ id: 'noData' })}
          style={{ paddingTop: WINDOW_HEIGHT * 0.1 }}
        />
      );

    return (
      <div style={stylesScrollable.container}>
        <ListView
          key={this.state.useBodyScroll ? '0' : '1'}
          ref={el => (this.lv = el)}
          dataSource={this.state.dataSource}
          renderHeader={() => <span>Pull to refresh</span>}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: 'center' }}>
              {this.state.isLoading ? 'Loading...' : 'Loaded'}
            </div>
          )}
          renderRow={row}
          renderSeparator={separator}
          useBodyScroll={this.state.useBodyScroll}
          style={
            this.state.useBodyScroll
              ? {}
              : {
                  height: this.state.height,
                  border: '1px solid #ddd',
                  margin: '5px 0',
                }
          }
          pullToRefresh={
            <PullToRefresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          onEndReached={this.onEndReached}
          pageSize={5}
        />
        {/* {items.map(val => (
          <div key={val.tradeNo}>
            <ProductItem2
              data={val.goodList}
              stylePricePrice={{ color: '#666' }}
              stylePricePeriods={{ color: '#666' }}
              isShowNumber
              onPress={() => this.handleOnPressGoods(val)}
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
                    onPress={() => this.handleOnPressOperate(val1, val)}
                    key={index1}
                  >
                    {val1}
                  </div>
                ),
              )}
            </div>
            <SeparateBar />
          </div>
        ))} */}
      </div>
    );
  }
}

export default Scrollable;

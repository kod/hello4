import React from 'react';
import { connect } from 'react-redux';
import BYHeader from '@src/components/BYHeader';
import {
  formatMessage,
  // setLocale
} from 'umi-plugin-locale';

import router from 'umi/router';

import * as getVoucherActionCreators from '@src/common/actions/getVoucher';
import * as receiveVoucherActionCreators from '@src/common/actions/receiveVoucher';
import * as getVoucherListActionCreators from '@src/common/actions/getVoucherList';
import { SCREENS, WINDOW_HEIGHT } from '@src/common/constants';
import { Modal } from 'antd-mobile';

import MustLogin from '@src/components/MustLogin';
import { getLoginUser } from '@src/common/selectors';
import OrderTabNavigator from './OrderTabNavigator';

class CouponMy extends React.Component {
  componentDidMount() {
    // setLocale('zh-CN');
  }

  render() {
    const {
      initialPage,
      authUser,
      couponMyPastLength,
      couponMyUnusedLength,
      couponMyUsedLength,
    } = this.props;

    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        height: WINDOW_HEIGHT,
        backgroundColor: '#fff',
      },
    };

    const tabs = [
      {
        title: `${formatMessage({ id: 'all' })}`,
        status: '99999',
      },
      {
        title: `${formatMessage({ id: 'pendingPayment' })}`,
        status: '10000',
      },
      {
        title: `${formatMessage({ id: 'pendingDelivery' })}`,
        status: '30000',
      },
      {
        title: `${formatMessage({ id: 'pendingEvaluation' })}`,
        status: '30001',
      },
    ];

    return (
      <div style={styles.container}>
        <BYHeader title={formatMessage({ id: 'myOrder' })} />
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          formatMessage={formatMessage}
          router={router}
          SCREENS={SCREENS}
        />
        <OrderTabNavigator
          tabs={tabs}
          initialPage={initialPage}
          couponMyPast={couponMyPastLength}
          couponMyUnused={couponMyUnusedLength}
          couponMyUsed={couponMyUsedLength}
        />
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    const { queryOrderList } = state;

    const {
      location: {
        query: { index },
      },
    } = props;

    return {
      initialPage: index,
      authUser: getLoginUser(state, props),
      queryOrderListItem: queryOrderList.item,
      scrollTabIndex: queryOrderList.scrollTabIndex,
    };
  },
  {
    ...getVoucherActionCreators,
    ...receiveVoucherActionCreators,
    ...getVoucherListActionCreators,
  },
)(CouponMy);

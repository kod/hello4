import React from 'react';
import { connect } from 'dva';
import BYHeader from '@/components/BYHeader';
import {
  formatMessage,
  // setLocale
} from 'umi/locale';

import router from 'umi/router';

import * as getVoucherActionCreators from '@/common/actions/getVoucher';
import * as receiveVoucherActionCreators from '@/common/actions/receiveVoucher';
import * as getVoucherListActionCreators from '@/common/actions/getVoucherList';
import { SCREENS, WINDOW_HEIGHT, BUYOO } from '@/common/constants';
import { Modal } from 'antd-mobile';

import MustLogin from '@/components/MustLogin';
import OrderTabNavigator from './OrderTabNavigator';
import { o } from '@/utils/AuthEncrypt';
import { b } from '@/utils';

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
      authUser: o(b, BUYOO),
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

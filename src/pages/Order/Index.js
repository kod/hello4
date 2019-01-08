import React from 'react';
import { connect } from 'react-redux';
import BYHeader from '@src/components/BYHeader';
import { i18n } from '@src/API';

import router from 'umi/lib/router';

import * as getVoucherActionCreators from '@src/common/actions/getVoucher';
import * as receiveVoucherActionCreators from '@src/common/actions/receiveVoucher';
import * as getVoucherListActionCreators from '@src/common/actions/getVoucherList';
import { SCREENS, WINDOW_HEIGHT } from '@src/common/constants';
import { Modal } from 'antd-mobile';

import MustLogin from '@src/components/MustLogin';
import { getLoginUser } from '@src/common/selectors';
import OrderTabNavigator from './OrderTabNavigator';

class CouponMy extends React.PureComponent {
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
        title: `${i18n.all}`,
        status: '99999',
      },
      {
        title: `${i18n.pendingPayment}`,
        status: '10000',
      },
      {
        title: `${i18n.pendingDelivery}`,
        status: '30000',
      },
      {
        title: `${i18n.pendingEvaluation}`,
        status: '30001',
      },
    ];

    return (
      <div style={styles.container}>
        <BYHeader title={i18n.myOrder} />
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          i18n={i18n}
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

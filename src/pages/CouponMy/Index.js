import React from 'react';
import { connect } from 'dva';
import BYHeader from '@/components/BYHeader';
import { formatMessage } from 'umi/locale';

import router from 'umi/router';

import * as getVoucherActionCreators from '@/common/actions/getVoucher';
import * as receiveVoucherActionCreators from '@/common/actions/receiveVoucher';
import * as getVoucherListActionCreators from '@/common/actions/getVoucherList';
import { SCREENS, WINDOW_HEIGHT } from '@/common/constants';
import { Modal } from 'antd-mobile';

import MustLogin from '@/components/MustLogin';
import CouponMyTabNavigator from './CouponMyTabNavigator';

@connect(
  state => {
    const { getVoucher, getVoucherList, login } = state;

    return {
      authUser: login.user,
      items: getVoucher.items,
      couponMyPastLength: getVoucherList.CouponMyPast.length,
      couponMyUnusedLength: getVoucherList.CouponMyUnused.length,
      couponMyUsedLength: getVoucherList.CouponMyUsed.length,
    };
  },
  {
    ...getVoucherActionCreators,
    ...receiveVoucherActionCreators,
    ...getVoucherListActionCreators,
  },
)
class CouponMy extends React.Component {
  componentDidMount() {
    const { getVoucherListFetch } = this.props;
    getVoucherListFetch({
      status: 0,
    });
    getVoucherListFetch({
      status: 1,
    });
    getVoucherListFetch({
      status: 2,
    });
  }

  render() {
    const {
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
        title: `${formatMessage({ id: 'notUsed' })}(${couponMyUnusedLength})`,
        routeName: 'CouponMyUnused',
      },
      {
        title: `${formatMessage({ id: 'used' })}(${couponMyUsedLength})`,
        routeName: 'CouponMyUsed',
      },
      {
        title: `${formatMessage({ id: 'expired' })}(${couponMyPastLength})`,
        routeName: 'CouponMyPast',
      },
    ];

    return (
      <div style={styles.container}>
        <BYHeader title={formatMessage({ id: 'myCoupon' })} />
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          formatMessage={formatMessage}
          router={router}
          SCREENS={SCREENS}
        />
        <CouponMyTabNavigator
          tabs={tabs}
          couponMyPast={couponMyPastLength}
          couponMyUnused={couponMyUnusedLength}
          couponMyUsed={couponMyUsedLength}
        />
      </div>
    );
  }
}

export default CouponMy;

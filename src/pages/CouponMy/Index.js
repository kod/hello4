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
import Loader from '@src/components/Loader';
import { getLoginUser } from '@src/common/selectors';
import CouponMyTabNavigator from './CouponMyTabNavigator';

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
      loading,
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
        title: `${i18n.notUsed}(${couponMyUnusedLength})`,
        routeName: 'CouponMyUnused',
      },
      {
        title: `${i18n.used}(${couponMyUsedLength})`,
        routeName: 'CouponMyUsed',
      },
      {
        title: `${i18n.expired}(${couponMyPastLength})`,
        routeName: 'CouponMyPast',
      },
    ];

    return (
      <div style={styles.container}>
        <BYHeader title={i18n.myCoupon} />
        {loading && <Loader />}
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          i18n={i18n}
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

export default connect(
  (state, props) => {
    const { getVoucher, getVoucherList } = state;

    return {
      loading: getVoucherList.loading,
      authUser: getLoginUser(state, props),
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
)(CouponMy);

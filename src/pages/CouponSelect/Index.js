/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { i18n, View } from '@src/API';
import router from 'umi/lib/router';
import { Modal } from 'antd-mobile';

import BYHeader from '@src/components/BYHeader';
import Loader from '@src/components/Loader';

import * as judgeVoucherActionCreators from '@src/common/actions/judgeVoucher';
import * as couponSelectActionCreators from '@src/common/actions/couponSelect';
import { SCREENS, WINDOW_HEIGHT } from '@src/common/constants';
import EmptyState from '@src/components/EmptyState';

import CouponItem from '@src/components/CouponItem';
import MustLogin from '@src/components/MustLogin';
import { getLoginUser } from '@src/common/selectors';

import styles from './index.less';

const ouhrigdfnjsoeijehrJpg =
  'https://oss.buyoo.vn/usercollect/1/20181101180309_67w.jpg';

class CouponSelect extends React.Component {
  constructor(props) {
    super(props);

    this.handlerOnPress = this.handlerOnPress.bind(this);
  }

  componentDidMount() {
    const { judgeVoucherFetch, products, authUser } = this.props;
    if (authUser) {
      judgeVoucherFetch({
        products,
      });
    }
  }

  handlerOnPress(val) {
    const { couponSelectFetch, authUser } = this.props;
    if (!authUser) return router.push(SCREENS.Login);
    if (val.status === 0) return false;
    couponSelectFetch(val);
    return router.go(-1);
  }

  renderContent() {
    const { items } = this.props;

    return <CouponItem data={items} onClick={this.handlerOnPress} />;
  }

  render() {
    const { items, loading, authUser } = this.props;

    if (loading) return <Loader />;

    return (
      <View className={styles.container}>
        <BYHeader title={i18n.chooseCoupon} />
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          i18n={i18n}
          router={router}
          SCREENS={SCREENS}
        />

        {items.length > 0 ? (
          this.renderContent()
        ) : (
          <EmptyState
            source={ouhrigdfnjsoeijehrJpg}
            text={i18n.temporarilyUnableReceiveVoucher}
            style={{ height: WINDOW_HEIGHT - 45 }}
            styleText={{ marginBottom: 0 }}
          />
        )}
      </View>
    );
  }
}

export default connect(
  (state, props) => {
    const { judgeVoucher } = state;

    const {
      location: {
        query: { products },
      },
    } = props;

    return {
      products,
      items: judgeVoucher.items,
      authUser: getLoginUser(state, props),
      loading: judgeVoucher.loading,
    };
  },
  {
    ...judgeVoucherActionCreators,
    ...couponSelectActionCreators,
  },
)(CouponSelect);

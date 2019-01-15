/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { i18n, View } from '@src/API';
import router from 'umi/lib/router';
import { Modal } from 'antd-mobile';

import BYHeader from '@src/components/BYHeader';
import Loader from '@src/components/Loader';

import * as getVoucherActionCreators from '@src/common/actions/getVoucher';
import * as receiveVoucherActionCreators from '@src/common/actions/receiveVoucher';
import * as modalActionCreators from '@src/common/actions/modal';
import { SCREENS, WINDOW_HEIGHT } from '@src/common/constants';
import EmptyState from '@src/components/EmptyState';

import CouponItem from '@src/components/CouponItem';
import { getLoginUser } from '@src/common/selectors';

import styles from './index.less';

const ouhrigdfnjsoeijehrJpg =
  'https://oss.buyoo.vn/usercollect/1/20181101180309_67w.jpg';

class Coupon extends React.Component {
  constructor(props) {
    super(props);

    this.handlerOnPress = this.handlerOnPress.bind(this);
  }

  componentDidMount() {
    const { getVoucherFetch } = this.props;
    getVoucherFetch();
  }

  handlerOnPress(val) {
    const { receiveVoucherFetch, authUser } = this.props;
    if (!authUser) return router.push(`/${SCREENS.Login}`);

    if (val.status !== 1) {
      const title = val.status === 0 ? i18n.received : i18n.haveFinished;
      Modal.alert('', title, [
        {
          text: i18n.confirm,
          style: 'default',
          onPress: () => {},
        },
      ]);

      return false;
    }

    return receiveVoucherFetch({
      voucherid: val.id,
    });
  }

  renderContent() {
    const { items } = this.props;

    return <CouponItem data={items} onClick={this.handlerOnPress} />;
  }

  render() {
    const { items, loading, receiveVoucherLoading } = this.props;

    if (loading) return <Loader />;

    return (
      <View className={styles.container}>
        <BYHeader title={i18n.discountCode} />
        {receiveVoucherLoading && <Loader />}
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
    const { getVoucher, receiveVoucher } = state;

    return {
      receiveVoucherLoading: receiveVoucher.loading,
      loading: getVoucher.loading,
      items: getVoucher.items,
      authUser: getLoginUser(state, props),
    };
  },
  {
    ...getVoucherActionCreators,
    ...receiveVoucherActionCreators,
    ...modalActionCreators,
  },
)(Coupon);

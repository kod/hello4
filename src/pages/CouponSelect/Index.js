/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
import { Modal } from 'antd-mobile';

import BYHeader from '@/components/BYHeader';
import Loader from '@/components/Loader';

import * as judgeVoucherActionCreators from '@/common/actions/judgeVoucher';
import * as couponSelectActionCreators from '@/common/actions/couponSelect';
import { SCREENS, WINDOW_HEIGHT, BUYOO } from '@/common/constants';
import EmptyState from '@/components/EmptyState';

import CouponItem from '@/components/CouponItem';
import MustLogin from '@/components/MustLogin';
import { o } from '@/utils/AuthEncrypt';
import { localStorageGetItem } from '@/utils';

const ouhrigdfnjsoeijehrJpg =
  'https://oss.buyoo.vn/usercollect/1/20181101180309_67w.jpg';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};

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
      <div style={styles.container}>
        <BYHeader title={formatMessage({ id: 'chooseCoupon' })} />
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          formatMessage={formatMessage}
          router={router}
          SCREENS={SCREENS}
        />

        {items.length > 0 ? (
          this.renderContent()
        ) : (
          <EmptyState
            source={ouhrigdfnjsoeijehrJpg}
            text={formatMessage({ id: 'temporarilyUnableReceiveVoucher' })}
            style={{ height: WINDOW_HEIGHT - 45 }}
            styleText={{ marginBottom: 0 }}
          />
        )}
      </div>
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
      authUser: o(localStorageGetItem, BUYOO),
      loading: judgeVoucher.loading,
    };
  },
  {
    ...judgeVoucherActionCreators,
    ...couponSelectActionCreators,
  },
)(CouponSelect);

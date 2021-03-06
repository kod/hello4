/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
import { Modal } from 'antd-mobile';

import BYHeader from '@/components/BYHeader';
import Loader from '@/components/Loader';

import * as getVoucherActionCreators from '@/common/actions/getVoucher';
import * as receiveVoucherActionCreators from '@/common/actions/receiveVoucher';
import * as modalActionCreators from '@/common/actions/modal';
import {
  SCREENS,
  RECEIVEVOUCHER_NAMESPACE,
  GETVOUCHER_NAMESPACE,
  WINDOW_HEIGHT,
  BUYOO,
} from '@/common/constants';
import EmptyState from '@/components/EmptyState';

import CouponItem from '@/components/CouponItem';
import { RECEIVE_VOUCHER, GET_VOUCHER } from '@/common/constants/actionTypes';
import { o } from '@/utils/AuthEncrypt';
import { b } from '@/utils';

const ouhrigdfnjsoeijehrJpg =
  'https://oss.buyoo.vn/usercollect/1/20181101180309_67w.jpg';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};

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
      const title =
        val.status === 0
          ? formatMessage({ id: 'received' })
          : formatMessage({ id: 'haveFinished' });
      Modal.alert('', title, [
        {
          text: formatMessage({ id: 'confirm' }),
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

  renderHeaderTitle = () => {
    const stylesX = {
      container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 40,
        flexDirection: 'row',
      },
      title: {
        fontSize: 16,
        color: '#333',
        marginRight: 5,
      },
    };

    return (
      <div style={stylesX.container}>
        <div style={stylesX.title}>{formatMessage({ id: 'discountCode' })}</div>
      </div>
    );
  };

  renderContent() {
    const { items } = this.props;

    return <CouponItem data={items} onClick={this.handlerOnPress} />;
  }

  render() {
    const { items, loading, receiveVoucherLoading } = this.props;

    if (loading) return <Loader />;

    return (
      <div style={styles.container}>
        <BYHeader headerTitle={this.renderHeaderTitle()} />
        {receiveVoucherLoading && <Loader />}
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
  state => {
    const { getVoucher, loading } = state;

    return {
      receiveVoucherLoading:
        loading.effects[
          `${RECEIVEVOUCHER_NAMESPACE}/${RECEIVE_VOUCHER.REQUEST}`
        ],
      loading:
        loading.effects[`${GETVOUCHER_NAMESPACE}/${GET_VOUCHER.REQUEST}`],
      items: getVoucher.items,
      authUser: o(b, BUYOO),
    };
  },
  {
    ...getVoucherActionCreators,
    ...receiveVoucherActionCreators,
    ...modalActionCreators,
  },
)(Coupon);

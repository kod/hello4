import React from 'react';
// import router from 'umi/router';
import { connect } from 'react-redux';
import { formatMessage } from 'umi/locale';
// import { Modal } from 'antd-mobile';

import * as getVoucherListActionCreators from '@/common/actions/getVoucherList';
import * as receiveVoucherActionCreators from '@/common/actions/receiveVoucher';
import { WINDOW_HEIGHT, GETVOUCHERLIST_NAMESPACE } from '@/common/constants';
import Loader from '@/components/Loader';
import EmptyState from '@/components/EmptyState';
import CouponItem from '@/components/CouponItem';
import { GET_VOUCHER_LIST } from '@/common/constants/actionTypes';

const ouhrigdfnjsoeijehrJpg =
  'https://oss.buyoo.vn/usercollect/1/20181101180309_67w.jpg';

const styles = {
  container: {
    height: WINDOW_HEIGHT - 45 - 45,
    backgroundColor: '#fff',
  },
};

class CouponMyItem extends React.Component {
  componentDidMount() {
    console.log(' ');
  }

  render() {
    const { items, loading } = this.props;

    return (
      <div style={styles.container}>
        {loading && <Loader />}
        {items.length > 0 ? (
          <div>
            <CouponItem data={items} />
          </div>
        ) : (
          <EmptyState
            source={ouhrigdfnjsoeijehrJpg}
            text={formatMessage({ id: 'noData' })}
            styleText={{ marginBottom: 0 }}
          />
        )}
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    const { getVoucherList, loading } = state;

    const { routeName } = props;
    return {
      items: getVoucherList[routeName],
      loading:
        loading.effects[
          `${GETVOUCHERLIST_NAMESPACE}/${GET_VOUCHER_LIST.REQUEST}`
        ],

      routeName,
    };
  },
  {
    ...getVoucherListActionCreators,
    ...receiveVoucherActionCreators,
  },
)(CouponMyItem);

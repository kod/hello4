import React from 'react';
// import router from 'umi/lib/router';
import { connect } from 'react-redux';
import { formatMessage } from 'umi-plugin-locale';
// import { Modal } from 'antd-mobile';

import * as getVoucherListActionCreators from '@src/common/actions/getVoucherList';
import * as receiveVoucherActionCreators from '@src/common/actions/receiveVoucher';
import { WINDOW_HEIGHT } from '@src/common/constants';
import Loader from '@src/components/Loader';
import EmptyState from '@src/components/EmptyState';
import CouponItem from '@src/components/CouponItem';

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
    const { getVoucherList } = state;

    const { routeName } = props;
    return {
      items: getVoucherList[routeName],
      loading: getVoucherList.loading,
      routeName,
    };
  },
  {
    ...getVoucherListActionCreators,
    ...receiveVoucherActionCreators,
  },
)(CouponMyItem);

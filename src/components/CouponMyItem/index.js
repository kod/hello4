import React from 'react';
// import router from 'umi/router';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
// import { Modal } from 'antd-mobile';

import * as getVoucherListActionCreators from '@/common/actions/getVoucherList';
import * as receiveVoucherActionCreators from '@/common/actions/receiveVoucher';
import { WINDOW_HEIGHT } from '@/common/constants';
import Loader from '@/components/Loader';
import EmptyState from '@/components/EmptyState';
import CouponItem from '@/components/CouponItem';

const ouhrigdfnjsoeijehrJpg =
  'https://oss.buyoo.vn/usercollect/1/20181101180309_67w.jpg';

const styles = {
  container: {
    height: WINDOW_HEIGHT - 45 - 45,
    backgroundColor: '#fff',
  },
};

@connect(
  (state, props) => {
    const { getVoucherList } = state;

    const { routeName } = props;
    console.log(routeName);
    console.log(routeName);
    return {
      items: getVoucherList[routeName],
      loading: getVoucherList.loading,
      isAuthUser: !!state.login.user,
      routeName,
    };
  },
  {
    ...getVoucherListActionCreators,
    ...receiveVoucherActionCreators,
  },
)
class CouponMyItem extends React.Component {
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
export default CouponMyItem;

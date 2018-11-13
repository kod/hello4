import React from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import { Modal } from 'antd-mobile';

import * as getVoucherListActionCreators from '@/common/actions/getVoucherList';
import * as receiveVoucherActionCreators from '@/common/actions/receiveVoucher';
import { SCREENS, WINDOW_HEIGHT } from '@/common/constants';
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
  constructor(props) {
    super(props);

    this.handlerOnPress = this.handlerOnPress.bind(this);
  }

  handlerOnPress(val) {
    const { receiveVoucherFetch, isAuthUser } = this.props;
    if (!isAuthUser) return router.push(`/${SCREENS.Login}`);

    if (val.status !== 1) {
      const title =
        val.status === 0
          ? formatMessage({ id: 'received' })
          : formatMessage({ id: 'haveFinished' });
      Modal.alert('', title, [
        {
          text: formatMessage({ id: 'confirm' }),
          style: 'default',
        },
      ]);
      return false;
    }

    return receiveVoucherFetch({
      voucherid: val.id,
    });
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
export default CouponMyItem;

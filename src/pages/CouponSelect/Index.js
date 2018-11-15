/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'dva';
import BYHeader from '@/components/BYHeader';
import { formatMessage } from 'umi/locale';

import Loader from '@/components/Loader';

import * as addressActionCreators from '@/common/actions/address';
import * as getUserInfoByIdActionCreators from '@/common/actions/getUserInfoById';
import * as orderCreateActionCreators from '@/common/actions/orderCreate';
import * as couponSelectActionCreators from '@/common/actions/couponSelect';
import * as modalActionCreators from '@/common/actions/modal';
import { PRIMARY_COLOR, BORDER_COLOR } from '@/styles/variables';
import { SIDEINTERVAL, WINDOW_WIDTH, SCREENS } from '@/common/constants';
import { Modal } from 'antd-mobile';
import EmptyState from '@/components/EmptyState';

import CustomIcon from '@/components/CustomIcon';

const ouhrigdfnjsoeijehrJpg =
  'https://oss.buyoo.vn/usercollect/1/20181101180309_67w.jpg';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  add: {
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    backgroundColor: PRIMARY_COLOR,
    color: '#fff',
  },
  item: {
    paddingLeft: SIDEINTERVAL,
  },
  main: {
    marginTop: 25,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  namePhone: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  name: {
    color: '#333',
    marginRight: 15,
    fontWeight: '700',
  },
  phone: {
    color: '#333',
    fontWeight: '700',
  },
  address: {
    color: '#999',
    paddingRight: SIDEINTERVAL,
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 14 + 14 * 0.618,
  },
  operate: {
    display: 'flex',
    flexDirection: 'row',
  },
  operateLeft: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  selectIcon: {
    fontSize: 18,
    color: '#666',
    marginRight: WINDOW_WIDTH * 0.02,
    paddingTop: 1,
  },
  selectText: {
    color: '#666',
  },
  operateRight: {
    display: 'flex',
    flexDirection: 'row',
    paddingRight: SIDEINTERVAL,
  },
  editIcon: {
    fontSize: 24,
    color: '#666',
    paddingLeft: WINDOW_WIDTH * 0.02,
    paddingRight: WINDOW_WIDTH * 0.02,
  },
  trashIcon: {
    fontSize: 24,
    color: '#666',
    paddingLeft: WINDOW_WIDTH * 0.02,
    paddingRight: WINDOW_WIDTH * 0.02,
  },
  selected: {
    color: PRIMARY_COLOR,
  },
};

@connect(
  state => {
    const {
      address,
      // address,
    } = state;

    // const {

    // } = props;

    return {
      isAuthUser: !!state.login.user,
      items: address.items,
      loading: address.loading,
      loaded: address.loaded,
      refreshing: address.refreshing,
    };
  },
  {
    ...addressActionCreators,
    ...getUserInfoByIdActionCreators,
    ...orderCreateActionCreators,
    ...couponSelectActionCreators,
    ...modalActionCreators,
  },
)
class CouponSelect extends React.Component {
  constructor(props) {
    super(props);

    this.handlerOnPress = this.handlerOnPress.bind(this);
  }

  componentDidMount() {
    const {
      judgeVoucherFetch,
      products,
      // products,
    } = this.props;
    judgeVoucherFetch({
      products,
    });
  }

  handlerOnPress(val) {
    const {
      couponSelectFetch,
      isAuthUser,
      navigation: { navigate, goBack },
    } = this.props;
    if (!isAuthUser) return navigate(SCREENS.Login);
    if (val.status === 0) return false;
    couponSelectFetch(val);
    return goBack();
  }

  renderHeaderTitle = () => {
    const stylesX = {
      container: {
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

    const { i18n } = this.props;

    return (
      <div style={stylesX.container}>
        <div style={stylesX.title}>{i18n.chooseCoupon}</div>
      </div>
    );
  };

  renderContent() {
    const {
      items,
      // navigation: { navigate },
      // i18n,
      // loading,
    } = this.props;

    return <CouponItem data={items} onPress={this.handlerOnPress} />;
  }

  render() {
    const { items, i18n, loading } = this.props;

    if (loading) return <Loader />;

    return (
      <div style={styles.container}>
        <BYHeader headerTitle={this.renderHeaderTitle()} />
        {items.length > 0 ? (
          this.renderContent()
        ) : (
          <EmptyState
            source={ouhrigdfnjsoeijehrJpg}
            text={i18n.temporarilyUnableReceiveVoucher}
            styleText={{ marginBottom: 0 }}
          />
        )}
      </div>
    );
  }
}

export default CouponSelect;

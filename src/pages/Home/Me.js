import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
import qs from 'qs';

import * as queryOrderListActionCreators from '@/common/actions/queryOrderList';
import * as cardQueryActionCreators from '@/common/actions/cardQuery';
import * as userCertificateInfoActionCreators from '@/common/actions/userCertificateInfo';
import * as getUserInfoByIdActionCreators from '@/common/actions/getUserInfoById';

import SeparateBar from '@/components/SeparateBar';
import {
  WINDOW_WIDTH,
  // SCREENS,
  STATUSBAR_HEIGHT,
  SCREENS,
} from '@/common/constants';
import { PRIMARY_COLOR, RED_COLOR } from '@/styles/variables';
import NavBar1 from '@/components/NavBar1';
import CustomIcon from '@/components/CustomIcon';
import BYHeader from '@/components/BYHeader';

const aioru09230fPng =
  'https://oss.buyoo.vn/usercollect/1/20181102094215_995.png';

@connect(
  (state, props) => {
    const {
      userCertificateInfo,
      login,
      queryOrderList,
      cardQuery,
      getUserInfoById,
    } = state;

    const { location } = props;

    return {
      location,
      getUserInfoByIdUserType: getUserInfoById.item.userType,
      orderItem: queryOrderList.item,
      certUser: userCertificateInfo.certUser,
      authUser: login.user,
      initPassword: cardQuery.item.initPassword,
      status: cardQuery.item.status,
    };
  },
  {
    ...getUserInfoByIdActionCreators,
    ...queryOrderListActionCreators,
    ...cardQueryActionCreators,
    ...userCertificateInfoActionCreators,
  },
)
class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.handleOnNavBar1Callback = this.handleOnNavBar1Callback.bind(this);
    // this.didFocusAddListener = this.didFocusAddListener.bind(this)
  }

  componentDidMount() {
    const {
      authUser,
      cardQueryFetch,
      userCertificateInfoFetch,
      getUserInfoByIdFetch,
    } = this.props;

    if (authUser) {
      cardQueryFetch();
      userCertificateInfoFetch();
      getUserInfoByIdFetch();
    }
  }

  didFocusAddListener() {
    const { authUser, queryOrderListFetch } = this.props;

    if (authUser) {
      queryOrderListFetch({
        index: 0,
        status: '99999',
      });
      queryOrderListFetch({
        index: 1,
        status: '10000',
      });
      queryOrderListFetch({
        index: 2,
        status: '30000',
      });
      queryOrderListFetch({
        index: 3,
        status: '30001',
      });
    }
  }

  handleOnNavBar1Callback(screens) {
    const { authUser } = this.props;

    switch (screens) {
      case SCREENS.AboutAs:
      case SCREENS.Settings:
      case SCREENS.Invite:
        router.push(`/${screens}`);
        break;

      default:
        if (authUser) {
          router.push(`/${screens}`);
        } else {
          router.push(`/${SCREENS.Login}`);
        }
        break;
    }
  }

  handleOnPressOrderNav(index) {
    const { authUser } = this.props;
    // await queryOrderListIndexFetch({
    //   scrollTabIndex: index,
    // });
    if (authUser) {
      router.push(
        `/${SCREENS.Order}?${qs.stringify({
          index,
        })}`,
      );
    } else {
      router.push(`/${SCREENS.Login}`);
    }
  }

  handleOnPressUser() {
    const { authUser } = this.props;

    if (authUser) {
      router.push(`/${SCREENS.Settings}`);
    } else {
      router.push(`/${SCREENS.Login}`);
    }
  }

  renderNav1() {
    const { orderItem } = this.props;

    const list = [
      {
        text: formatMessage({ id: 'pendingPayment' }),
        iconName: 'toBePaid',
        styleIcon: { fontSize: 25 },
      },
      {
        text: formatMessage({ id: 'pendingDelivery' }),
        iconName: 'toReceiveGoods',
        styleIcon: { fontSize: 23, paddingTop: 2 },
      },
      {
        text: formatMessage({ id: 'pendingEvaluation' }),
        iconName: 'beEvaluated',
        styleIcon: { fontSize: 22, paddingTop: 3 },
      },
    ];

    const styles = {
      nav1: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 5,
      },
      nav1Item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        position: 'relative',
        paddingTop: 10,
        paddingBottom: 10,
      },
      nav1ItemIcon: {
        fontSize: 22,
        color: '#ccc',
        marginBottom: 5,
      },
      nav1ItemText: {
        fontSize: 11,
        color: '#ccc',
        textAlign: 'center',
        paddingLeft: WINDOW_WIDTH * 0.01,
        paddingRight: WINDOW_WIDTH * 0.01,
      },
      nav1ItemBadge: {
        position: 'absolute',
        top: 5,
        right: WINDOW_WIDTH * 0.1,
        backgroundColor: RED_COLOR,
        color: '#fff',
        fontSize: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 1,
        borderRadius: 100,
      },
    };

    return (
      <div style={styles.nav1}>
        {list.map((val, key) => (
          <div
            style={styles.nav1Item}
            key={val.text}
            onClick={() => this.handleOnPressOrderNav(key + 1)}
          >
            <CustomIcon
              type={val.iconName}
              style={{ ...styles.nav1ItemIcon, ...val.styleIcon }}
            />
            <div style={styles.nav1ItemText}>{val.text}</div>
            {orderItem[key + 1].items.length > 0 && (
              <div style={styles.nav1ItemBadge}>
                {orderItem[key + 1].items.length > 0 &&
                  orderItem[key + 1].items.length}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  render() {
    const {
      certUser,
      authUser,
      getUserInfoByIdUserType,
      location,
    } = this.props;

    const headerIconImgSource =
      authUser && certUser ? { uri: certUser.headimage } : aioru09230fPng;

    const username = authUser
      ? certUser
      : formatMessage({ id: 'loginRegister' });
    const phone = authUser ? authUser.msisdn : '';

    const renderCellItem1List1 = [
      {
        name: formatMessage({ id: 'orders' }),
        func: () => this.handleOnNavBar1Callback(SCREENS.Order),
        tips: '',
      },
    ];
    const renderCellItem1List2 = [
      {
        name: formatMessage({ id: 'inviteFriends' }),
        func: () => this.handleOnNavBar1Callback(SCREENS.Invite),
        tips: '',
      },
      {
        name: formatMessage({ id: 'myCollection' }),
        func: () => this.handleOnNavBar1Callback(SCREENS.MyCollection),
        tips: '',
      },
      {
        name: formatMessage({ id: 'myCoupon' }),
        func: () => this.handleOnNavBar1Callback(SCREENS.CouponMy),
        tips: '',
      },
      {
        name: formatMessage({ id: 'securityCenter' }),
        func: () => this.handleOnNavBar1Callback(SCREENS.SecurityCenter),
        tips: '',
      },
      {
        name: formatMessage({ id: 'shippingAddress' }),
        func: () => this.handleOnNavBar1Callback(SCREENS.Address),
        tips: '',
      },
      {
        name: formatMessage({ id: 'settings' }),
        func: () => this.handleOnNavBar1Callback(SCREENS.Settings),
        tips: '',
      },
    ];

    if (getUserInfoByIdUserType === 2) {
      renderCellItem1List2.unshift({
        name: formatMessage({ id: 'myBill' }),
        navigate: SCREENS.BillMy,
        func: () => this.handleOnNavBar1Callback(SCREENS.BillMy),
        tips: '',
      });
    }

    const styles = {
      container: {
        flex: 1,
      },
      header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR,
        paddingTop: STATUSBAR_HEIGHT,
      },
      headerIcon: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 30,
      },
      headerIconImg: {
        height: 40,
        width: 40,
        borderRadius: 100,
        marginBottom: 5,
      },
      headerIconText: {
        fontSize: 11,
        color: '#fff',
      },
      headerBottom: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 15,
      },
      headerItem: {
        flex: 1,
        alignItems: 'center',
      },
      headerItemPrice: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
      },
      headerItemText: {
        color: '#fff',
        fontSize: 11,
      },
    };

    return (
      <div style={styles.container}>
        {location && <BYHeader title={formatMessage({ id: 'me' })} />}

        <div style={styles.header}>
          <div
            style={styles.headerIcon}
            onClick={() => this.handleOnPressUser()}
          >
            <img
              alt=""
              style={styles.headerIconImg}
              src={headerIconImgSource}
            />

            <div style={styles.headerIconText}>{username || phone}</div>
          </div>
          {/* {this.renderHeaderBottom()} */}
        </div>
        <NavBar1
          list={renderCellItem1List1}
          // callback={this.handleOnNavBar1Callback}
        />
        {this.renderNav1()}
        <SeparateBar />
        <NavBar1
          list={renderCellItem1List2}
          // callback={this.handleOnNavBar1Callback}
          styleItemLeft={{ flex: 3 }}
        />
      </div>
    );
  }
}

export default Index;

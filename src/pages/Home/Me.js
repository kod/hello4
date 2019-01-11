import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { i18n, View } from '@src/API';
import router from 'umi/lib/router';
import qs from 'qs';

import * as queryOrderListActionCreators from '@src/common/actions/queryOrderList';
import * as cardQueryActionCreators from '@src/common/actions/cardQuery';
// import * as userCertificateInfoActionCreators from '@src/common/actions/userCertificateInfo';
import * as getUserInfoByIdActionCreators from '@src/common/actions/getUserInfoById';

import SeparateBar from '@src/components/SeparateBar';
import {
  WINDOW_WIDTH,
  // SCREENS,
  STATUSBAR_HEIGHT,
  SCREENS,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@src/common/constants';
import { PRIMARY_COLOR, RED_COLOR } from '@src/styles/variables';
import NavBar1 from '@src/components/NavBar1';
import CustomIcon from '@src/components/CustomIcon';
import BYHeader from '@src/components/BYHeader';
import { xOssProcess } from '@src/utils';
import { getLoginUser } from '@src/common/selectors';

const aioru09230fPng =
  'https://oss.buyoo.vn/usercollect/1/20181102094215_995.png';

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.handleOnNavBar1Callback = this.handleOnNavBar1Callback.bind(this);
  }

  componentDidMount() {
    const {
      authUser,
      cardQueryFetch,
      // userCertificateInfoFetch,
      getUserInfoByIdFetch,
    } = this.props;

    if (authUser) {
      cardQueryFetch();
      // userCertificateInfoFetch();
      getUserInfoByIdFetch();
    }
    this.didFocusAddListener();
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
        text: i18n.pendingPayment,
        iconName: 'toBePaid',
        styleIcon: { fontSize: 25 },
      },
      {
        text: i18n.pendingDelivery,
        iconName: 'toReceiveGoods',
        styleIcon: { fontSize: 23, paddingTop: 2 },
      },
      {
        text: i18n.pendingEvaluation,
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
      <View style={styles.nav1}>
        {list.map((val, key) => (
          <View
            style={styles.nav1Item}
            key={val.text}
            onClick={() => this.handleOnPressOrderNav(key + 1)}
          >
            <CustomIcon
              name={val.iconName}
              type={val.iconName}
              style={{ ...styles.nav1ItemIcon, ...val.styleIcon }}
            />
            <View style={styles.nav1ItemText}>{val.text}</View>
            {orderItem[key + 1].items.length > 0 && (
              <View style={styles.nav1ItemBadge}>
                {orderItem[key + 1].items.length > 0 &&
                  orderItem[key + 1].items.length}
              </View>
            )}
          </View>
        ))}
      </View>
    );
  }

  render() {
    const {
      // certUser,
      authUser,
      getUserInfoByIdUserType,
      location,
    } = this.props;

    const headerIconImgSource = aioru09230fPng;

    const username = authUser ? authUser.msisdn : i18n.loginRegister;
    const phone = authUser ? authUser.msisdn : '';

    const renderCellItem1List1 = [
      {
        name: i18n.orders,
        func: () => this.handleOnNavBar1Callback(SCREENS.Order),
        tips: '',
      },
    ];

    const renderCellItem1List2 = [
      // {
      //   name: i18n.inviteFriends,
      //   func: () => this.handleOnNavBar1Callback(SCREENS.Invite),
      //   tips: '',
      // },
      {
        name: i18n.myBrokerage,
        func: () => this.handleOnNavBar1Callback(SCREENS.Withdraw),
        tips: '',
      },
      {
        name: i18n.myCollection,
        func: () => this.handleOnNavBar1Callback(SCREENS.MyCollection),
        tips: '',
      },
      {
        name: i18n.myCoupon,
        func: () => this.handleOnNavBar1Callback(SCREENS.CouponMy),
        tips: '',
      },
      // {
      //   name: i18n.securityCenter,
      //   func: () => this.handleOnNavBar1Callback(SCREENS.SecurityCenter),
      //   tips: '',
      // },
      {
        name: i18n.shippingAddress,
        func: () => this.handleOnNavBar1Callback(SCREENS.Address),
        tips: '',
      },
      {
        name: i18n.settings,
        func: () => this.handleOnNavBar1Callback(SCREENS.Settings),
        tips: '',
      },
    ];

    if (getUserInfoByIdUserType === 2) {
      renderCellItem1List2.unshift({
        name: i18n.myBill,
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
      <View style={styles.container}>
        {location && <BYHeader title={i18n.me} />}

        <View style={styles.header}>
          <View
            style={styles.headerIcon}
            onClick={() => this.handleOnPressUser()}
          >
            <img
              alt=""
              style={styles.headerIconImg}
              src={`${headerIconImgSource}?${xOssProcess(
                IS_IOS,
                OSS_IMAGE_QUALITY,
              )}`}
            />

            <View style={styles.headerIconText}>{username || phone}</View>
          </View>
        </View>
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
      </View>
    );
  }
}

export default connect(
  (state, props) => {
    const {
      // userCertificateInfo,
      queryOrderList,
      cardQuery,
      getUserInfoById,
    } = state;

    const { location } = props;

    return {
      location,
      getUserInfoByIdUserType: getUserInfoById.item.userType,
      orderItem: queryOrderList.item,
      // certUser: userCertificateInfo.certUser,
      authUser: getLoginUser(state, props),
      initPassword: cardQuery.item.initPassword,
      status: cardQuery.item.status,
    };
  },
  {
    ...getUserInfoByIdActionCreators,
    ...queryOrderListActionCreators,
    ...cardQueryActionCreators,
    // ...userCertificateInfoActionCreators,
  },
)(Index);

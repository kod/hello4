import React from 'react';
import { i18n, View, Text } from '@src/API';
import { connect } from 'react-redux';
import router from 'umi/lib/router';
import { Modal } from 'antd-mobile';
import qs from 'qs';

import CustomIcon from '@src/components/CustomIcon';
import {
  SIDEINTERVAL,
  WINDOW_WIDTH,
  SCREENS,
  MESSAGE_URL,
  LOCALSTORAGE_INVITE,
} from '@src/common/constants';
import {
  BORDER_COLOR,
  PRIMARY_COLOR,
  FONT_COLOR_FIFTH,
  FONT_COLOR_SECOND,
  FONT_COLOR_FIRST,
  FONT_SIZE_SECOND,
} from '@src/styles/variables';

import * as collectionActionCreators from '@src/common/actions/collection';
import * as modalActionCreators from '@src/common/actions/modal';
import * as cartActionCreators from '@src/common/actions/cart';
import {
  addEventListenerBuyoo,
  removeEventListenerBuyoo,
  localStorageSetItem,
} from '@src/utils';
import { getLoginUser } from '@src/common/selectors';
import ProductDetailMain from './ProductDetailMain';
import stylesLess from './index.less';

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowNavHeader: false,
    };
  }

  componentDidMount() {
    const { authUser, collectionFetch, inviteID } = this.props;

    if (inviteID) {
      // 24小时内有效，订单创建成功后，会自动删除
      localStorageSetItem(
        LOCALSTORAGE_INVITE,
        JSON.stringify({
          inviteID,
          validTime: Date.now() + 24 * 60 * 60 * 1000,
        }),
      );
    }
    if (authUser) {
      collectionFetch();
    }
    addEventListenerBuyoo('scroll', this.addEventListenerHandleScroll);
  }

  componentWillUnmount() {
    clearTimeout(this.setTimeoutId);
    removeEventListenerBuyoo('scroll', this.addEventListenerHandleScroll);
  }

  addEventListenerHandleScroll = () => {
    const scrollTop =
      document.body.scrollTop + document.documentElement.scrollTop;
    if (scrollTop > 45) {
      this.setState({
        isShowNavHeader: true,
      });
    } else {
      this.setState({
        isShowNavHeader: false,
      });
    }
  };

  handleOnPressAddCart = () => {
    const { id, name, authUser, cartAddRequest } = this.props;
    if (!authUser) return router.push('/Login');

    if (!id) return false;

    const param = [
      {
        quantity: 1,
        subject: name,
        itemId: id,
      },
    ];

    return cartAddRequest(JSON.stringify(param));
  };

  handleOnPressBuy() {
    const { numbers, authUser, brandId, id } = this.props;
    if (!authUser) return router.push('/Login');
    if (!(numbers > 0)) return false;
    return router.push(
      `/${SCREENS.OrderWrite}?${qs.stringify({
        groupon: false,
        brandId,
        id,
      })}`,
    );
  }

  handleOnModalOperation() {
    const { authUser } = this.props;
    Modal.operation([
      {
        text: authUser ? i18n.me : i18n.login,
        onPress: () => (authUser ? router.push(`/Me`) : router.push('/Login')),
      },
      {
        text: i18n.home,
        onPress: () => router.push(`/`),
      },
      {
        text: i18n.myOrder,
        onPress: () =>
          authUser ? router.push(`/Order`) : router.push('/Login'),
      },
      {
        text: i18n.myCollection,
        onPress: () =>
          authUser ? router.push(`/MyCollection`) : router.push('/Login'),
      },
    ]);
  }

  handleToggleService() {
    const { authUser, funid, brandId, typeId, name } = this.props;
    let linkStr = `${MESSAGE_URL}?ref=`;
    let funIdStr = '';
    let typeID = 0;
    if (undefined !== typeId) {
      typeID = typeId;
    }
    if (authUser) {
      funIdStr = funid;
    }
    let shareName = '';
    if (undefined !== name) {
      shareName = name;
    }
    const param = {
      brand_id: brandId,
      fun_id: funIdStr,
      type_id: typeID,
      name: shareName,
    };
    linkStr += JSON.stringify(param);
    window.location.href = linkStr;
  }

  renderHeaderRight = () => {
    const styles = {
      container: {
        paddingLeft: SIDEINTERVAL / 2,
        paddingRight: SIDEINTERVAL,
        paddingTop: 10,
        paddingBottom: 10,
      },
      icon: {
        fontSize: 16,
      },
    };
    return (
      <View style={styles.container}>
        <CustomIcon name="gengduo" type="gengduo" style={styles.icon} />
      </View>
    );
  };

  renderDefaultHeader() {
    const styles = {
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99,
        height: 50,
      },
      headerLeft: {
        marginTop: 10,
        marginLeft: 10,
        left: SIDEINTERVAL / 2,
        backgroundColor: 'rgba(0,0,0,.4)',
        height: 30,
        width: 30,
        borderRadius: 15,
      },
      headerRight: {
        marginTop: 10,
        marginRight: 10,
        left: SIDEINTERVAL / 2,
        backgroundColor: 'rgba(0,0,0,.4)',
        height: 30,
        width: 30,
        borderRadius: 15,
      },
      backIcon: {
        height: '20px',
        width: '20px',
        marginTop: '5px',
        marginBottom: '5px',
        marginLeft: '5px',
        marginRight: '5px',
        fontSize: 20,
        color: FONT_COLOR_FIFTH,
      },
    };

    return (
      <View style={styles.header}>
        <View
          style={styles.headerLeft}
          onClick={() => {
            router.go(-1);
            this.setTimeoutId = setTimeout(() => {
              router.push(`/`);
            }, 300);
          }}
        >
          <CustomIcon name="left" type="left" style={styles.backIcon} />
        </View>
        {/* <View
          style={styles.headerRight}
          onClick={() => this.handleOnModalOperation()}
        >
          <CustomIcon name="gengduo" type="gengduo" style={styles.backIcon} />
        </View> */}
      </View>
    );
  }

  renderNavHeader() {
    const { isShowNavHeader } = this.state;
    const styles = {
      navHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99,
        height: isShowNavHeader ? 45 : 0,
        overflow: isShowNavHeader ? 'auto' : 'hidden',
        backgroundColor: '#fff',
        borderBottomColor: BORDER_COLOR,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
      },
      navHeaderWrap: {
        display: 'flex',
        flex: 1,
        padding: 0,
      },
      navHeaderItem: {
        display: 'flex',
        flex: 1,
        listStyle: 'none',
      },
      navHeaderText: {
        flex: 1,
        textAlign: 'center',
        color: FONT_COLOR_FIRST,
        fontSize: FONT_SIZE_SECOND,
      },
      navHeaderLeft: {
        // paddingRight: SIDEINTERVAL,
      },
      navHeaderIcon: {
        color: FONT_COLOR_SECOND,
        width: WINDOW_WIDTH * 0.12,
        height: 45,
        lineHeight: '45px',
        fontSize: 20,
      },
      navHeaderRight: {
        height: 45,
        width: 45,
        // paddingLeft: SIDEINTERVAL,
      },
      navHeaderLocationIcon: {
        display: 'none',
        marginRight: SIDEINTERVAL * 0.1,
        fontSize: 12,
      },
      navHeaderSpan: {
        display: 'inline-block',
        height: 45,
        lineHeight: '45px',
      },
    };

    return (
      <View data-gumshoe-header data-scroll-header style={styles.navHeader}>
        <View
          style={styles.navHeaderLeft}
          onClick={() => {
            router.go(-1);
            this.setTimeoutId = setTimeout(() => {
              router.push(`/`);
            }, 300);
          }}
        >
          <CustomIcon name="left" type="left" style={styles.navHeaderIcon} />
        </View>
        <ul style={styles.navHeaderWrap} data-gumshoe onClick={() => {}}>
          <li style={styles.navHeaderItem}>
            <p style={styles.navHeaderText} data-scroll href="#navproduct">
              {/* <CustomIcon
                name="location"
                type="location"
                style={styles.navHeaderLocationIcon}
              /> */}
              <Text style={styles.navHeaderSpan}>{i18n.overview}</Text>
            </p>
          </li>
          <li style={styles.navHeaderItem}>
            <p style={styles.navHeaderText} data-scroll href="#navcomment">
              {/* <CustomIcon
                name="location"
                type="location"
                style={styles.navHeaderLocationIcon}
              /> */}
              <Text style={styles.navHeaderSpan}>{i18n.evaluation}</Text>
            </p>
          </li>
          <li style={styles.navHeaderItem}>
            <p
              style={styles.navHeaderText}
              data-scroll
              href="#productDescription"
            >
              {/* <CustomIcon
                name="location"
                type="location"
                style={styles.navHeaderLocationIcon}
              /> */}
              <Text style={styles.navHeaderSpan}>{i18n.details}</Text>
            </p>
          </li>
          <li style={styles.navHeaderItem}>
            <p style={styles.navHeaderText} data-scroll href="#navparameters">
              {/* <CustomIcon
                name="location"
                type="location"
                style={styles.navHeaderLocationIcon}
              /> */}
              <Text style={styles.navHeaderSpan}>{i18n.parameter}</Text>
            </p>
          </li>
        </ul>
        <View
          style={styles.navHeaderRight}
          onClick={() => this.handleOnModalOperation()}
        >
          {/* <CustomIcon name="gengduo" type="gengduo" style={styles.navHeaderIcon} /> */}
        </View>
      </View>
    );
  }

  renderOperate() {
    const { numbers } = this.props;

    const styles = {
      operate: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99,
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        borderTopColor: BORDER_COLOR,
        borderTopWidth: 1,
        borderTopStyle: 'solid',
      },
      operateIcon: {
        display: 'flex',
        width: (WINDOW_WIDTH * 12) / 24,
        backgroundColor: '#fff',
        flexDirection: 'row',
      },
      operateIconItem: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      operateIconItemSeparate: {
        position: 'absolute',
        right: 0,
        top: 10,
        bottom: 10,
        width: 1,
        backgroundColor: BORDER_COLOR,
      },
      operateIconItemIcon: {
        fontSize: 21,
      },
      operateIconItemActive: {
        color: PRIMARY_COLOR,
      },
      // favoriteItem: {
      //   fontSize: 21,
      // },
      // favoriteIconActive: {
      //   color: PRIMARY_COLOR,
      // },
      operateIconItemText: {
        fontSize: 10,
        lineHeight: 1,
        paddingTop: 2,
        textAlign: 'center',
      },
      operateLeft: {
        width: (WINDOW_WIDTH * 6) / 24,
        height: 49,
        lineHeight: `${10 * 1.618}px`,
        textAlign: 'center',
        fontSize: 10,
        paddingTop: 10,
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        color: '#fff',
        backgroundColor: '#81bbf9',
        flexWrap: 'wrap',
      },
      operateRight: {
        width: (WINDOW_WIDTH * 12) / 24,
        height: 49,
        lineHeight: `${49}px`,
        textAlign: 'center',
        fontSize: 14,
        color: '#fff',
        backgroundColor: PRIMARY_COLOR,
      },
      disable: {
        opacity: 0.5,
      },
    };

    return (
      <View style={styles.operate}>
        <View style={styles.operateIcon}>
          <View
            style={styles.operateIconItem}
            onClick={() => this.handleToggleService()}
            // onClick={() => this.handleToggleCollection()}
          >
            {/* {isCollection ? (
              <CustomIcon
                name="heart-fill"
                type="heart-fill"
                style={{
                  ...styles.favoriteItem,
                }}
              />
            ) : (
              <CustomIcon name="iconmessages" type="iconmessages" style={styles.favoriteItem} />
            )} */}
            <View style={styles.operateIconItemSeparate} />
            <CustomIcon
              name="iconmessages"
              type="iconmessages"
              style={styles.operateIconItemIcon}
            />
            <View
              style={{
                ...styles.operateIconItemText,
                // ...(isCollection && styles.operateIconItemActive),
              }}
            >
              {i18n.messenger}
            </View>
          </View>
          <View
            style={styles.operateIconItem}
            onClick={() => this.handleOnPressAddCart()}
          >
            <CustomIcon
              name="iconcart"
              type="iconcart"
              style={styles.operateIconItemIcon}
            />

            <View style={styles.operateIconItemText}>{i18n.addToCart}</View>
          </View>
        </View>
        {/* <View
          style={styles.operateLeft}
          onClick={() => this.handleOnPressAddCart()}
        >
          {i18n.addToCart}
        </View> */}
        <View
          style={{
            ...styles.operateRight,
            ...(!(numbers > 0) && styles.disable),
          }}
          onClick={() => this.handleOnPressBuy()}
        >
          {numbers > 0 ? i18n.buy : i18n.soldOut}
        </View>
      </View>
    );
  }

  render() {
    const { query, pathname } = this.props;

    const styles = {
      container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      },
      main: {
        position: 'relative',
        paddingBottom: 50,
      },
    };

    return (
      <View style={styles.container} className={stylesLess.container}>
        {this.renderNavHeader()}
        {this.renderDefaultHeader()}
        <View style={styles.main}>
          <ProductDetailMain query={query} pathname={pathname} />
        </View>
        {this.renderOperate()}
      </View>
    );
  }
}

export default connect(
  (state, props) => {
    const { productDetailInfo } = state;
    const {
      location: { query = {}, pathname = '' },
    } = props;

    return {
      ...productDetailInfo.item,
      query,
      inviteID: query.inviteID || '',
      pathname,
      authUser: getLoginUser(state, props),
      // isCollection: getIsCollection(state, props),
    };
  },
  {
    ...modalActionCreators,
    ...collectionActionCreators,
    ...cartActionCreators,
  },
)(Index);

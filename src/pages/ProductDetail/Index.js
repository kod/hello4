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
import classNames from 'classnames';

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
import styles from './index.less';
import headerStyles from './header.less';
import headerRightStyles from './headerRight.less';
import navHeaderStyles from './navHeader.less';
import operateStyles from './operate.less';

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

  renderHeaderRight = () => (
    <View
      style={{
        paddingLeft: SIDEINTERVAL / 2,
        paddingRight: SIDEINTERVAL,
      }}
      className={headerRightStyles.container}
    >
      <CustomIcon
        name="gengduo"
        type="gengduo"
        className={headerRightStyles.icon}
      />
    </View>
  );

  renderDefaultHeader() {
    return (
      <View className={headerStyles.header}>
        <View
          style={{
            left: SIDEINTERVAL / 2,
          }}
          className={headerStyles.headerLeft}
          onClick={() => {
            router.go(-1);
            this.setTimeoutId = setTimeout(() => {
              router.push(`/`);
            }, 300);
          }}
        >
          <CustomIcon
            name="left"
            type="left"
            className={headerStyles.backIcon}
          />
        </View>
        {/* <View
          style={{
            left: SIDEINTERVAL / 2,
          }}
          className={headerStyles.headerRight}
          onClick={() => this.handleOnModalOperation()}
        >
          <CustomIcon name="gengduo" type="gengduo" className={headerStyles.backIcon} />
        </View> */}
      </View>
    );
  }

  renderNavHeader() {
    const { isShowNavHeader } = this.state;

    return (
      <View
        data-gumshoe-header
        data-scroll-header
        style={{
          height: isShowNavHeader ? 45 : 0,
          overflow: isShowNavHeader ? 'auto' : 'hidden',
        }}
        className={navHeaderStyles.navHeader}
      >
        <View
          className={navHeaderStyles.navHeaderLeft}
          onClick={() => {
            router.go(-1);
            this.setTimeoutId = setTimeout(() => {
              router.push(`/`);
            }, 300);
          }}
        >
          <CustomIcon
            name="left"
            type="left"
            style={{
              width: WINDOW_WIDTH * 0.12,
            }}
            className={navHeaderStyles.navHeaderIcon}
          />
        </View>
        <ul
          className={navHeaderStyles.navHeaderWrap}
          data-gumshoe
          onClick={() => {}}
        >
          <li className={navHeaderStyles.navHeaderItem}>
            <p
              className={navHeaderStyles.navHeaderText}
              data-scroll
              href="#navproduct"
            >
              {/* <CustomIcon
                name="location"
                type="location"
                style={{
                  margin-right: SIDEINTERVAL * 0.1
                }}
                className={navHeaderStyles.navHeaderLocationIcon}
              /> */}
              <Text className={navHeaderStyles.navHeaderSpan}>
                {i18n.overview}
              </Text>
            </p>
          </li>
          <li className={navHeaderStyles.navHeaderItem}>
            <p
              className={navHeaderStyles.navHeaderText}
              data-scroll
              href="#navcomment"
            >
              {/* <CustomIcon
                name="location"
                type="location"
                style={{
                  margin-right: SIDEINTERVAL * 0.1
                }}
                className={navHeaderStyles.navHeaderLocationIcon}
              /> */}
              <Text className={navHeaderStyles.navHeaderSpan}>
                {i18n.evaluation}
              </Text>
            </p>
          </li>
          <li className={navHeaderStyles.navHeaderItem}>
            <p
              className={navHeaderStyles.navHeaderText}
              data-scroll
              href="#productDescription"
            >
              {/* <CustomIcon
                name="location"
                type="location"
                style={{
                  margin-right: SIDEINTERVAL * 0.1
                }}
                className={navHeaderStyles.navHeaderLocationIcon}
              /> */}
              <Text className={navHeaderStyles.navHeaderSpan}>
                {i18n.details}
              </Text>
            </p>
          </li>
          <li className={navHeaderStyles.navHeaderItem}>
            <p
              className={navHeaderStyles.navHeaderText}
              data-scroll
              href="#navparameters"
            >
              {/* <CustomIcon
                name="location"
                type="location"
                style={{
                  margin-right: SIDEINTERVAL * 0.1
                }}
                className={navHeaderStyles.navHeaderLocationIcon}
              /> */}
              <Text className={navHeaderStyles.navHeaderSpan}>
                {i18n.parameter}
              </Text>
            </p>
          </li>
        </ul>
        <View
          className={navHeaderStyles.navHeaderRight}
          onClick={() => this.handleOnModalOperation()}
        >
          {/* <CustomIcon name="gengduo" type="gengduo" style={navHeaderStyles.navHeaderIcon} /> */}
        </View>
      </View>
    );
  }

  renderOperate() {
    const { numbers } = this.props;

    return (
      <View className={operateStyles.operate}>
        <View
          style={{
            width: (WINDOW_WIDTH * 12) / 24,
          }}
          className={operateStyles.operateIcon}
        >
          <View
            className={operateStyles.operateIconItem}
            onClick={() => this.handleToggleService()}
            // onClick={() => this.handleToggleCollection()}
          >
            {/* {isCollection ? (
              <CustomIcon
                name="heart-fill"
                type="heart-fill"
                style={{
                  ...operateStyles.favoriteItem,
                }}
              />
            ) : (
              <CustomIcon name="iconmessages" type="iconmessages" style={operateStyles.favoriteItem} />
            )} */}
            <View className={operateStyles.operateIconItemSeparate} />
            <CustomIcon
              name="iconmessages"
              type="iconmessages"
              className={operateStyles.operateIconItemIcon}
            />
            <View className={operateStyles.operateIconItemText}>
              {i18n.messenger}
            </View>
          </View>
          <View
            className={operateStyles.operateIconItem}
            onClick={() => this.handleOnPressAddCart()}
          >
            <CustomIcon
              name="iconcart"
              type="iconcart"
              className={operateStyles.operateIconItemIcon}
            />

            <View className={operateStyles.operateIconItemText}>
              {i18n.addToCart}
            </View>
          </View>
        </View>
        {/* <View
          style={{
              width: (WINDOW_WIDTH * 6) / 24,
              paddingLeft: SIDEINTERVAL,
              paddingRight: SIDEINTERVAL,
          }}
          className={operateStyles.operateLeft}
          onClick={() => this.handleOnPressAddCart()}
        >
          {i18n.addToCart}
        </View> */}
        <View
          style={{
            width: (WINDOW_WIDTH * 12) / 24,
          }}
          className={classNames(styles.operateRight, {
            [operateStyles.disable]: !(numbers > 0),
          })}
          onClick={() => this.handleOnPressBuy()}
        >
          {numbers > 0 ? i18n.buy : i18n.soldOut}
        </View>
      </View>
    );
  }

  render() {
    const { query, pathname } = this.props;

    return (
      <View className={styles.container}>
        {this.renderNavHeader()}
        {this.renderDefaultHeader()}
        <View className={styles.main}>
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

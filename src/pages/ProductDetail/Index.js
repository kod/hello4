import React from 'react';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import router from 'umi/router';
import { Modal } from 'antd-mobile';
import qs from 'qs';

import stylesLess from './index.less';
import CustomIcon from '@/components/CustomIcon';
import {
  SIDEINTERVAL,
  WINDOW_WIDTH,
  SCREENS,
  MESSAGE_URL,
  BUYOO,
} from '@/common/constants';
import {
  BORDER_COLOR,
  PRIMARY_COLOR,
  FONT_COLOR_FIFTH,
  FONT_COLOR_SECOND,
  FONT_COLOR_FIRST,
  FONT_SIZE_SECOND,
} from '@/styles/variables';
import ProductDetailMain from './ProductDetailMain';

import * as collectionActionCreators from '@/common/actions/collection';
import * as modalActionCreators from '@/common/actions/modal';
import * as cartActionCreators from '@/common/actions/cart';
import { b, addEventListener, removeEventListener } from '@/utils';
import { getIsCollection } from '@/common/selectors';
import { o } from '@/utils/AuthEncrypt';

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowNavHeader: false,
    };
  }

  componentDidMount() {
    const { authUser, collectionFetch } = this.props;

    if (authUser) {
      collectionFetch();
    }
    addEventListener('scroll', this.addEventListenerHandleScroll);
  }

  componentWillUnmount() {
    clearTimeout(this.setTimeoutId);
    removeEventListener('scroll', this.addEventListenerHandleScroll);
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
        text: authUser
          ? formatMessage({ id: 'me' })
          : formatMessage({ id: 'login' }),
        onPress: () => (authUser ? router.push(`/Me`) : router.push('/Login')),
      },
      {
        text: formatMessage({ id: 'home' }),
        onPress: () => router.push(`/`),
      },
      {
        text: formatMessage({ id: 'myOrder' }),
        onPress: () =>
          authUser ? router.push(`/Order`) : router.push('/Login'),
      },
      {
        text: formatMessage({ id: 'myCollection' }),
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

  handleToggleCollection() {
    const {
      collectionAddFetch,
      collectionRemoveFetch,
      isCollection,
      authUser,
      brandId,
    } = this.props;
    if (!authUser) return router.push(`/login`);
    return isCollection
      ? collectionRemoveFetch(brandId.toString())
      : collectionAddFetch(brandId.toString());
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
      <div style={styles.container}>
        <CustomIcon type="gengduo" style={styles.icon} />
      </div>
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
      <div style={styles.header}>
        <div
          style={styles.headerLeft}
          onClick={() => {
            router.go(-1);
            this.setTimeoutId = setTimeout(() => {
              router.push(`/`);
            }, 300);
          }}
        >
          <CustomIcon type="left" style={styles.backIcon} />
        </div>
        <div
          style={styles.headerRight}
          onClick={() => this.handleOnModalOperation()}
        >
          <CustomIcon type="gengduo" style={styles.backIcon} />
        </div>
      </div>
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
        paddingRight: SIDEINTERVAL,
      },
      navHeaderIcon: {
        color: FONT_COLOR_SECOND,
        width: WINDOW_WIDTH * 0.12,
        height: 45,
        lineHeight: '45px',
        fontSize: 20,
      },
      navHeaderRight: {
        paddingLeft: SIDEINTERVAL,
      },
      navHeaderLocationIcon: {
        display: 'none',
        marginRight: SIDEINTERVAL * 0.1,
        fontSize: 12,
      },
    };

    return (
      <div data-gumshoe-header data-scroll-header style={styles.navHeader}>
        <div
          style={styles.navHeaderLeft}
          onClick={() => {
            router.go(-1);
            this.setTimeoutId = setTimeout(() => {
              router.push(`/`);
            }, 300);
          }}
        >
          <CustomIcon type="left" style={styles.navHeaderIcon} />
        </div>
        <ul style={styles.navHeaderWrap} data-gumshoe>
          <li style={styles.navHeaderItem}>
            <p style={styles.navHeaderText} data-scroll href="#navproduct">
              <CustomIcon
                type="location"
                style={styles.navHeaderLocationIcon}
              />
              <span>商品</span>
            </p>
          </li>
          <li style={styles.navHeaderItem}>
            <p style={styles.navHeaderText} data-scroll href="#navcomment">
              <CustomIcon
                type="location"
                style={styles.navHeaderLocationIcon}
              />
              <span>评论</span>
            </p>
          </li>
          <li style={styles.navHeaderItem}>
            <p
              style={styles.navHeaderText}
              data-scroll
              href="#productDescription"
            >
              <CustomIcon
                type="location"
                style={styles.navHeaderLocationIcon}
              />
              <span>详情</span>
            </p>
          </li>
          <li style={styles.navHeaderItem}>
            <p style={styles.navHeaderText} data-scroll href="#navparameters">
              <CustomIcon
                type="location"
                style={styles.navHeaderLocationIcon}
              />
              <span>参数</span>
            </p>
          </li>
        </ul>
        <div
          style={styles.navHeaderRight}
          onClick={() => this.handleOnModalOperation()}
        >
          <CustomIcon type="gengduo" style={styles.navHeaderIcon} />
        </div>
      </div>
    );
  }

  renderOperate() {
    const { numbers, isCollection } = this.props;

    const styles = {
      operate: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99,
        height: 45,
        display: 'flex',
        flexDirection: 'row',
        borderTopColor: BORDER_COLOR,
        borderTopWidth: 1,
        borderTopStyle: 'solid',
      },
      operateIcon: {
        display: 'flex',
        width: (WINDOW_WIDTH * 9) / 24,
        backgroundColor: '#fff',
        flexDirection: 'row',
      },
      operateIconItem: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      operateIconItemIcon: {
        fontSize: 16,
      },
      operateIconItemActive: {
        color: PRIMARY_COLOR,
      },
      favoriteItem: {
        fontSize: 16,
      },
      favoriteIconActive: {
        color: PRIMARY_COLOR,
      },
      operateIconItemText: {
        fontSize: 10,
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
        width: (WINDOW_WIDTH * 9) / 24,
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
      <div style={styles.operate}>
        <div style={styles.operateIcon}>
          <div
            style={styles.operateIconItem}
            onClick={() => this.handleToggleCollection()}
          >
            {isCollection ? (
              <CustomIcon
                type="heart-fill"
                style={{
                  ...styles.favoriteItem,
                  ...styles.operateIconItemActive,
                }}
              />
            ) : (
              <CustomIcon type="heart" style={styles.favoriteItem} />
            )}
            <div
              style={{
                ...styles.operateIconItemText,
                ...(isCollection && styles.operateIconItemActive),
              }}
            >
              {formatMessage({ id: 'collect' })}
            </div>
          </div>
          <div
            style={styles.operateIconItem}
            onClick={() => this.handleToggleService()}
          >
            <CustomIcon type="service" style={styles.operateIconItemIcon} />

            <div style={styles.operateIconItemText}>
              {formatMessage({ id: 'service' })}
            </div>
          </div>
        </div>
        <div
          style={styles.operateLeft}
          onClick={() => this.handleOnPressAddCart()}
        >
          {formatMessage({ id: 'addToCart' })}
        </div>
        <div
          style={{
            ...styles.operateRight,
            ...(!(numbers > 0) && styles.disable),
          }}
          onClick={() => this.handleOnPressBuy()}
        >
          {numbers > 0
            ? formatMessage({ id: 'buy' })
            : formatMessage({ id: 'soldOut' })}
        </div>
      </div>
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
      <div style={styles.container} className={stylesLess.container}>
        {this.renderNavHeader()}
        {this.renderDefaultHeader()}
        <div style={styles.main}>
          <ProductDetailMain query={query} pathname={pathname} />
        </div>
        {this.renderOperate()}
      </div>
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
      pathname,
      authUser: o(b, BUYOO),
      isCollection: getIsCollection(state, props),
    };
  },
  {
    ...modalActionCreators,
    ...collectionActionCreators,
    ...cartActionCreators,
  },
)(Index);

import React from 'react';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import router from 'umi/router';
import { Modal } from 'antd-mobile';

import stylesLess from './index.less';
import CustomIcon from '@/components/CustomIcon';
// import BYHeader from '@/components/BYHeader';
import {
  SIDEINTERVAL,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  SCREENS,
  MESSAGE_URL,
} from '@/common/constants';
import {
  BORDER_COLOR,
  PRIMARY_COLOR,
  RED_COLOR,
  FONT_COLOR_FIFTH,
} from '@/styles/variables';
import ProductDetailMain from './ProductDetailMain';

import * as collectionActionCreators from '@/common/actions/collection';
import * as modalActionCreators from '@/common/actions/modal';
import ProductDetailComment from './ProductDetailComment';
import { addEventListener, removeEventListener } from '@/utils';
import { getIsCollection } from '@/common/selectors';

@connect(
  (state, props) => {
    const { login, productDetailInfo } = state;
    const {
      location: { query = {}, pathname = '' },
    } = props;

    return {
      ...productDetailInfo.item,
      query,
      pathname,
      authUser: login.user,
      isCollection: getIsCollection(state, props),
    };
  },
  {
    ...modalActionCreators,
    ...collectionActionCreators,
  },
)
class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowProductDetailComment: false,
    };
    this.addEventListenerHandle = this.addEventListenerHandle.bind(this);
  }

  componentDidMount() {
    const { authUser, collectionFetch } = this.props;

    if (authUser) {
      collectionFetch();
    }
    addEventListener(SCREENS.ProductDetail, this.addEventListenerHandle);
  }

  componentWillUnmount() {
    removeEventListener(SCREENS.ProductDetail, this.addEventListenerHandle);
    clearTimeout(this.setTimeoutId);
  }

  addEventListenerHandle = () => {
    const { isShowProductDetailComment } = this.state;
    this.setState({
      isShowProductDetailComment: !isShowProductDetailComment,
    });
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
    const { numbers, authUser } = this.props;
    if (!authUser) return router.push('/Login');
    if (!(numbers > 0)) return false;
    return router.push(`/OrderWrite?groupon=false`);
    // return navigate(SCREENS.OrderWrite, {
    //   groupon,
    // });
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

  render() {
    const { isShowProductDetailComment } = this.state;
    const { numbers, isCollection, query, pathname, authUser } = this.props;

    const styles = {
      container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: WINDOW_HEIGHT,
      },
      main: {
        flex: 1,
        overflowY: 'auto',
      },
      operate: {
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
        width: (WINDOW_WIDTH * 5) / 24,
        height: 49,
        lineHeight: `${10 * 1.618}px`,
        textAlign: 'center',
        fontSize: 10,
        paddingTop: 8,
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        color: '#fff',
        backgroundColor: '#81bbf9',
        flexWrap: 'wrap',
      },
      operateRight: {
        width: (WINDOW_WIDTH * 10) / 24,
        height: 49,
        lineHeight: `${49}px`,
        textAlign: 'center',
        fontSize: 14,
        color: '#fff',
        backgroundColor: PRIMARY_COLOR,
      },
      operateGroupLeft: {
        flex: 3,
        height: 49,
        paddingTop: 5,
        backgroundColor: '#fff',
        paddingLeft: SIDEINTERVAL,
      },
      operateGroupLeftOldPrice: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: '#999',
        fontSize: 12,
      },
      operateGroupLeftPrice: {
        color: RED_COLOR,
        fontSize: 16,
      },
      operateGroupRight: {
        flex: 2,
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
      productDetailComment: {
        positoin: 'absolute',
        zIndex: 199,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    };

    return (
      <div style={styles.container} className={stylesLess.container}>
        {/* <BYHeader
          title={formatMessage({ id: 'details' })}
          headerRight={this.renderHeaderRight()}
        /> */}
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
            onClick={() =>
              Modal.operation([
                {
                  text: authUser
                    ? formatMessage({ id: 'me' })
                    : formatMessage({ id: 'login' }),
                  onPress: () =>
                    authUser ? router.push(`/Me`) : router.push('/Login'),
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
                    authUser
                      ? router.push(`/MyCollection`)
                      : router.push('/Login'),
                },
              ])
            }
          >
            <CustomIcon type="gengduo" style={styles.backIcon} />
          </div>
        </div>
        {isShowProductDetailComment && (
          <div style={styles.productDetailComment}>
            <ProductDetailComment />
          </div>
        )}

        <div style={styles.main}>
          <ProductDetailMain query={query} pathname={pathname} />
        </div>
        <div style={styles.operate}>
          <div style={styles.operateIcon}>
            {/* <div
              style={styles.operateIconItem}
              onClick={() => this.handleToggleShare()}
            >
              <CustomIcon
                type="share"
                style={{
                  ...styles.operateIconItemIcon,
                  ...styles.operateIconItemActive,
                }}
              />
              <div
                style={{
                  ...styles.operateIconItemText,
                  ...styles.operateIconItemActive,
                }}
              >
                {formatMessage({ id: 'share' })}
              </div>
            </div> */}
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
      </div>
    );
  }
}

export default Index;

import React from 'react';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import router from 'umi/router';

import CustomIcon from '@/components/CustomIcon';
// import BYHeader from '@/components/BYHeader';
import {
  SIDEINTERVAL,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  SCREENS,
} from '@/common/constants';
import {
  BORDER_COLOR,
  PRIMARY_COLOR,
  RED_COLOR,
  FONT_COLOR_FIFTH,
} from '@/styles/variables';
import ProductDetailMain from './ProductDetailMain';

import * as collectionActionCreators from '@/common/actions/collection';
import ProductDetailComment from './ProductDetailComment';
import { addEventListener, removeEventListener } from '@/utils';
import { getIsCollection } from '@/common/selectors';

@connect(
  (state, props) => {
    const { login, productDetailInfo } = state;
    const {
      location: { query = {} },
    } = props;

    return {
      ...productDetailInfo.item,
      query,
      isAuthUser: !!login.user,
      isCollection: getIsCollection(state, props),
    };
  },
  {
    ...collectionActionCreators,
  },
)
class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowProductDetailComment: false,
    };
  }

  componentDidMount() {
    const { isAuthUser, collectionFetch } = this.props;

    if (isAuthUser) {
      collectionFetch();
    }
    addEventListener(SCREENS.ProductDetail, this.addEventListenerHandle);
  }

  componentWillUnmount() {
    removeEventListener(SCREENS.ProductDetail, this.addEventListenerHandle);
  }

  addEventListenerHandle = () => {
    const { isShowProductDetailComment } = this.state;
    this.setState({
      isShowProductDetailComment: !isShowProductDetailComment,
    });
  };

  handleOnPressAddCart = () => {
    const { id, name, isAuthUser, cartAddRequest } = this.props;
    if (!isAuthUser) return router.push('/Login');

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
    const { numbers, isAuthUser } = this.props;
    if (!isAuthUser) return router.push('/Login');
    if (!(numbers > 0)) return false;
    return router.push(`/OrderWrite?groupon=false`);
    // return navigate(SCREENS.OrderWrite, {
    //   groupon,
    // });
  }

  handleToggleService() {
    const { isAuthUser, funid, brandId, typeId, name } = this.props;
    let linkStr = 'http://m.me/buyooshop.vip?ref=';
    let funIdStr = '';
    let typeID = 0;
    if (undefined !== typeId) {
      typeID = typeId;
    }
    if (isAuthUser) {
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
      isAuthUser,
      brandId,
    } = this.props;
    if (!isAuthUser) return router.push(`/login`);
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
    const { numbers, isCollection, query } = this.props;

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
        paddingTop: 5,
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
      back: {
        position: 'absolute',
        top: SIDEINTERVAL / 2,
        left: SIDEINTERVAL / 2,
        zIndex: 99,
        backgroundColor: 'rgba(0,0,0,.4)',
        height: '30px',
        width: '30px',
        borderRadius: '15px',
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
      <div style={styles.container}>
        {/* <BYHeader
          title={formatMessage({ id: 'details' })}
          headerRight={this.renderHeaderRight()}
        /> */}
        <div style={styles.back} onClick={() => router.go(-1)}>
          <CustomIcon type="left" style={styles.backIcon} />
        </div>
        {isShowProductDetailComment && (
          <div style={styles.productDetailComment}>
            <ProductDetailComment />
          </div>
        )}

        <div style={styles.main}>
          <ProductDetailMain query={query} />
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

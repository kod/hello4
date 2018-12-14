/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import qs from 'qs';
import router from 'umi/router';

import ModalRoot from '@/containers/ModalRoot';
import * as collectionActionCreators from '@/common/actions/collection';
import * as commentActionCreators from '@/common/actions/comment';
import * as productDetailInfoActionCreators from '@/common/actions/productDetailInfo';
import * as modalActionCreators from '@/common/actions/modal';
import SwiperFlatList from '@/components/SwiperFlatList';
import {
  WINDOW_WIDTH,
  MONETARY,
  SIDEINTERVAL,
  WINDOW_HEIGHT,
  MODAL_TYPES,
  IS_IOS,
  OSS_IMAGE_QUALITY,
  BUYOO,
} from '@/common/constants';
import priceFormat from '@/utils/priceFormat';
import smoothScroll from '@/utils/smoothScroll';
import gumshoe from '@/utils/gumshoe';
import CustomIcon from '@/components/CustomIcon';
import {
  BORDER_COLOR,
  RED_COLOR,
  PRIMARY_COLOR,
  FONT_COLOR_THIRD,
  FONT_COLOR_SECOND,
} from '@/styles/variables';
import Comment from '@/components/Comment';
import SeparateBar from '@/components/SeparateBar';
import {
  addEventListener,
  removeEventListener,
  xOssProcess,
  localStorageGetItem,
  loadFbLoginApi,
} from '@/utils';
import { getIsCollection } from '@/common/selectors';
import { o } from '@/utils/AuthEncrypt';

class ProductDetailMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadFBSDK: false,
    };

    this.addEventListenerHandle = this.addEventListenerHandle.bind(this);
  }

  componentDidMount() {
    const {
      commentFetch,
      productDetailInfoFetch,
      productDetailInfoClear,
      propertiesIds,
      productIdVIP,
      brandId,
    } = this.props;

    productDetailInfoClear(brandId);
    productDetailInfoFetch({
      brandId,
      propertiesIds,
      productIdVIP,
      screen: 'ProductDetailMain',
    });
    commentFetch(brandId);

    addEventListener('ProductDetailMain', this.addEventListenerHandle);

    loadFbLoginApi(() => {
      this.setState({
        isLoadFBSDK: true,
      });
    });

    setTimeout(() => {
      smoothScroll.init({
        offset: 20,
      });
      gumshoe.init({
        offset: 21,
        activeClass: 'gumshoeActive',
        selector: '[data-gumshoe] p',
      });
    }, 2000);
  }

  componentWillUnmount() {
    removeEventListener('ProductDetailMain', this.addEventListenerHandle);
    smoothScroll.destroy();
    gumshoe.destroy();
  }

  addEventListenerHandle = ({ detail: { method, params } }) => {
    const { pathname, productIdVIP, brandId } = this.props;
    switch (method) {
      case 'productDetailInfo':
        if (productIdVIP === '') {
          // 设置默认id
          router.replace(
            `${pathname}?${qs.stringify({
              brandId,
              id: params.id,
            })}`,
          );
        }
        break;

      case 'productDetailSelect':
        router.replace(
          `${pathname}?${qs.stringify({
            brandId,
            id: params.id,
          })}`,
        );

        break;

      default:
        break;
    }
  };

  handlePressShare() {
    const { isLoadFBSDK } = this.state;
    const { authUser } = this.props;
    console.log(authUser);
    console.log(isLoadFBSDK);
    if (isLoadFBSDK) {
      console.log(window.location.href);
      console.log('handlePressShare');
      const link = window.location.href;
      if (authUser) {
        console.log(`${link}&uid=${authUser.result}`);
      }
      console.log(link);
      window.FB.ui(
        {
          method: 'share',
          link,
        },
        response => {
          console.log(response);
          console.log('asdf');
        },
      );
    }
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

  renderProduct() {
    const {
      name,
      brandId,
      price,
      imageUrls,
      propertiesIds,
      propertiesIdsObject,
      propertiesObjectForId,
      openModal,
      productDetailNumber,
      numbers,
      isCollection,
    } = this.props;

    const styles = {
      product: {
        // paddingLeft: SIDEINTERVAL,
        backgroundColor: '#fff',
      },
      productTitle: {
        color: '#333',
        fontSize: 14,
        paddingBottom: 10,
      },
      productPrice: {
        fontSize: 18,
        color: RED_COLOR,
        marginBottom: 3,
        paddingTop: 10,
        fontWeight: '700',
      },
      serverinfo: {
        display: 'flex',
        flexDirection: 'row',
        height: 45,
        borderBottomColor: BORDER_COLOR,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
      },
      serverinfoLeft: {
        position: 'relative',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      serverinfoLeftSeparate: {
        position: 'absolute',
        right: 0,
        top: 10,
        bottom: 10,
        width: 1,
        backgroundColor: BORDER_COLOR,
      },
      serverinfoRight: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      serverinfoToBePaid: {
        fontSize: 11,
        color: FONT_COLOR_THIRD,
        // paddingTop: 2,
        marginRight: 5,
      },
      serverinfoToBePaidText: {
        color: FONT_COLOR_THIRD,
        fontSize: 12,
        marginRight: 15,
      },
      serverinfotoReceiveGoods: {
        fontSize: 12,
        color: FONT_COLOR_THIRD,
        // paddingTop: 3,
        marginRight: 5,
      },
      serverinfotoReceiveGoodsText: {
        color: FONT_COLOR_THIRD,
        fontSize: 12,
      },
      spec: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: BORDER_COLOR,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        height: 50,
        paddingLeft: SIDEINTERVAL,
      },
      specTitle: {
        fontSize: 14,
        color: FONT_COLOR_THIRD,
        paddingRight: 15,
      },
      specDesc: {
        fontSize: 14,
        color: FONT_COLOR_SECOND,
        flex: 1,
      },
      specArrow: {
        fontSize: 10,
        color: FONT_COLOR_THIRD,
        paddingRight: SIDEINTERVAL,
      },
      titlePrice: {
        display: 'flex',
        // marginBottom: 8,
        borderBottomColor: BORDER_COLOR,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        paddingLeft: SIDEINTERVAL,
      },
      titlePriceLeft: {
        flex: 3,
      },
      titlePriceRight: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
      },
      favorite: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: WINDOW_WIDTH * 0.03,
      },
      favoriteItem: {
        fontSize: 21,
      },
      favoriteIconActive: {
        color: PRIMARY_COLOR,
      },
      share: {
        borderWidth: 1,
        borderColor: RED_COLOR,
        borderStyle: 'solid',
        borderRadius: 3,
        paddingLeft: WINDOW_WIDTH * 0.025,
        paddingRight: WINDOW_WIDTH * 0.025,
        paddingTop: 8,
        paddingBottom: 8,
        lineHeight: 1,
        color: RED_COLOR,
        fontSize: 14,
      },
      shareIcon: {
        fontSize: 18,
        marginRight: WINDOW_WIDTH * 0.021,
      },
    };

    return (
      <div style={styles.product}>
        <div style={styles.titlePrice}>
          <div style={styles.titlePriceLeft}>
            <div style={styles.productPrice}>
              {`${priceFormat(price || 0)} ${MONETARY}`}
            </div>
            <div style={styles.productTitle}>{name}</div>
          </div>
          <div style={styles.titlePriceRight}>
            <div
              style={styles.favorite}
              onClick={() => this.handleToggleCollection()}
            >
              {isCollection ? (
                <CustomIcon
                  type="heart-fill"
                  style={{
                    ...styles.favoriteItem,
                    ...styles.favoriteIconActive,
                  }}
                />
              ) : (
                <CustomIcon type="heart" style={styles.favoriteItem} />
              )}
            </div>
            <div style={styles.share} onClick={() => this.handlePressShare()}>
              <CustomIcon
                type="ScreenShopping_icon2"
                style={styles.shareIcon}
              />
              {formatMessage({ id: 'share' })}
            </div>
          </div>
        </div>
        <div style={styles.serverinfo}>
          <div style={styles.serverinfoLeft}>
            <div style={styles.serverinfoLeftSeparate} />
            <CustomIcon style={styles.serverinfoToBePaid} type="returns" />
            <div style={styles.serverinfoToBePaidText}>
              {formatMessage({ id: 'qualityAssurance' })}
            </div>
          </div>
          <div style={styles.serverinfoRight}>
            <CustomIcon
              style={styles.serverinfotoReceiveGoods}
              type="toReceiveGoods"
            />
            <div style={styles.serverinfotoReceiveGoodsText}>
              {formatMessage({ id: 'fastDelivery' })}
            </div>
          </div>
        </div>
        <SeparateBar />
        <div style={styles.spec}>
          <div style={styles.specTitle}>
            {formatMessage({ id: 'selected' })}
          </div>
          <div
            style={styles.specDesc}
            onClick={() => {
              openModal(MODAL_TYPES.PARAMSSELECT, {
                productDetailNumber,
                imageUrls,
                price,
                numbers,
                propertiesIdsObject,
                brandId,
                propertiesIds,
              });
            }}
          >
            {propertiesIdsObject
              .split('-')
              .map(val =>
                propertiesObjectForId[val]
                  ? propertiesObjectForId[val].value
                  : '',
              )
              .join('  ')}
          </div>
          <CustomIcon style={styles.specArrow} type="right" />
        </div>
      </div>
    );
  }

  render() {
    const {
      comment,
      brandId,
      imageUrls,
      imageDesc,
      goodsProperties,
    } = this.props;

    const styles = {
      container: {
        position: 'relative',
      },
      statusbarPlaceholder: {
        backgroundColor: '#fff',
      },
      commentMore: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingBottom: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
      },
      commentMoreText: {
        height: 40,
        lineHeight: '40px',
        textAlign: 'center',
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderStyle: 'solid',
        color: FONT_COLOR_THIRD,
      },
      productImageItem: {
        width: WINDOW_WIDTH,
        height: 800,
        resizeMode: 'contain',
      },
      WebView: {
        height: WINDOW_HEIGHT,
      },
      imagesDescItem: {
        width: WINDOW_WIDTH,
      },
      carousel: {
        height: WINDOW_WIDTH,
        width: WINDOW_WIDTH,
      },
      subTitle: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: BORDER_COLOR,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
      },
    };

    return (
      <div style={styles.container}>
        <ModalRoot />
        <div id="navproduct" />

        <div style={styles.statusbarPlaceholder}>
          <div style={styles.carousel}>
            {imageUrls && imageUrls.length > 0 && (
              <SwiperFlatList
                data={imageUrls}
                styleImg={{
                  display: 'block',
                  width: WINDOW_WIDTH,
                  minHeight: WINDOW_WIDTH,
                }}
              />
            )}
          </div>
          {this.renderProduct()}
          {comment.length ? (
            <>
              <SeparateBar />
              <div id="navcomment" style={styles.subTitle}>
                {formatMessage({ id: 'evaluation' })}
              </div>
              <Comment data={comment} />
              <div style={styles.commentMore}>
                <div
                  style={styles.commentMoreText}
                  onClick={() =>
                    router.push(
                      `/Comment?${qs.stringify({
                        brandId,
                      })}`,
                    )
                  }
                >
                  {formatMessage({ id: 'more' })}
                </div>
              </div>
            </>
          ) : (
            <div id="navcomment" />
          )}
          <SeparateBar />
          <div id="productDescription" style={styles.subTitle}>
            {formatMessage({ id: 'productDescription' })}
          </div>
          <div style={styles.imagesDesc}>
            {imageDesc.map((val, key) => (
              <img
                alt=""
                key={key}
                style={styles.imagesDescItem}
                src={`${val}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
                // src={`${val}?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}`}
              />
            ))}
          </div>
          <SeparateBar />
          {!!goodsProperties && goodsProperties.length > 0 ? (
            <>
              <div id="navparameters" style={styles.subTitle}>
                {formatMessage({ id: 'detailsInfo' })}
              </div>

              <div style={styles.imagesDesc}>
                {goodsProperties.map((val, key) => (
                  <img
                    alt=""
                    key={key}
                    style={styles.imagesDescItem}
                    src={`${val}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
                    // src={`${val}?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div id="navparameters" />
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    const { productDetailInfo, comment } = state;

    const {
      query: { brandId, propertiesIds = '', id = '' },
      pathname,
    } = props;

    return {
      ...productDetailInfo.item,
      loaded: productDetailInfo.loaded,
      isTrue: productDetailInfo.isTrue,
      msg: productDetailInfo.msg,
      brandId,
      propertiesIds,
      productIdVIP: id,
      comment: comment.items.detail ? comment.items.detail.slice(0, 1) : [],
      pathname,
      isCollection: getIsCollection(state, props),
      authUser: o(localStorageGetItem, BUYOO),
    };
  },
  {
    ...commentActionCreators,
    ...productDetailInfoActionCreators,
    ...modalActionCreators,
    ...collectionActionCreators,
  },
)(ProductDetailMain);

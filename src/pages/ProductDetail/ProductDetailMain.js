/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { i18n, View } from '@src/API';
import qs from 'qs';
import router from 'umi/lib/router';
import { Modal } from 'antd-mobile';

import ModalRoot from '@src/containers/ModalRoot';
import * as collectionActionCreators from '@src/common/actions/collection';
import * as commentActionCreators from '@src/common/actions/comment';
import * as productDetailInfoActionCreators from '@src/common/actions/productDetailInfo';
import * as modalActionCreators from '@src/common/actions/modal';
import SwiperFlatList from '@src/components/SwiperFlatList';
import {
  WINDOW_WIDTH,
  MONETARY,
  SIDEINTERVAL,
  MODAL_TYPES,
  IS_IOS,
  OSS_IMAGE_QUALITY,
  FACEBOOK,
  FB_APPID,
  DOMAIN,
  API_DEBUG,
  FB_APPID_TEST,
  SCREENS,
} from '@src/common/constants';
import priceFormat from '@src/utils/priceFormat';
import smoothScroll from '@src/utils/smoothScroll';
import gumshoe from '@src/utils/gumshoe';
import CustomIcon from '@src/components/CustomIcon';
import Comment from '@src/components/Comment';
import SeparateBar from '@src/components/SeparateBar';
import {
  addEventListenerBuyoo,
  removeEventListenerBuyoo,
  xOssProcess,
  loadFbLoginApi,
} from '@src/utils';
import { getIsCollection, getLoginUser } from '@src/common/selectors';
import classNames from 'classnames';

import styles from './ProductDetailMain.less';

class ProductDetailMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadFBSDK: false,
    };

    this.addEventListenerHandle = this.addEventListenerHandle.bind(this);
    this.shareEventListenerHandle = this.shareEventListenerHandle.bind(this);
  }

  componentDidMount() {
    const {
      commentFetch,
      productDetailInfoFetch,
      productDetailInfoClear,
      propertiesIds,
      productIdVIP,
      brandId,
      // openModal,
    } = this.props;

    // setTimeout(() => {
    //   openModal(MODAL_TYPES.SHARE);
    // }, 1);

    productDetailInfoClear(brandId);
    productDetailInfoFetch({
      brandId,
      propertiesIds,
      productIdVIP,
      screen: 'ProductDetailMain',
    });
    commentFetch(brandId);

    addEventListenerBuyoo('ProductDetailMain', this.addEventListenerHandle);
    addEventListenerBuyoo(
      'ProductDetailMainShare',
      this.shareEventListenerHandle,
    );

    loadFbLoginApi(() => {
      this.setState({
        isLoadFBSDK: true,
      });
    });

    if (window.FB) {
      this.setState({
        isLoadFBSDK: true,
      });
    } else {
      setTimeout(() => {
        this.setState({
          isLoadFBSDK: true,
        });
      }, 3 * 1000);
    }

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
    removeEventListenerBuyoo('ProductDetailMain', this.addEventListenerHandle);
    removeEventListenerBuyoo(
      'ProductDetailMainShare',
      this.shareEventListenerHandle,
    );
    smoothScroll.destroy();
    gumshoe.destroy();
  }

  addEventListenerHandle = ({ detail: { method, params } }) => {
    const {
      pathname,
      productIdVIP,
      brandId,
      voucherId,
      inviteID,
      openModal,
    } = this.props;
    switch (method) {
      case 'productDetailInfo':
        console.log(voucherId);

        console.log(inviteID);
        if (inviteID && voucherId) {
          setTimeout(() => {
            openModal(MODAL_TYPES.GIFT, {
              voucherId,
            });
          }, 700);
        }
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

  shareEventListenerHandle = ({ detail: ret }) => {
    const { authUser } = this.props;
    const { type } = ret;
    const { pathname, search } = window.location;
    let link = `${DOMAIN}${pathname}${search}`;

    console.log(ret);

    const shareAction = () => {
      if (authUser) {
        link = `${link}&inviteID=${authUser.result}`;
      }
      console.log(link);

      if (type === FACEBOOK) {
        this.handleFBShare(link);
      } else {
        this.handleMessengerShare(link);
      }
    };

    if (authUser) {
      shareAction();
    } else {
      Modal.alert('', i18n.loginShareReceiveBonus, [
        {
          text: i18n.share,
          onPress: () => {
            shareAction();
          },
        },
        {
          text: i18n.login,
          style: 'default',
          onPress: () => {
            router.push(`/${SCREENS.Login}`);
          },
        },
      ]);
    }
  };

  handleMessengerShare = link => {
    console.log(link);
    window.open(
      `fb-messenger://share?link=${encodeURIComponent(
        link,
      )}&app_id=${encodeURIComponent(API_DEBUG ? FB_APPID_TEST : FB_APPID)}`,
    );
  };

  handlePressShare() {
    const { openModal, iconUrl, name, price, rewardNumber } = this.props;
    openModal(MODAL_TYPES.SHARE, {
      callback: 'ProductDetailMainShare',
      params: {
        iconUrl,
        name,
        price,
        rewardNumber,
      },
    });
  }

  handleFBShare(link) {
    const { isLoadFBSDK } = this.state;

    console.log(isLoadFBSDK);
    if (isLoadFBSDK) {
      window.FB.ui(
        {
          display: 'popup',
          method: 'share_open_graph',
          action_type: 'og.likes',
          action_properties: JSON.stringify({
            object: link,
          }),
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

    return (
      <View className={styles.product}>
        <View
          style={{
            paddingLeft: SIDEINTERVAL,
          }}
          className={styles.titlePrice}
        >
          <View className={styles.titlePriceLeft}>
            <View className={styles.productPrice}>
              {`${priceFormat(price || 0)} ${MONETARY}`}
            </View>
            <View className={styles.productTitle}>{name}</View>
          </View>
          <View className={styles.titlePriceRight}>
            <View
              style={{
                paddingRight: WINDOW_WIDTH * 0.03,
              }}
              className={styles.favorite}
              onClick={() => this.handleToggleCollection()}
            >
              {isCollection ? (
                <CustomIcon
                  name="heart-fill"
                  type="heart-fill"
                  className={classNames(
                    styles.favoriteItem,
                    styles.favoriteIconActive,
                  )}
                />
              ) : (
                <CustomIcon
                  name="heart"
                  type="heart"
                  className={styles.favoriteItem}
                />
              )}
            </View>
            <View
              style={{
                paddingLeft: WINDOW_WIDTH * 0.025,
                paddingRight: WINDOW_WIDTH * 0.025,
              }}
              className={styles.share}
              onClick={() => this.handlePressShare()}
            >
              <CustomIcon
                name="ScreenShopping_icon2"
                type="ScreenShopping_icon2"
                style={{
                  marginRight: WINDOW_WIDTH * 0.021,
                }}
                className={styles.shareIcon}
              />
              {i18n.share}
            </View>
          </View>
        </View>
        <View className={styles.serverinfo}>
          <View className={styles.serverinfoLeft}>
            <View className={styles.serverinfoLeftSeparate} />
            <CustomIcon
              name="returns"
              type="returns"
              className={styles.serverinfoToBePaid}
            />
            <View className={styles.serverinfoToBePaidText}>
              {i18n.qualityAssurance}
            </View>
          </View>
          <View className={styles.serverinfoRight}>
            <CustomIcon
              name="toReceiveGoods"
              type="toReceiveGoods"
              className={styles.serverinfotoReceiveGoods}
            />
            <View className={styles.serverinfotoReceiveGoodsText}>
              {i18n.fastDelivery}
            </View>
          </View>
        </View>
        <SeparateBar />
        <View
          style={{
            paddingLeft: SIDEINTERVAL,
          }}
          className={styles.spec}
        >
          <View className={styles.specTitle}>{i18n.selected}</View>
          <View
            className={styles.specDesc}
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
          </View>
          <CustomIcon
            name="right"
            type="right"
            style={{
              paddingRight: SIDEINTERVAL,
            }}
            className={styles.specArrow}
          />
        </View>
      </View>
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

    return (
      <View className={styles.container}>
        <ModalRoot />
        <View id="navproduct" />

        <View className={styles.statusbarPlaceholder}>
          <View
            style={{
              height: WINDOW_WIDTH,
              width: WINDOW_WIDTH,
            }}
          >
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
          </View>
          {this.renderProduct()}
          {comment.length ? (
            <>
              <SeparateBar />
              <View
                id="navcomment"
                style={{
                  paddingLeft: SIDEINTERVAL,
                  paddingRight: SIDEINTERVAL,
                }}
                className={styles.subTitle}
              >
                {i18n.evaluation}
              </View>
              <Comment data={comment} />
              <View
                style={{
                  paddingLeft: SIDEINTERVAL,
                  paddingRight: SIDEINTERVAL,
                }}
                className={styles.commentMore}
              >
                <View
                  className={styles.commentMoreText}
                  onClick={() =>
                    router.push(
                      `/Comment?${qs.stringify({
                        brandId,
                      })}`,
                    )
                  }
                >
                  {i18n.more}
                </View>
              </View>
            </>
          ) : (
            <View id="navcomment" />
          )}
          <SeparateBar />
          <View id="productDescription" className={styles.subTitle}>
            {i18n.productDescription}
          </View>
          <View>
            {imageDesc.map((val, key) => (
              <img
                alt=""
                key={key}
                style={{
                  width: WINDOW_WIDTH,
                }}
                src={`${val}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
                // src={`${val}?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}`}
              />
            ))}
          </View>
          <SeparateBar />
          {!!goodsProperties && goodsProperties.length > 0 ? (
            <>
              <View id="navparameters" className={styles.subTitle}>
                {i18n.detailsInfo}
              </View>

              <View>
                {goodsProperties.map((val, key) => (
                  <img
                    alt=""
                    key={key}
                    src={`${val}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
                    // src={`${val}?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}`}
                  />
                ))}
              </View>
            </>
          ) : (
            <View id="navparameters" />
          )}
        </View>
      </View>
    );
  }
}

export default connect(
  (state, props) => {
    const { productDetailInfo, comment } = state;

    const {
      query: { brandId, propertiesIds = '', id = '', inviteID = '' },
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
      inviteID,
      comment: comment.items.detail ? comment.items.detail.slice(0, 1) : [],
      pathname,
      isCollection: getIsCollection(state, props),
      authUser: getLoginUser(state, props),
    };
  },
  {
    ...commentActionCreators,
    ...productDetailInfoActionCreators,
    ...modalActionCreators,
    ...collectionActionCreators,
  },
)(ProductDetailMain);

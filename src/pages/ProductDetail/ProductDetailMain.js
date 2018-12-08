/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import qs from 'qs';
import router from 'umi/router';

import ModalRoot from '@/containers/ModalRoot';
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
} from '@/common/constants';
import priceFormat from '@/utils/priceFormat';
import smoothScroll from '@/utils/smoothScroll';
import gumshoe from '@/utils/gumshoe';
import CustomIcon from '@/components/CustomIcon';
import { BORDER_COLOR, RED_COLOR } from '@/styles/variables';
import Comment from '@/components/Comment';
import SeparateBar from '@/components/SeparateBar';
import { addEventListener, removeEventListener, xOssProcess } from '@/utils';

class ProductDetailMain extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    const {
      name,
      comment,
      brandId,
      price,
      imageUrls,
      imageDesc,
      goodsProperties,
      propertiesIds,
      propertiesIdsObject,
      propertiesObjectForId,
      openModal,
      productDetailNumber,
      numbers,
    } = this.props;

    const styles = {
      container: {
        position: 'relative',
      },
      statusbarPlaceholder: {
        backgroundColor: '#fff',
      },
      product: {
        paddingLeft: SIDEINTERVAL,
        backgroundColor: '#fff',
      },
      productTitle: {
        color: '#333',
        fontSize: 14,
        marginBottom: 3,
        paddingTop: 10,
      },
      productPrice: {
        fontSize: 18,
        color: RED_COLOR,
        fontWeight: '700',
        paddingBottom: 10,
        marginBottom: 8,
        borderBottomColor: BORDER_COLOR,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
      },
      serverinfo: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: BORDER_COLOR,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        paddingBottom: 8,
      },
      serverinfoToBePaid: {
        fontSize: 11,
        color: '#ccc',
        paddingTop: 2,
        marginRight: 5,
      },
      serverinfoToBePaidText: {
        color: '#ccc',
        fontSize: 12,
        marginRight: 15,
      },
      serverinfotoReceiveGoods: {
        fontSize: 12,
        color: '#ccc',
        paddingTop: 3,
        marginRight: 5,
      },
      serverinfotoReceiveGoodsText: {
        color: '#ccc',
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
      },
      specTitle: {
        fontSize: 14,
        color: '#999',
        paddingRight: 15,
      },
      specDesc: {
        fontSize: 14,
        color: '#666',
        flex: 1,
      },
      specArrow: {
        fontSize: 10,
        color: '#999',
        paddingRight: SIDEINTERVAL,
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
        color: '#999',
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
          <div style={styles.product}>
            <div style={styles.productTitle}>{name}</div>
            <div style={styles.productPrice}>
              {`${priceFormat(price || 0)} ${MONETARY}`}
            </div>
            <div style={styles.serverinfo}>
              <CustomIcon style={styles.serverinfoToBePaid} type="returns" />
              <div style={styles.serverinfoToBePaidText}>
                {formatMessage({ id: 'qualityAssurance' })}
              </div>
              <CustomIcon
                style={styles.serverinfotoReceiveGoods}
                type="toReceiveGoods"
              />
              <div style={styles.serverinfotoReceiveGoodsText}>
                {formatMessage({ id: 'fastDelivery' })}
              </div>
            </div>
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
          <Comment data={comment} />
          {comment.length ? (
            <>
              <SeparateBar />
              <div id="navcomment" style={styles.subTitle}>
                {formatMessage({ id: 'evaluation' })}
              </div>
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
          <div id="navparameters" style={styles.subTitle}>
            {formatMessage({ id: 'detailsInfo' })}
          </div>
          {!!goodsProperties && goodsProperties.length > 0 && (
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
    };
  },
  {
    ...commentActionCreators,
    ...productDetailInfoActionCreators,
    ...modalActionCreators,
  },
)(ProductDetailMain);

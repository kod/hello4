/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import { BORDER_COLOR, RED_COLOR } from '@/styles/variables';
import { SIDEINTERVAL, OSS_IMAGE_QUALITY, MONETARY } from '@/common/constants';
import priceFormat from '@/utils/priceFormat';

import * as cartActionCreators from '@/common/actions/cart';

const styles = {
  itemWrap: {
    backgroundColor: '#fff',
  },
  item: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    borderBottomColor: BORDER_COLOR,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    zIndex: 100,
  },
  disable: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.1)',
    zIndex: 999,
  },
  itemLeft: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: SIDEINTERVAL,
    paddingTop: 18,
    paddingBottom: 18,
  },
  itemImage: {
    width: 60,
    height: 60,
    // backgroundColor: '#0f0',
    borderColor: BORDER_COLOR,
    borderWidth: 1,
  },
  itemRight: {
    flex: 1,
    paddingTop: 18,
    // paddingBottom: 18,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  itemTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    lineHeight: '18px',
  },
  itemPrice: {
    fontSize: 11,
    color: '#999',
    marginBottom: 6,
  },
  itemRightRow3: {
    display: 'flex',
    flexDirection: 'row',
  },
  itemRightRow3Price: {
    fontSize: 14,
    color: RED_COLOR,
    marginRight: 9,
  },
  itemRightRow3Number: {
    fontSize: 11,
    color: '#666',
    paddingTop: 2,
  },
};

@connect(
  state => {
    const { login } = state;
    return {
      authUser: login.user,
    };
  },
  {
    ...cartActionCreators,
  },
)
class ProductItem2 extends React.Component {
  onPressHandle(val) {
    const {
      // navigation: { navigate, goBack },
      isPress = true,
      onPress,
    } = this.props;
    if (onPress) {
      onPress();
    } else if (val.isOnPress === false) {
      router.go(-1);
      // goBack(null);
    } else if (val.tradeStatus === '32' || val.tradeStatus === '33') {
      // navigate(SCREENS.Prepaid);
    } else if (isPress) {
      router.push(
        `/ProductDetail?brandId=${val.brandId}&groupon=false&propertiesIds=${
          val.propertiesIds
        }`,
      );
      // navigate(SCREENS.ProductDetail, {
      //   brandId: val.brandId,
      //   propertiesIds: val.propertiesIds,
      // });
    }
  }

  render() {
    const {
      i18n,
      data,
      style,
      styleItem,
      styleItemOpacity,
      styleItemLeft,
      stylePricePrice,
      stylePricePeriods,
      itemLeft,
      itemRight,
      cartNumberRequest,
      isShowNumber = false,
      ...restProps
    } = this.props;

    return (
      <div style={{ ...styles.itemWrap, ...style }} {...restProps}>
        {data &&
          data.map((val, key) => (
            <div
              style={{ ...styles.item, ...styleItem }}
              key={key}
              onPress={() => this.onPressHandle(val)}
            >
              <div style={{ ...styles.itemLeft, ...styleItemLeft }}>
                <img
                  alt=""
                  style={styles.itemImage}
                  src={`${
                    val.imageUrl
                  }?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}`}
                />
              </div>
              <div style={styles.itemRight}>
                <div style={styles.itemTitle} numberOfLines={1}>
                  {val.name}
                </div>
                {/* <div style={styles.itemPrice}>
                  {`${priceFormat(val.price)} ${MONETARY}`}
                </div> */}
                <div style={styles.itemRightRow3}>
                  <div
                    style={{ ...styles.itemRightRow3Price, ...stylePricePrice }}
                  >
                    {`${priceFormat(val.price)} ${MONETARY}`}
                  </div>
                  {isShowNumber && (
                    <div style={styles.itemRightRow3Number}>x{val.number}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default ProductItem2;

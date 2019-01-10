/* eslint-disable react/no-array-index-key */
import React from 'react';
import router from 'umi/lib/router';

import { BORDER_COLOR, RED_COLOR } from '@src/styles/variables';
import {
  SIDEINTERVAL,
  MONETARY,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@src/common/constants';
import priceFormat from '@src/utils/priceFormat';

import { xOssProcess } from '@src/utils';
import { View } from '@src/API';

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

    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
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

class ProductItem2 extends React.Component {
  onPressHandle(val) {
    const {
      // navigation: { navigate, goBack },
      isPress = true,
      clickProps,
    } = this.props;
    if (clickProps) {
      clickProps();
    } else if (val.isOnPress === false) {
      router.go(-1);
      // goBack(null);
    } else if (val.tradeStatus === '32' || val.tradeStatus === '33') {
      // navigate(SCREENS.Prepaid);
    } else if (isPress) {
      router.push(`/ProductDetail?brandId=${val.brandId}`);
      // router.push(
      //   `/ProductDetail?brandId=${val.brandId}&groupon=false&propertiesIds=${
      //     val.propertiesIds
      //   }`,
      // );
    }
  }

  render() {
    const {
      data,
      style,
      styleItem,
      styleItemOpacity,
      styleItemLeft,
      stylePricePrice,
      stylePricePeriods,
      itemLeft,
      itemRight,
      isShowNumber = false,
      ...restProps
    } = this.props;

    return (
      <View style={{ ...styles.itemWrap, ...style }} {...restProps}>
        {data &&
          data.map((val, key) => (
            <View
              style={{ ...styles.item, ...styleItem }}
              key={key}
              onClick={() => this.onPressHandle(val)}
            >
              <View style={{ ...styles.itemLeft, ...styleItemLeft }}>
                <img
                  alt=""
                  style={styles.itemImage}
                  src={`${val.imageUrl}?${xOssProcess(
                    IS_IOS,
                    OSS_IMAGE_QUALITY,
                  )}`}
                  // src={`${val.imageUrl}?x-oss-process=image/resize,w_240,h_240`}
                />
              </View>
              <View style={styles.itemRight}>
                <View style={styles.itemTitle}>{val.name}</View>
                {/* <View style={styles.itemPrice}>
                  {`${priceFormat(val.price)} ${MONETARY}`}
                </View> */}
                <View style={styles.itemRightRow3}>
                  <View
                    style={{ ...styles.itemRightRow3Price, ...stylePricePrice }}
                  >
                    {`${priceFormat(val.price)} ${MONETARY}`}
                  </View>
                  {isShowNumber && (
                    <View style={styles.itemRightRow3Number}>
                      x{val.number}
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}
      </View>
    );
  }
}

export default ProductItem2;

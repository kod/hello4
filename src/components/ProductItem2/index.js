/* eslint-disable react/no-array-index-key */
import React from 'react';
import router from 'umi/lib/router';

import {
  SIDEINTERVAL,
  MONETARY,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@src/common/constants';
import priceFormat from '@src/utils/priceFormat';

import { xOssProcess } from '@src/utils';
import { View } from '@src/API';

import styles from './index.less';

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
      <View style={style} className={styles.itemWrap} {...restProps}>
        {data &&
          data.map((val, key) => (
            <View
              style={styleItem}
              className={styles.item}
              key={key}
              onClick={() => this.onPressHandle(val)}
            >
              <View
                style={{ paddingLeft: SIDEINTERVAL, ...styleItemLeft }}
                className={styles.itemLeft}
              >
                <img
                  alt=""
                  className={styles.itemImage}
                  src={`${val.imageUrl}?${xOssProcess(
                    IS_IOS,
                    OSS_IMAGE_QUALITY,
                  )}`}
                  // src={`${val.imageUrl}?x-oss-process=image/resize,w_240,h_240`}
                />
              </View>
              <View
                style={{
                  paddingLeft: SIDEINTERVAL,
                  paddingRight: SIDEINTERVAL,
                }}
                className={styles.itemRight}
              >
                <View className={styles.itemTitle}>{val.name}</View>
                {/* <View className={styles.itemPrice}>
                  {`${priceFormat(val.price)} ${MONETARY}`}
                </View> */}
                <View className={styles.itemRightRow3}>
                  <View
                    style={stylePricePrice}
                    className={styles.itemRightRow3Price}
                  >
                    {`${priceFormat(val.price)} ${MONETARY}`}
                  </View>
                  {isShowNumber && (
                    <View className={styles.itemRightRow3Number}>
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

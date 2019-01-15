/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  SIDEINTERVAL,
  WINDOW_WIDTH,
  MONETARY,
  IS_IOS,
  OSS_IMAGE_QUALITY,
  // OSS_IMAGE_QUALITY,
} from '@src/common/constants';
import priceFormat from '@src/utils/priceFormat';
import router from 'umi/lib/router';
import { xOssProcess } from '@src/utils';
import { View } from '@src/API';

import styles from './index.less';

const itemIntervalWidth = SIDEINTERVAL;
const itemWidth = parseInt(
  (WINDOW_WIDTH - itemIntervalWidth * 4) / 3 - WINDOW_WIDTH * 0.03,
  10,
);

export default ({ data, style, ...restProps }) => (
  <View
    // horizontal
    // showsHorizontalScrollIndicator={false}
    style={{ paddingLeft: SIDEINTERVAL, ...style }}
    className={styles.itemWrap}
    {...restProps}
  >
    <View
      style={{
        width: `${105 * data.length}px`,
      }}
      className={styles.itemMain}
    >
      {data.map((val, key) => (
        <View
          style={{
            width: itemWidth,
            marginRight: SIDEINTERVAL,
            marginBottom: itemIntervalWidth,
          }}
          className={styles.item}
          key={key}
          onClick={() => {
            router.push(`/ProductDetail?brandId=${val.brandId}`);
          }}
        >
          <img
            alt=""
            style={{
              width: itemWidth,
              height: itemWidth,
            }}
            className={styles.itemImg}
            src={`${val.imageUrl}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
          />

          <View className={styles.itemText}>{val.name}</View>
          <View className={styles.itemPrice}>
            {`${priceFormat(val.price)} ${MONETARY}`}
          </View>
        </View>
      ))}
    </View>
  </View>
);

/* eslint-disable react/no-array-index-key */
import React from 'react';
import router from 'umi/lib/router';

import {
  SIDEINTERVAL,
  // OSS_IMAGE_QUALITY,
  MONETARY,
  WINDOW_WIDTH,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@src/common/constants';
import priceFormat from '@src/utils/priceFormat';
import { xOssProcess, analyzeUrlNavigate } from '@src/utils';
import { View } from '@src/API';

import styles from './index.less';

const itemIntervalWidth = SIDEINTERVAL;
const itemWidth = (WINDOW_WIDTH - itemIntervalWidth * 4) / 3;

export default ({ data, style, ...restProps }) => (
  <View
    style={{ paddingLeft: SIDEINTERVAL, ...style }}
    className={styles.itemWrap}
    {...restProps}
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
          if (val.brandId) {
            router.push(`/ProductDetail?brandId=${val.brandId}`);
          } else if (val.actionUrl) {
            analyzeUrlNavigate({ linkUrl: val.actionUrl });
          }
        }}
      >
        <img
          alt=""
          style={{ ...styles.itemImg }}
          src={`${val.imageUrl}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
        />
        <View className={styles.itemText}>{val.name}</View>
        <View className={styles.itemPrice}>
          {`${priceFormat(val.price)} ${MONETARY}`}
        </View>
      </View>
    ))}
  </View>
);

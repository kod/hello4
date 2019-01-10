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
import { RED_COLOR } from '@src/styles/variables';
import priceFormat from '@src/utils/priceFormat';
import router from 'umi/lib/router';
import { xOssProcess } from '@src/utils';
import { View } from '@src/API';

const itemIntervalWidth = SIDEINTERVAL;
const itemWidth = parseInt(
  (WINDOW_WIDTH - itemIntervalWidth * 4) / 3 - WINDOW_WIDTH * 0.03,
  10,
);

const styles = {
  itemWrap: {
    overflowX: 'auto',
    height: 'auto',
    paddingLeft: SIDEINTERVAL,
    marginBottom: 5,
  },
  itemMain: {
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    width: itemWidth,
    marginRight: SIDEINTERVAL,
    paddingTop: 4,
    backgroundColor: '#fff',
    // borderColor: BORDER_COLOR,
    // borderWidth: 1,
    marginBottom: itemIntervalWidth,
  },
  itemImg: {
    width: itemWidth,
    height: itemWidth,
    marginBottom: 5,
  },
  itemText: {
    color: '#666',
    fontSize: 10,
    lineHeight: `${10 * 1.5}px`,
    marginBottom: 3,
  },
  itemOrgPrice: {
    color: '#999',
    fontSize: 11,
    // paddingLeft: paddingInerval,
    // paddingRight: paddingInerval,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  itemPrice: {
    color: RED_COLOR,
    fontSize: 10,
    // paddingLeft: paddingInerval,
    // paddingRight: paddingInerval,
    fontWeight: '700',
    // marginBottom: 15,
  },
};

export default ({ data, style, ...restProps }) => (
  <View
    // horizontal
    // showsHorizontalScrollIndicator={false}
    style={{ ...styles.itemWrap, ...style }}
    {...restProps}
  >
    <View
      style={{
        ...styles.itemMain,
        width: `${105 * data.length}px`,
      }}
    >
      {data.map((val, key) => (
        <View
          style={styles.item}
          key={key}
          onClick={() => {
            router.push(`/ProductDetail?brandId=${val.brandId}`);
          }}
        >
          <img
            alt=""
            style={styles.itemImg}
            src={`${val.imageUrl}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
          />

          <View style={styles.itemText}>{val.name}</View>
          <View style={styles.itemPrice}>
            {`${priceFormat(val.price)} ${MONETARY}`}
          </View>
        </View>
      ))}
    </View>
  </View>
);

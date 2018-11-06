/* eslint-disable react/no-array-index-key */
import React from 'react';

import {
  SIDEINTERVAL,
  OSS_IMAGE_QUALITY,
  MONETARY,
  WINDOW_WIDTH,
} from '@/common/constants';
import priceFormat from '@/utils/priceFormat';
import { RED_COLOR } from '@/styles/variables';

const itemIntervalWidth = SIDEINTERVAL;
const itemWidth = (WINDOW_WIDTH - itemIntervalWidth * 4) / 3;

const styles = {
  itemWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: SIDEINTERVAL,
    marginBottom: 5,
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
    width: itemWidth - 2,
    height: itemWidth - 2,
    marginBottom: 5,
  },
  itemText: {
    // paddingLeft: paddingInerval,
    // paddingRight: paddingInerval,
    color: '#666',
    fontSize: 10,
    lineHeight: `${10 * 1.5}px`,
    // height: 30,
    marginBottom: 3,
    // backgroundColor: '#f00',
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
    marginBottom: 15,
  },
};

export default ({ groupon = false, data, style, ...restProps }) => (
  <div style={{ ...styles.itemWrap, ...style }} {...restProps}>
    {data.map((val, key) => (
      <div
        style={styles.item}
        key={key}
        onClick={() => {
          console.log(groupon);
          // navigate(SCREENS.ProductDetail, { brandId: val.brandId, groupon })
        }}
      >
        <img
          alt=""
          style={{ ...styles.itemImg }}
          src={`${
            val.imageUrl
          }?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}`}
        />
        <div numberOfLines={2} style={styles.itemText}>
          {val.name}
        </div>
        <div style={styles.itemPrice}>
          {`${priceFormat(val.price)} ${MONETARY}`}
        </div>
      </div>
    ))}
  </div>
);

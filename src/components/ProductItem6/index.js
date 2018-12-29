/* eslint-disable react/no-array-index-key */
import React from 'react';
import { WINDOW_WIDTH, IS_IOS, OSS_IMAGE_QUALITY } from '@src/common/constants';
import ProductItem4 from '@src/components/ProductItem4';
import SeparateBar from '@src/components/SeparateBar';
import { xOssProcess, analyzeUrlNavigate } from '@src/utils';

const styles = {
  itemWrap: {},
  itemMain: {},
  item: {},
  itemImg: {
    width: WINDOW_WIDTH,
  },
};

export default ({ data, style, ...restProps }) => (
  <div style={{ ...styles.itemWrap, ...style }} {...restProps}>
    <div
      style={{
        ...styles.itemMain,
      }}
    >
      {data.map((val, key) => (
        <div style={styles.item} key={key}>
          <img
            alt=""
            style={styles.itemImg}
            onClick={() => {
              if (val.top.actionUrl) {
                analyzeUrlNavigate({ linkUrl: val.top.actionUrl });
              }
            }}
            src={`${val.top.imageUrl}?${xOssProcess(
              IS_IOS,
              OSS_IMAGE_QUALITY,
            )}`}
          />
          <ProductItem4 data={val.bottom} />
          <SeparateBar />
        </div>
      ))}
    </div>
  </div>
);

/* eslint-disable react/no-array-index-key */
import React from 'react';
import { WINDOW_WIDTH, IS_IOS, OSS_IMAGE_QUALITY } from '@src/common/constants';
import ProductItem4 from '@src/components/ProductItem4';
import SeparateBar from '@src/components/SeparateBar';
import { xOssProcess, analyzeUrlNavigate } from '@src/utils';
import { View } from '@src/API';

export default ({ data, style, ...restProps }) => (
  <View style={style} {...restProps}>
    <View>
      {data.map((val, key) => (
        <View key={key}>
          <img
            alt=""
            style={{
              width: WINDOW_WIDTH,
            }}
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
        </View>
      ))}
    </View>
  </View>
);

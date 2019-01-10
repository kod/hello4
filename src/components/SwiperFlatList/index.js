import React, { PureComponent } from 'react';
import { Carousel } from 'antd-mobile';

import { OSS_IMAGE_QUALITY, IS_IOS } from '@src/common/constants';
import { xOssProcess, analyzeUrlNavigate } from '@src/utils';
import { View } from '@src/API';
import styles from './index.less';

export default class SwiperFlatList extends PureComponent {
  render() {
    const { data, styleA, styleImg } = this.props;

    return (
      <Carousel autoplay infinite>
        {data.map(val => (
          <View
            key={val.id}
            // href={val.actionUrl}
            className={styles.a}
            style={styleA}
            onClick={() => {
              analyzeUrlNavigate({ linkUrl: val.actionUrl });
            }}
          >
            <img
              src={`${val.imageUrl}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
              alt=""
              className={styles.img}
              style={styleImg}
            />
          </View>
        ))}
      </Carousel>
    );
  }
}

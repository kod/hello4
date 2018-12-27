import React, { PureComponent } from 'react';
import { Carousel } from 'antd-mobile';

import styles from './index.less';
import { OSS_IMAGE_QUALITY, IS_IOS } from '@/common/constants';
import { xOssProcess, analyzeUrlNavigate } from '@/utils';

export default class SwiperFlatList extends PureComponent {
  render() {
    const { data, styleA, styleImg } = this.props;

    return (
      <Carousel autoplay infinite>
        {data.map(val => (
          <div
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
          </div>
        ))}
      </Carousel>
    );
  }
}

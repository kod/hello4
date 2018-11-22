import React, { PureComponent } from 'react';
import { Carousel } from 'antd-mobile';

import styles from './index.less';

export default class SwiperFlatList extends PureComponent {
  render() {
    const { data, styleA, styleImg } = this.props;

    return (
      <Carousel
        autoplay
        // autoplayInterval={}
        infinite
        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        // afterChange={index => console.log('slide to', index)}
        // {...restProps}
      >
        {data.map(val => (
          <a
            key={val.id}
            href={val.actionUrl}
            className={styles.a}
            style={styleA}
          >
            <img
              src={`${val.imageUrl}?x-oss-process=image/format,webp`}
              alt=""
              className={styles.img}
              style={styleImg}
              // onLoad={() => {
              //   // fire window resize event to change height
              //   // window.dispatchEvent(new Event('resize'));
              //   // this.setState({ imgHeight: 'auto' });
              // }}
            />
          </a>
        ))}
      </Carousel>
    );
  }
}

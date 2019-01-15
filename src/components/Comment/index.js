/* eslint-disable react/no-array-index-key */
import React from 'react';
import dayjs from 'dayjs';
import {
  SIDEINTERVAL,
  WINDOW_WIDTH,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@src/common/constants';
import CustomIcon from '@src/components/CustomIcon';
import { xOssProcess } from '@src/utils';
import { View } from '@src/API';

import classNames from 'classnames';

import styles from './index.less';

const imageItemWidth = (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3;

export default ({ data, styleWrap, style, ...restProps }) => (
  <View style={styleWrap} {...restProps}>
    {data &&
      !!data.length &&
      data.map((val, key) => (
        <View
          style={{
            ...style,
            paddingLeft: SIDEINTERVAL,
          }}
          className={styles.component}
          key={key}
        >
          <View className={styles.componentTitle}>
            <View className={styles.componentAcount}>
              {val.username.slice(0, 4)}
            </View>
            <View className={styles.componentStar}>
              {[0, 1, 2, 3, 4].map(val1 => (
                <CustomIcon
                  name="star-fill"
                  type="star-fill"
                  key={val1}
                  className={classNames({
                    [styles.componentStarIconActive]: val.score > val1,
                    [styles.componentStarIcon]: val.score > val1,
                  })}
                />
                // <FontAwesome
                //   className={
                //     val.score > val1
                //       ? styles.componentStarIconActive
                //       : styles.componentStarIcon
                //   }
                //   name="star"
                //   key={val1}
                // />
              ))}
            </View>
            <View
              style={{
                paddingRight: SIDEINTERVAL,
              }}
              className={styles.componentTime}
            >
              {dayjs(val.updateTime).format('DD/MM/YYYY')}
            </View>
          </View>
          <View
            style={{
              marginBottom: WINDOW_WIDTH * 0.03,
              paddingRight: SIDEINTERVAL,
            }}
            className={styles.componentDesc}
          >
            {val.content}
          </View>
          <View className={styles.componentimageWrap}>
            {val.imageUrls.length > 0 &&
              val.imageUrls.map((val1, key1) => (
                <img
                  alt=""
                  key={key1}
                  style={{
                    width: imageItemWidth,
                    height: imageItemWidth,
                    marginRight: SIDEINTERVAL,
                    marginBottom: SIDEINTERVAL,
                  }}
                  className={styles.componentimageItem}
                  src={`${val1}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
                  // src={`${val1}?x-oss-process=image/resize,w_${parseInt(
                  //   imageItemWidth,
                  //   10,
                  // ) * 2}`}
                />
              ))}
          </View>
        </View>
      ))}
  </View>
);

/* eslint-disable react/no-array-index-key */
import React from 'react';
// import { i18n, View } from '@src/API';
import router from 'umi/lib/router';
import qs from 'qs';

import {
  WINDOW_WIDTH,
  SCREENS,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@src/common/constants';
import { xOssProcess } from '@src/utils';
import { View } from '@src/API';

import styles from './index.less';

const marginWidth = WINDOW_WIDTH * 0.015;
const width = (WINDOW_WIDTH - marginWidth * 2 * 4 - marginWidth * 2) / 4;

class BrandList extends React.Component {
  componentDidMount() {
    console.log('');
  }

  render() {
    const { data, style, ...restProps } = this.props;

    return (
      <View
        className={styles.itemWrap}
        style={{
          paddingLeft: marginWidth,
          paddingRight: marginWidth,

          ...style,
        }}
        {...restProps}
      >
        {data.map((val, key) => (
          <View
            style={{
              height: width,
              width,
              marginLeft: marginWidth,
              marginRight: marginWidth,
            }}
            key={key}
            onClick={() =>
              router.push(
                `/${SCREENS.CateList}?${qs.stringify({
                  parent_id: val.parentId,
                  classfy_id: val.id,
                })}`,
              )
            }
          >
            <img
              alt=""
              style={{
                height: width,
                width,
              }}
              src={`${val.imageUrl}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
            />
          </View>
        ))}
      </View>
    );
  }
}

export default BrandList;

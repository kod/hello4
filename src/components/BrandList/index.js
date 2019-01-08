/* eslint-disable react/no-array-index-key */
import React from 'react';
// import { i18n } from '@src/API';
import router from 'umi/lib/router';
import qs from 'qs';

import {
  WINDOW_WIDTH,
  SCREENS,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@src/common/constants';
import { xOssProcess } from '@src/utils';

const marginWidth = WINDOW_WIDTH * 0.015;
const width = (WINDOW_WIDTH - marginWidth * 2 * 4 - marginWidth * 2) / 4;

const styles = {
  itemWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    paddingLeft: marginWidth,
    paddingRight: marginWidth,
  },
  touchable: {
    height: width,
    width,
    marginLeft: marginWidth,
    marginRight: marginWidth,
  },
  itemImg: {
    height: width,
    width,
  },
};

class BrandList extends React.Component {
  componentDidMount() {
    console.log('');
  }

  render() {
    const { data, style, ...restProps } = this.props;

    return (
      <div style={{ ...styles.itemWrap, ...style }} {...restProps}>
        {data.map((val, key) => (
          <div
            style={styles.touchable}
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
              style={styles.itemImg}
              src={`${val.imageUrl}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default BrandList;

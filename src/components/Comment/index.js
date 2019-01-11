/* eslint-disable react/no-array-index-key */
import React from 'react';
import dayjs from 'dayjs';
import {
  SIDEINTERVAL,
  WINDOW_WIDTH,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@src/common/constants';
import { BORDER_COLOR, PRIMARY_COLOR } from '@src/styles/variables';
import CustomIcon from '@src/components/CustomIcon';
import { xOssProcess } from '@src/utils';
import { View } from '@src/API';

const imageItemWidth = (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3;

const styles = {
  componentWrap: {
    // paddingLeft: SIDEINTERVAL,
    // paddingRight: SIDEINTERVAL
  },
  // component: {
  //   backgroundColor: PRIMARY_COLOR,
  // },
  component: {
    backgroundColor: '#fff',
    paddingLeft: SIDEINTERVAL,
  },
  componentTitle: {
    display: 'flex',
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    marginBottom: 10,
  },
  componentAcount: {
    fontSize: 11,
    color: '#333',
    paddingRight: 15,
  },
  componentStar: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  componentStarIcon: {
    color: '#ccc',
    marginRight: 3,
  },
  componentStarIconActive: {
    color: PRIMARY_COLOR,
    marginRight: 3,
  },
  componentTime: {
    fontSize: 11,
    color: '#CCCCCC',
    paddingRight: SIDEINTERVAL,
  },
  componentDesc: {
    color: '#999',
    fontSize: 14,
    lineHeight: '22.65px',
    marginBottom: WINDOW_WIDTH * 0.03,
    paddingRight: SIDEINTERVAL,

    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  componentimageWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  componentimageItem: {
    width: imageItemWidth,
    height: imageItemWidth,
    marginRight: SIDEINTERVAL,
    marginBottom: SIDEINTERVAL,
    resizeMode: 'cover',
    backgroundSize: 'cover',
  },
};

export default ({ data, styleWrap, style, ...restProps }) => (
  <View style={{ ...styles.componentWrap, ...styleWrap }} {...restProps}>
    {data &&
      !!data.length &&
      data.map((val, key) => (
        <View style={{ ...styles.component, ...style }} key={key}>
          <View style={styles.componentTitle}>
            <View style={styles.componentAcount}>
              {val.username.slice(0, 4)}
            </View>
            <View style={styles.componentStar}>
              {[0, 1, 2, 3, 4].map(val1 => (
                <CustomIcon
                  name="star-fill"
                  type="star-fill"
                  key={val1}
                  style={
                    val.score > val1
                      ? styles.componentStarIconActive
                      : styles.componentStarIcon
                  }
                />
                // <FontAwesome
                //   style={
                //     val.score > val1
                //       ? styles.componentStarIconActive
                //       : styles.componentStarIcon
                //   }
                //   name="star"
                //   key={val1}
                // />
              ))}
            </View>
            <View style={styles.componentTime}>
              {dayjs(val.updateTime).format('DD/MM/YYYY')}
            </View>
          </View>
          <View style={styles.componentDesc}>{val.content}</View>
          <View style={styles.componentimageWrap}>
            {val.imageUrls.length > 0 &&
              val.imageUrls.map((val1, key1) => (
                <img
                  alt=""
                  key={key1}
                  style={styles.componentimageItem}
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

import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';

import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  SCREENS,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@/common/constants';

import * as collectionActionCreators from '@/common/actions/collection';
import Comment from '@/components/Comment';
import BYHeader from '@/components/BYHeader';
import { dispatchEvent, xOssProcess } from '@/utils';

const emptycommentPng =
  'https://oss.buyoo.vn/usercollect/1/20181107170628_nI0.png';

@connect(
  state => {
    const { comment } = state;

    return {
      comment: comment.items.detail ? comment.items.detail : [],
    };
  },
  {
    ...collectionActionCreators,
  },
)
class ProductDetailComment extends React.Component {
  render() {
    const { comment } = this.props;

    const styles = {
      container: {
        position: 'relative',
        height: WINDOW_HEIGHT,
        backgroundColor: '#fff',
      },
      emptyComment: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: WINDOW_WIDTH * 0.3,
      },
      emptyCommentImage: {
        height: 160,
        width: 160,
        marginBottom: WINDOW_WIDTH * 0.06,
      },
      emptyCommentText: {
        fontSize: 11,
        color: '#ccc',
      },
    };

    return (
      <div style={styles.container}>
        <BYHeader
          title={formatMessage({ id: 'evaluation' })}
          onPressBackButton={() => dispatchEvent(SCREENS.ProductDetail)}
        />
        {comment.length !== 0 && (
          <div>
            <Comment data={comment} style={{ paddingTop: 20 }} />
          </div>
        )}
        {comment.length === 0 && (
          <div style={styles.emptyComment}>
            <img
              alt=""
              style={styles.emptyCommentImage}
              src={`${emptycommentPng}?${xOssProcess(
                IS_IOS,
                OSS_IMAGE_QUALITY,
              )}`}
            />
            {/* <Image style={styles.emptyCommentImage} source={emptycommentPng} /> */}
            <div style={styles.emptyCommentText}>
              {formatMessage({ id: 'noCommentYet' })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProductDetailComment;

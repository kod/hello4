import React from 'react';
import { connect } from 'react-redux';
import { formatMessage } from 'umi/locale';

import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@src/common/constants';

import * as commentActionCreators from '@src/common/actions/comment';
import Comment from '@src/components/Comment';
import BYHeader from '@src/components/BYHeader';
import { xOssProcess } from '@src/utils';
import Loader from '@src/components/Loader';

const emptycommentPng =
  'https://oss.buyoo.vn/usercollect/1/20181107170628_nI0.png';

class ProductDetailComment extends React.Component {
  componentDidMount() {
    const { commentFetch, brandId } = this.props;
    if (brandId) commentFetch(brandId);
  }

  render() {
    const { comment, loading } = this.props;

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
        {loading && <Loader />}
        <BYHeader title={formatMessage({ id: 'evaluation' })} />
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

export default connect(
  (state, props) => {
    const { comment } = state;
    const {
      location: {
        query: { brandId = '' },
      },
    } = props;

    return {
      brandId,
      comment: comment.items.detail ? comment.items.detail : [],
      loading: comment.loading,
    };
  },
  {
    ...commentActionCreators,
  },
)(ProductDetailComment);

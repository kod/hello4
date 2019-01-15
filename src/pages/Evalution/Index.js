/* eslint-disable react/no-array-index-key */
/* eslint-disable no-new */
import React from 'react';
import { connect } from 'react-redux';
import Compressor from 'compressorjs';

import BYHeader from '@src/components/BYHeader';
import { TextareaItem, Modal, ImagePicker } from 'antd-mobile';
import { i18n, View } from '@src/API';
import router from 'umi/lib/router';

import Loader from '@src/components/Loader';
import {
  addEventListenerBuyoo,
  removeEventListenerBuyoo,
  submitDuplicateFreeze,
} from '@src/utils';

import * as collectFilesActionCreators from '@src/common/actions/collectFiles';
import * as addEvaluationActionCreators from '@src/common/actions/addEvaluation';
import classNames from 'classnames';
import { SIDEINTERVAL, SCREENS } from '@src/common/constants';

import MustLogin from '@src/components/MustLogin';
import BYButton from '@src/components/BYButton';
import CustomIcon from '@src/components/CustomIcon';
import { getLoginUser } from '@src/common/selectors';

import styles from './index.less';

class Evalution extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      multiple: false,
      starNumber: 5,
      textValue: '',
      submitfreeze: false,
    };
    this.addEventListenerHandle = this.addEventListenerHandle.bind(this);
  }

  componentDidMount() {
    addEventListenerBuyoo(SCREENS.Evalution, this.addEventListenerHandle);

    // this.screenListener = DeviceEventEmitter.addListener(
    //   SCREENS.Evalution,
    //   () => {
    //     Alert.alert('', i18n.success, [
    //       {
    //         text: i18n.confirm,
    //         onPress: () => {
    //           pop(1);
    //         },
    //       },
    //     ]);
    //   },
    // );
  }

  componentWillUnmount() {
    removeEventListenerBuyoo(SCREENS.Evalution, this.addEventListenerHandle);
    clearTimeout(this.setTimeoutId);
  }

  addEventListenerHandle = ({ detail: { method } }) => {
    switch (method) {
      case 'addEvaluation':
        Modal.alert('', i18n.success, [
          {
            text: i18n.confirm,
            style: 'default',
            onPress: () => {
              router.go(-1);
            },
          },
        ]);
        break;

      default:
        break;
    }
  };

  createResizedImageImageResizer = file => {
    const { collectFilesFetch } = this.props;

    new Compressor(file, {
      quality: 0.7,
      maxWidth: 1200,
      maxHeight: 1200,
      success(result) {
        collectFilesFetch({
          fileOrigin: result,
        });
      },
      error(err) {
        Modal.alert('', i18n.failed, [
          {
            text: i18n.confirm,
            style: 'default',
            onPress: () => {},
          },
        ]);

        console.warn(err.message);
      },
    });
  };

  onChange = (files, type) => {
    const { collectFilesRemove } = this.props;

    switch (type) {
      case 'add':
        this.createResizedImageImageResizer(files[files.length - 1].file);
        // collectFilesFetch({
        //   fileOrigin: files[files.length - 1].file,
        // });
        break;

      case 'remove':
        collectFilesRemove(files.map(val => val.url));
        break;

      default:
        break;
    }
  };

  onSegChange = e => {
    const index = e.nativeEvent.selectedSegmentIndex;
    this.setState({
      multiple: index === 1,
    });
  };

  handleOnPressStar(index) {
    this.setState({
      starNumber: index,
    });
  }

  handleOnPressSubmit() {
    const { starNumber, textValue, submitfreeze } = this.state;
    const {
      images,
      addEvaluationFetch,
      tradeNo,
      orderNo,
      brandId,
    } = this.props;

    if (textValue.length === 0) {
      Modal.alert('', i18n.pleaseEnterYourComment, [
        {
          text: i18n.confirm,
          style: 'default',
          onPress: () => {},
        },
      ]);
      return false;
    }

    return submitDuplicateFreeze(submitfreeze, this, () =>
      addEvaluationFetch({
        screen: SCREENS.Evalution,
        trade_no: tradeNo,
        order_no: orderNo,
        comments: JSON.stringify([
          {
            brand_id: brandId,
            image_urls: images.join('|'),
            content: textValue,
            score: starNumber,
          },
        ]),
      }),
    );
  }

  handleOnLongPressImgDel(index) {
    const { collectFilesRemove } = this.props;
    collectFilesRemove(index);
    // this.setState({
    //   images: this.state.images.splice(index, 1),
    // })
  }

  renderContent() {
    const { starNumber, textValue, multiple } = this.state;

    const { images } = this.props;

    return (
      <View className={styles.container}>
        <View
          style={{
            paddingLeft: SIDEINTERVAL,
            paddingRight: SIDEINTERVAL,
          }}
          className={styles.startWrap}
        >
          {[0, 1, 2, 3, 4].map(val => (
            <CustomIcon
              name="star-fill"
              type="star-fill"
              // style={starNumber > val ? styles.starIconActive : styles.starIcon}
              className={classNames({
                [styles.starIcon]: starNumber > val,
                [styles.starIconActive]: starNumber > val,
              })}
              key={val}
              onClick={() => this.handleOnPressStar(val + 1)}
            />
          ))}
        </View>
        <View
          style={{
            paddingLeft: SIDEINTERVAL,
            paddingRight: SIDEINTERVAL,
          }}
          className={styles.mainWrap}
        >
          <View className={styles.main}>
            <TextareaItem
              className={styles.textInput}
              value={textValue}
              placeholder={i18n.pleaseEnterYourComment}
              onChange={val => this.setState({ textValue: val })}
              rows={3}
              count={100}
            />
            <ImagePicker
              files={images.map((val, key) => ({
                url: val,
                id: key,
              }))}
              onChange={this.onChange}
              selectable={images.length < 4}
              multiple={multiple}
            />
          </View>
          <View className={styles.tips}>{i18n.yourCommentAnonymous}</View>
          {/* <View className={styles.tips}>
            {i18n.longPressDeletePicture}
          </View> */}
        </View>
        <BYButton
          text={i18n.submit}
          styleWrap={styles.button}
          onClick={() => this.handleOnPressSubmit()}
        />
      </View>
    );
  }

  render() {
    const { addEvaluationLoading, loading, authUser } = this.props;

    return (
      <View className={styles.container}>
        <BYHeader title={i18n.evaluation} />
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          i18n={i18n}
          router={router}
          SCREENS={SCREENS}
        />

        <View>{this.renderContent()}</View>
        {(loading || addEvaluationLoading) && <Loader />}
      </View>
    );
  }
}

export default connect(
  (state, props) => {
    const { collectFiles, addEvaluation } = state;

    const {
      location: {
        query: { orderNo, tradeNo, brandId },
      },
    } = props;

    return {
      authUser: getLoginUser(state, props),
      collectFiles,
      orderNo,
      tradeNo,
      brandId,
      addEvaluationLoading: addEvaluation.loading,
      images: collectFiles.images,
      loading: collectFiles.loading,
    };
  },
  {
    ...collectFilesActionCreators,
    ...addEvaluationActionCreators,
  },
)(Evalution);

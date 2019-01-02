/* eslint-disable react/no-array-index-key */
/* eslint-disable no-new */
import React from 'react';
import { connect } from 'react-redux';
import Compressor from 'compressorjs';

import BYHeader from '@src/components/BYHeader';
import { TextareaItem, Modal, ImagePicker } from 'antd-mobile';
import { formatMessage } from 'umi-plugin-locale';
import router from 'umi/lib/router';

import Loader from '@src/components/Loader';
import {
  addEventListenerBuyoo,
  removeEventListenerBuyoo,
  submitDuplicateFreeze,
} from '@src/utils';

import * as collectFilesActionCreators from '@src/common/actions/collectFiles';
// import * as modalActionCreators from '@src/common/actions/modal';
import * as addEvaluationActionCreators from '@src/common/actions/addEvaluation';
import { PRIMARY_COLOR } from '@src/styles/variables';
import { SIDEINTERVAL, WINDOW_WIDTH, SCREENS } from '@src/common/constants';

import MustLogin from '@src/components/MustLogin';
import BYButton from '@src/components/BYButton';
import CustomIcon from '@src/components/CustomIcon';
import { getLoginUser } from '@src/common/selectors';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};

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
    //     Alert.alert('', formatMessage({ id: 'success' }), [
    //       {
    //         text: formatMessage({ id: 'confirm' }),
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
        Modal.alert('', formatMessage({ id: 'success' }), [
          {
            text: formatMessage({ id: 'confirm' }),
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
        Modal.alert('', formatMessage({ id: 'failed' }), [
          {
            text: formatMessage({ id: 'confirm' }),
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
      Modal.alert('', formatMessage({ id: 'pleaseEnterYourComment' }), [
        {
          text: formatMessage({ id: 'confirm' }),
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
    const stylesX = {
      container: {
        flex: 1,
      },
      startWrap: {
        display: 'flex',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingRight: SIDEINTERVAL,
        paddingLeft: SIDEINTERVAL,
      },
      starIcon: {
        color: '#ccc',
        fontSize: 18,
        marginRight: 5,
      },
      starIconActive: {
        color: PRIMARY_COLOR,
        fontSize: 18,
        marginRight: 5,
      },
      mainWrap: {
        paddingRight: SIDEINTERVAL,
        paddingLeft: SIDEINTERVAL,
        marginBottom: 70,
      },
      main: {
        // backgroundColor: '#f5f5f5',
        marginBottom: 10,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderStyle: 'solid',
      },
      textInput: {
        // paddingLeft: SIDEINTERVAL,
        // paddingRight: SIDEINTERVAL,
        // paddingBottom: SIDEINTERVAL,
        // marginBottom: 50,
        // backgroundColor: '#f5f5f5',
      },
      pics: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingTop: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
      },
      imageItem: {
        position: 'relative',
        height: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
        width: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
        backgroundColor: '#e5e5e5',
        marginRight: SIDEINTERVAL,
      },
      imageItemOnLongPress: {
        position: 'absolute',
        // top: 0,
        // bottom: 0,
        // left: 0,
        // right: 0,
        height: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
        width: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
        // backgroundColor: '#ff0',
        zIndex: 888,
      },
      imageItemImage: {
        height: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
        width: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
      },
      selectPics: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderStyle: 'solid',
        height: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
        width: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
      },
      cameraIcon: {
        color: '#999',
        fontSize: 16,
        // marginBottom: 5,
        paddingTop: 7,
      },
      cameraText: {
        color: '#ccc',
        fontSize: 8,
      },
      cameraInput: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0,
      },
      tips: {
        fontSize: 11,
        color: '#ccc',
        lineHeight: `${11 * 1.618}px`,
      },
    };

    const { starNumber, textValue, multiple } = this.state;

    const { images } = this.props;

    return (
      <div style={stylesX.container}>
        <div style={stylesX.startWrap}>
          {[0, 1, 2, 3, 4].map(val => (
            <CustomIcon
              style={
                starNumber > val ? stylesX.starIconActive : stylesX.starIcon
              }
              type="star-fill"
              key={val}
              onClick={() => this.handleOnPressStar(val + 1)}
            />
          ))}
        </div>
        <div style={stylesX.mainWrap}>
          <div style={stylesX.main}>
            <TextareaItem
              style={stylesX.textInput}
              value={textValue}
              placeholder={formatMessage({ id: 'pleaseEnterYourComment' })}
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
          </div>
          <div style={stylesX.tips}>
            {formatMessage({ id: 'yourCommentAnonymous' })}
          </div>
          {/* <div style={stylesX.tips}>
            {formatMessage({ id: 'longPressDeletePicture' })}
          </div> */}
        </div>
        <BYButton
          text={formatMessage({ id: 'submit' })}
          styleWrap={stylesX.button}
          onClick={() => this.handleOnPressSubmit()}
        />
      </div>
    );
  }

  render() {
    const { addEvaluationLoading, loading, authUser } = this.props;

    return (
      <div style={styles.container}>
        <BYHeader title={formatMessage({ id: 'evaluation' })} />
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          formatMessage={formatMessage}
          router={router}
          SCREENS={SCREENS}
        />

        <div>{this.renderContent()}</div>
        {(loading || addEvaluationLoading) && <Loader />}
      </div>
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
    // ...modalActionCreators,
    ...addEvaluationActionCreators,
  },
)(Evalution);

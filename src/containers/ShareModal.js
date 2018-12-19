import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';

import * as receiveVoucherActionCreators from '@/common/actions/receiveVoucher';
import * as modalActionCreators from '@/common/actions/modal';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  WINDOW_HEIGHT,
  BUYOO,
  IS_IOS,
  OSS_IMAGE_QUALITY,
  MONETARY,
  MESSENGER,
  FACEBOOK,
} from '@/common/constants';
import {
  FONT_COLOR_FIRST,
  BORDER_COLOR_FIRST,
  BACKGROUND_COLOR_THIRD,
  FONT_COLOR_SIXTH,
  FONT_SIZE_FIRST,
  FONT_COLOR_FIFTH,
  FONT_SIZE_SECOND,
} from '@/styles/variables';
import CustomIcon from '@/components/CustomIcon';
import { o } from '@/utils/AuthEncrypt';
import { localStorageGetItem, xOssProcess, dispatchEvent } from '@/utils';
import priceFormat from '@/utils/priceFormat';

class AddressAddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
    // this.addEventListenerHandle = this.addEventListenerHandle.bind(this);
  }

  componentDidMount() {
    const {
      modalProps: { params = {} },
    } = this.props;
    const { iconUrl, name } = params;
    console.log(iconUrl);
    console.log(name);
  }

  // componentWillUnmount() {
  //   removeEventListener('GiftModal', this.addEventListenerHandle);
  // }

  // addEventListenerHandle = ({ detail: { method } }) => {
  //   switch (method) {
  //     case 'receiveVoucher':
  //       Modal.alert('', formatMessage({ id: 'youGotCoupon' }), [
  //         {
  //           text: formatMessage({ id: 'confirm' }),
  //           style: 'default',
  //           onPress: () => {},
  //         },
  //       ]);

  //       break;

  //     default:
  //       break;
  //   }
  // };

  handleOnModalClose = () => {
    const { closeModal } = this.props;
    this.setState({
      visible: false,
    });
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  handleOnPressShare(type) {
    const {
      modalProps: { callback = '' },
    } = this.props;

    dispatchEvent(callback, {
      type,
    });
  }

  renderContent() {
    const {
      modalProps: { params = {} },
    } = this.props;
    const { iconUrl, name, price } = params;

    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: WINDOW_HEIGHT,
      },
      main: {
        backgroundColor: '#fff',
        width: WINDOW_WIDTH * 0.95,
        borderRadius: 5,
      },
      header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#f7f7f7',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: BORDER_COLOR_FIRST,
        borderBottomStyle: 'solid',
      },
      headerLeft: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        color: '#aaa',
      },
      headerMain: {
        flex: 1,
        textAlign: 'center',
        color: FONT_COLOR_FIRST,
      },
      headerRight: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        opacity: 0,
      },
      body: {
        backgroundColor: BACKGROUND_COLOR_THIRD,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        paddingLeft: SIDEINTERVAL * 0.8,
        paddingRight: SIDEINTERVAL * 0.8,
        paddingTop: 8,
        paddingBottom: 8,
        marginBottom: 10,
      },
      productInfo: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#f3f4f7',
        borderWidth: 1,
        borderColor: '#d4d4d4',
        borderStyle: 'solid',
        borderRadius: 3,
        padding: SIDEINTERVAL * 0.5,
      },
      productInfoLeft: {
        width: WINDOW_WIDTH * 0.16,
        height: WINDOW_WIDTH * 0.16,
        marginRight: SIDEINTERVAL * 0.5,
      },
      productInfoRight: {
        textAlign: 'left',
      },
      productInfoTitle: {
        color: FONT_COLOR_FIRST,
        marginBottom: 3,
      },
      productInfoPrice: {
        color: FONT_COLOR_SIXTH,
        fontSize: FONT_SIZE_FIRST,
        marginBottom: 3,
      },
      productInfoRow1: {
        color: '#7c7c7c',
        fontSize: FONT_SIZE_FIRST,
        marginBottom: 3,
      },
      productInfoRow2: {
        color: '#7c7c7c',
        fontSize: FONT_SIZE_FIRST,
        marginBottom: 3,
      },
      productInfoRow2Price: {
        fontSize: FONT_SIZE_FIRST,
      },
      operate: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 15,
      },
      operateMsg: {
        marginRight: SIDEINTERVAL,
        backgroundColor: '#147af3',
        color: FONT_COLOR_FIFTH,
        borderRadius: 3,
        paddingRight: SIDEINTERVAL * 0.5,
        paddingTop: 4,
        paddingBottom: 4,
        fontSize: FONT_SIZE_FIRST,
        textAlign: 'top',
      },
      operateFB: {
        marginRight: SIDEINTERVAL,
        backgroundColor: '#3a5394',
        color: FONT_COLOR_FIFTH,
        borderRadius: 3,
        paddingRight: SIDEINTERVAL * 0.5,
        paddingTop: 4,
        paddingBottom: 4,
        fontSize: FONT_SIZE_FIRST,
        textAlign: 'top',
      },
      operateMsgIcon: {
        paddingLeft: SIDEINTERVAL * 0.6,
        paddingRight: SIDEINTERVAL * 0.6,
        fontSize: FONT_SIZE_SECOND,
      },
      operateFBIcon: {
        paddingLeft: SIDEINTERVAL * 0.6,
        paddingRight: SIDEINTERVAL * 0.6,
        fontSize: FONT_SIZE_SECOND,
      },
    };

    return (
      <div style={styles.container}>
        <div style={styles.main}>
          <div style={styles.header}>
            <div
              style={styles.headerLeft}
              onClick={() => this.handleOnModalClose()}
            >
              {formatMessage({ id: 'cancel' })}
            </div>
            <div style={styles.headerMain}>
              {formatMessage({ id: 'share' })}
            </div>
            <div style={styles.headerRight}>
              {formatMessage({ id: 'cancel' })}
            </div>
          </div>
          <div style={styles.body}>
            <div style={styles.productInfo}>
              <img
                alt=""
                style={styles.productInfoLeft}
                src={`${iconUrl}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
              />
              <div style={styles.productInfoRight}>
                <div style={styles.productInfoTitle}>{name}</div>
                <div style={styles.productInfoPrice}>{`${priceFormat(
                  price,
                )} ${MONETARY}`}</div>
                <div style={styles.productInfoRow1}>Voucher giảm giá</div>
                <div style={styles.productInfoRow2}>
                  Voucher giảm giá:{' '}
                  <span style={styles.productInfoRow2Price}>+ 2.000</span>
                </div>
              </div>
            </div>
          </div>
          <div style={styles.operate}>
            <div
              style={styles.operateMsg}
              onClick={() => this.handleOnPressShare(MESSENGER)}
            >
              <CustomIcon type="messenger" style={styles.operateMsgIcon} />
              share
            </div>
            <div
              style={styles.operateFB}
              onClick={() => this.handleOnPressShare(FACEBOOK)}
            >
              <CustomIcon type="facebook" style={styles.operateFBIcon} />
              share
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { visible } = this.state;

    return (
      <Modal
        popup
        visible={visible}
        onClose={() => this.handleOnModalClose()}
        animationType="fade"
        className="gift-modal"
      >
        {this.renderContent()}
      </Modal>
    );
  }
}

export default connect(
  state => {
    const {
      modal: { modalProps = {} },
    } = state;

    return {
      modalProps,
      authUser: o(localStorageGetItem, BUYOO),
    };
  },
  {
    ...receiveVoucherActionCreators,
    ...modalActionCreators,
  },
)(AddressAddModal);

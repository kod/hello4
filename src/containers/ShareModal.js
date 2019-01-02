import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import { formatMessage } from 'umi-plugin-locale';

import * as receiveVoucherActionCreators from '@src/common/actions/receiveVoucher';
import * as modalActionCreators from '@src/common/actions/modal';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  WINDOW_HEIGHT,
  IS_IOS,
  OSS_IMAGE_QUALITY,
  MONETARY,
  MESSENGER,
  FACEBOOK,
} from '@src/common/constants';
import {
  FONT_COLOR_FIRST,
  BORDER_COLOR_FIRST,
  BACKGROUND_COLOR_THIRD,
  FONT_COLOR_SIXTH,
  FONT_SIZE_FIRST,
  FONT_COLOR_FIFTH,
  FONT_SIZE_SECOND,
  FONT_SIZE_THIRD,
} from '@src/styles/variables';
import CustomIcon from '@src/components/CustomIcon';
import { xOssProcess, dispatchEventBuyoo } from '@src/utils';
import priceFormat from '@src/utils/priceFormat';
import { getLoginUser } from '@src/common/selectors';

class AddressAddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
    // this.addEventListenerHandle = this.addEventListenerHandle.bind(this);
  }

  // componentDidMount() {
  //   const {
  //     modalProps: { params = {} },
  //   } = this.props;
  //   const { iconUrl, name } = params;
  // }

  // componentWillUnmount() {
  //   removeEventListenerBuyoo('GiftModal', this.addEventListenerHandle);
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

    dispatchEventBuyoo(callback, {
      type,
    });
  }

  renderContent() {
    const {
      modalProps: { params = {} },
    } = this.props;
    const { iconUrl, name, price, rewardNumber } = params;

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
        fontWeight: '700',
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
      tips: {
        color: '#3A3A3A',
        fontSize: FONT_SIZE_THIRD,
        textAlign: 'left',
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingTop: 10,
        paddingBottom: 5,
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
          <div style={styles.tips}>
            {formatMessage({ id: 'shareGetDiscountedDealsAndMoneyRose' })}
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
                {/* <div style={styles.productInfoRow1}>Voucher giảm giá</div> */}
                {!!rewardNumber && (
                  <div style={styles.productInfoRow2}>
                    {`${formatMessage({ id: 'salesCommission' })}: `}
                    <span style={styles.productInfoRow2Price}>
                      {`+ ${priceFormat(rewardNumber)} ${MONETARY}`}
                    </span>
                  </div>
                )}
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
  (state, props) => {
    const {
      modal: { modalProps = {} },
    } = state;

    return {
      modalProps,
      authUser: getLoginUser(state, props),
    };
  },
  {
    ...receiveVoucherActionCreators,
    ...modalActionCreators,
  },
)(AddressAddModal);

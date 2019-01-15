import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import { i18n, Text, View } from '@src/API';

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
import CustomIcon from '@src/components/CustomIcon';
import { xOssProcess, dispatchEventBuyoo } from '@src/utils';
import priceFormat from '@src/utils/priceFormat';
import { getLoginUser } from '@src/common/selectors';

import styles from './ShareModal.less';

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
  //       Modal.alert('', i18n.youGotCoupon, [
  //         {
  //           text: i18n.confirm,
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

    return (
      <View
        style={{
          height: WINDOW_HEIGHT,
        }}
        className={styles.container}
      >
        <View
          style={{
            width: WINDOW_WIDTH * 0.95,
          }}
          className={styles.main}
        >
          <View className={styles.header}>
            <View
              style={{
                paddingLeft: SIDEINTERVAL,
                paddingRight: SIDEINTERVAL,
              }}
              className={styles.headerLeft}
              onClick={() => this.handleOnModalClose()}
            >
              {i18n.cancel}
            </View>
            <View className={styles.headerMain}>{i18n.share}</View>
            <View
              style={{
                paddingLeft: SIDEINTERVAL,
                paddingRight: SIDEINTERVAL,
              }}
              className={styles.headerRight}
            >
              {i18n.cancel}
            </View>
          </View>
          <View
            style={{
              paddingLeft: SIDEINTERVAL,
              paddingRight: SIDEINTERVAL,
            }}
            className={styles.tips}
          >
            {i18n.shareGetDiscountedDealsAndMoneyRose}
          </View>
          <View
            style={{
              paddingLeft: SIDEINTERVAL * 0.8,
              paddingRight: SIDEINTERVAL * 0.8,
            }}
            className={styles.body}
          >
            <View
              style={{
                padding: SIDEINTERVAL * 0.5,
              }}
              className={styles.productInfo}
            >
              <img
                alt=""
                style={{
                  width: WINDOW_WIDTH * 0.16,
                  height: WINDOW_WIDTH * 0.16,
                  marginRight: SIDEINTERVAL * 0.5,
                }}
                src={`${iconUrl}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
              />
              <View className={styles.productInfoRight}>
                <View className={styles.productInfoTitle}>{name}</View>
                <View className={styles.productInfoPrice}>{`${priceFormat(
                  price,
                )} ${MONETARY}`}</View>
                {/* <View className={styles.productInfoRow1}>Voucher giảm giá</View> */}
                {!!rewardNumber && (
                  <View className={styles.productInfoRow2}>
                    {`${i18n.salesCommission}: `}
                    <Text className={styles.productInfoRow2Price}>
                      {`+ ${priceFormat(rewardNumber)} ${MONETARY}`}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View className={styles.operate}>
            <View
              style={{
                marginRight: SIDEINTERVAL,
                paddingRight: SIDEINTERVAL * 0.5,
              }}
              className={styles.operateMsg}
              onClick={() => this.handleOnPressShare(MESSENGER)}
            >
              <CustomIcon
                name="messenger"
                type="messenger"
                style={{
                  paddingLeft: SIDEINTERVAL * 0.6,
                  paddingRight: SIDEINTERVAL * 0.6,
                }}
                className={styles.operateMsgIcon}
              />
              share
            </View>
            <View
              style={{
                marginRight: SIDEINTERVAL,
                paddingRight: SIDEINTERVAL * 0.5,
              }}
              className={styles.operateFB}
              onClick={() => this.handleOnPressShare(FACEBOOK)}
            >
              <CustomIcon
                name="facebook"
                type="facebook"
                style={{
                  paddingLeft: SIDEINTERVAL * 0.6,
                  paddingRight: SIDEINTERVAL * 0.6,
                }}
                className={styles.operateFBIcon}
              />
              share
            </View>
          </View>
        </View>
      </View>
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

import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import { i18n, View } from '@src/API';
import router from 'umi/lib/router';

import * as receiveVoucherActionCreators from '@src/common/actions/receiveVoucher';
import * as modalActionCreators from '@src/common/actions/modal';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  WINDOW_HEIGHT,
} from '@src/common/constants';
import CustomIcon from '@src/components/CustomIcon';
import BYButton from '@src/components/BYButton';
import { addEventListenerBuyoo, removeEventListenerBuyoo } from '@src/utils';
import { getLoginUser } from '@src/common/selectors';

import styles from './GiftModal.less';

class AddressAddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
    this.addEventListenerHandle = this.addEventListenerHandle.bind(this);
  }

  componentDidMount() {
    addEventListenerBuyoo('GiftModal', this.addEventListenerHandle);
  }

  componentWillUnmount() {
    removeEventListenerBuyoo('GiftModal', this.addEventListenerHandle);
  }

  addEventListenerHandle = ({ detail: { method } }) => {
    switch (method) {
      case 'receiveVoucher':
        Modal.alert('', i18n.youGotCoupon, [
          {
            text: i18n.confirm,
            style: 'default',
            onPress: () => {},
          },
        ]);

        break;

      default:
        break;
    }
  };

  handleOnModalClose = () => {
    const { closeModal } = this.props;
    this.setState({
      visible: false,
    });
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  handleOnPressSubmit = () => {
    const {
      receiveVoucherFetch,
      modalProps: { voucherId },
      authUser,
    } = this.props;
    if (!authUser) return router.push(`/login`);

    setTimeout(() => {
      this.handleOnModalClose();
    }, 300);

    return receiveVoucherFetch({
      voucherid: voucherId,
      screen: 'GiftModal',
    });
  };

  renderContent() {
    return (
      <View
        style={{
          height: WINDOW_HEIGHT,
        }}
        className={styles.container}
      >
        <View
          style={{
            width: WINDOW_WIDTH * 0.8,
            height: WINDOW_WIDTH * 0.8,
          }}
          className={styles.main}
        >
          <View
            className={styles.close}
            onClick={() => this.handleOnModalClose()}
          >
            <CustomIcon
              name="close"
              type="close"
              style={{
                paddingTop: SIDEINTERVAL / 2,
                paddingRight: SIDEINTERVAL / 2,
                paddingBottom: SIDEINTERVAL / 2,
                paddingLeft: SIDEINTERVAL / 2,
              }}
              className={styles.closeIcon}
            />
          </View>
          <View
            style={{
              paddingTop: WINDOW_WIDTH * 0.35,
              paddingLeft: WINDOW_WIDTH * 0.1,
              paddingRight: WINDOW_WIDTH * 0.1,
              marginBottom: WINDOW_WIDTH * 0.06,
            }}
            className={styles.text}
          >
            {i18n.receivedGiftCard}
          </View>
          <BYButton
            text={i18n.usedImmediately}
            className={styles.button}
            styleText={{
              height: 40,
            }}
            onClick={() => this.handleOnPressSubmit()}
          />
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

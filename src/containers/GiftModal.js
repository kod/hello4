import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import { formatMessage } from 'umi-plugin-locale';
import router from 'umi/router';

import * as receiveVoucherActionCreators from '@src/common/actions/receiveVoucher';
import * as modalActionCreators from '@src/common/actions/modal';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  WINDOW_HEIGHT,
} from '@src/common/constants';
import {
  FONT_COLOR_PRIMARY,
  FONT_SIZE_THIRD,
  FONT_COLOR_FIRST,
} from '@src/styles/variables';
import CustomIcon from '@src/components/CustomIcon';
import BYButton from '@src/components/BYButton';
import { addEventListenerBuyoo, removeEventListenerBuyoo } from '@src/utils';
import { getLoginUser } from '@src/common/selectors';

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
        Modal.alert('', formatMessage({ id: 'youGotCoupon' }), [
          {
            text: formatMessage({ id: 'confirm' }),
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
        width: WINDOW_WIDTH * 0.8,
        height: WINDOW_WIDTH * 0.8,
        borderRadius: 10,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage:
          'url(https://oss.buyoo.vn/buyoo_vip/usercollect/1/20181217182121_p8Z.png)',
      },
      close: {
        textAlign: 'right',
      },
      closeIcon: {
        color: FONT_COLOR_PRIMARY,
        fontSize: FONT_SIZE_THIRD,
        fontWeight: 700,
        paddingTop: SIDEINTERVAL / 2,
        paddingRight: SIDEINTERVAL / 2,
        paddingBottom: SIDEINTERVAL / 2,
        paddingLeft: SIDEINTERVAL / 2,
      },
      text: {
        textAlign: 'center',
        paddingTop: WINDOW_WIDTH * 0.35,
        paddingLeft: WINDOW_WIDTH * 0.1,
        paddingRight: WINDOW_WIDTH * 0.1,
        color: FONT_COLOR_FIRST,
        marginBottom: WINDOW_WIDTH * 0.06,
      },
      button: {
        borderRadius: 3,
      },
      buttonText: {
        height: 40,
      },
    };

    return (
      <div style={styles.container}>
        <div style={styles.main}>
          <div style={styles.close} onClick={() => this.handleOnModalClose()}>
            <CustomIcon type="close" style={styles.closeIcon} />
          </div>
          <div style={styles.text}>
            {formatMessage({ id: 'receivedGiftCard' })}
          </div>
          <BYButton
            text={formatMessage({ id: 'usedImmediately' })}
            style={styles.button}
            styleText={styles.buttonText}
            onClick={() => this.handleOnPressSubmit()}
          />
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

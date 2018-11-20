import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import { connect } from 'dva';
import * as modalActionCreators from '../common/actions/modal';
import * as productDetailInfoActionCreators from '../common/actions/productDetailInfo';

@connect(
  (state, props) => {
    // const {
    //   modal: { modalProps = {} },
    //   productDetailInfo,
    // } = state;

    // const { brandId } = props;

    // const brandIdUsed = brandId;
    console.log(state);
    console.log(props);
    return {
      // ...productDetailInfo.item,
      // visible: false,
      // brandId: brandIdUsed,
      // groupon: false,
      // isMaster: false,
      // isAuthUser: !!state.login.user,
      // modalProps,
    };
  },
  {
    ...productDetailInfoActionCreators,
    ...modalActionCreators,
  },
)
class ParamsSelectModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };
  }

  handleOnModalClose = () => {
    const { closeModal } = this.props;
    this.setState({
      visible: false,
    });
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  renderContent() {
    console.log(this);
    const styles = {
      container: {
        backgroundColor: 'transparent',
      },
    };

    return <div style={styles.container}>1111</div>;
  }

  render() {
    const { visible } = this.state;

    return (
      <Modal
        popup
        visible={visible}
        onClose={() => this.handleOnModalClose()}
        animationType="slide-down"
      >
        {this.renderContent()}
      </Modal>
    );
  }
}

export default ParamsSelectModal;

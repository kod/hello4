import React from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPES } from '@src/common/constants';
import AddressAddModal from './AddressAddModal';
import ParamsSelectModal from './ParamsSelectModal';
import GiftModal from './GiftModal';
import ShareModal from './ShareModal';
// import BillSelectModal from './BillSelectModal';
// import EnterPasswordModal from './EnterPasswordModal';
// import ShareModal from './ShareModal';
// import PerMonthPriceModal from './PerMonthPriceModal';
// import StagingDetailsModal from './StagingDetailsModal';

const MODAL_COMPONENTS = {
  [MODAL_TYPES.ADDRESSADD]: AddressAddModal,
  [MODAL_TYPES.PARAMSSELECT]: ParamsSelectModal,
  [MODAL_TYPES.GIFT]: GiftModal,
  [MODAL_TYPES.SHARE]: ShareModal,
  // [MODAL_TYPES.LOADER]: LoaderModal,
  // [MODAL_TYPES.ACTIONSHEET]: ActionSheetModal,
  // [MODAL_TYPES.BILLSELECT]: BillSelectModal,
  // [MODAL_TYPES.ENTERPASSWORD]: EnterPasswordModal,
  // [MODAL_TYPES.PERMONTHPRICE]: PerMonthPriceModal,
  // [MODAL_TYPES.STAGINGDETAILS]: StagingDetailsModal,
};

class ModalRoot extends React.Component {
  componentDidMount() {
    console.log('');
  }

  render() {
    const {
      modal: { modalType, modalProps },
    } = this.props;
    if (!modalType) {
      return null;
    }
    const SpecificModal = MODAL_COMPONENTS[modalType];
    // const SpecificModal = MODAL_COMPONENTS[MODAL_TYPES.PARAMSSELECT];
    return <SpecificModal {...modalProps} />;
  }
}

export default connect(state => {
  const { modal } = state;

  return {
    modal,
  };
})(ModalRoot);

import React from 'react';
import { connect } from 'dva';
import { MODAL_TYPES } from '../common/constants';
import AddressAddModal from './AddressAddModal';
import ParamsSelectModal from './ParamsSelectModal';
// import LoaderModal from './LoaderModal';
// import ActionSheetModal from './ActionSheetModal';
// import BillSelectModal from './BillSelectModal';
// import EnterPasswordModal from './EnterPasswordModal';
// import ShareModal from './ShareModal';
// import PerMonthPriceModal from './PerMonthPriceModal';
// import StagingDetailsModal from './StagingDetailsModal';

const MODAL_COMPONENTS = {
  [MODAL_TYPES.ADDRESSADD]: AddressAddModal,
  [MODAL_TYPES.PARAMSSELECT]: ParamsSelectModal,
  // [MODAL_TYPES.LOADER]: LoaderModal,
  // [MODAL_TYPES.ACTIONSHEET]: ActionSheetModal,
  // [MODAL_TYPES.BILLSELECT]: BillSelectModal,
  // [MODAL_TYPES.ENTERPASSWORD]: EnterPasswordModal,
  // [MODAL_TYPES.SHARE]: ShareModal,
  // [MODAL_TYPES.PERMONTHPRICE]: PerMonthPriceModal,
  // [MODAL_TYPES.STAGINGDETAILS]: StagingDetailsModal,
};

@connect(state => {
  const { modal } = state;

  return {
    modal,
  };
})
class ModalRoot extends React.Component {
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

export default ModalRoot;

import React from 'react';
import { List, Modal, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { formatMessage } from 'umi/locale';
import { connect } from 'react-redux';

import ModalRoot from '@/containers/ModalRoot';
import Loader from '@/components/Loader';
import router from 'umi/router';
import {
  SIDEINTERVAL,
  WINDOW_HEIGHT,
  NAME_EXPR,
  PHONE_EXPR,
  MODAL_TYPES,
  SCREENS,
  USERADDADDR_NAMESPACE,
  BUYOO,
} from '@/common/constants';
import { PRIMARY_COLOR } from '@/styles/variables';

import * as cityInfosActionCreators from '@/common/actions/cityInfos';
import * as addressActionCreators from '@/common/actions/address';
import * as addressModifyActionCreators from '@/common/actions/addressModify';
import * as userAddAddrActionCreators from '@/common/actions/userAddAddr';
import * as modalActionCreators from '@/common/actions/modal';
import {
  submitDuplicateFreeze,
  addEventListenerBuyoo,
  removeEventListenerBuyoo,
  localStorageGetItem,
} from '@/utils';
import InputRight from '@/components/InputRight';
import BYButton from '@/components/BYButton';
import MustLogin from '@/components/MustLogin';
import { ADDRESS_ADD } from '@/common/constants/actionTypes';
import { o } from '@/utils/AuthEncrypt';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  title: {
    height: 45,
    lineHeight: '45px',
    color: '#666',
    paddingRight: SIDEINTERVAL / 2,
  },
  textInput: {
    flex: 1,
    color: '#333',
    textAlign: 'right',
    borderBottomWidth: 0,
  },
  address: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 5,
    color: '#333',
  },
  arrow: {
    fontSize: 10,
    color: '#ccc',
    paddingTop: 1,
  },
  submitWrap: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    paddingTop: WINDOW_HEIGHT * 0.1,
  },
  submit: {
    height: 50,
    lineHeight: '50px',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: PRIMARY_COLOR,
  },
  submitActive: {
    // backgroundColor: PRIMARY_COLOR,
  },
};

class AddressAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitfreeze: false,
      division2ndID: null,
      division3rdID: null,
      division4thID: null,
      division2ndName: null,
      division3rdName: null,
      division4thName: null,
    };
    this.addEventListenerHandle = this.addEventListenerHandle.bind(this);
    this.toggleMenuBottomSheetEventListenerHandle = this.toggleMenuBottomSheetEventListenerHandle.bind(
      this,
    );
  }

  componentDidMount() {
    const { addressModifyClear } = this.props;
    addressModifyClear();
    addEventListenerBuyoo(SCREENS.AddressAdd, this.addEventListenerHandle);
    addEventListenerBuyoo(
      'toggleMenuBottomSheetEventListener',
      this.toggleMenuBottomSheetEventListenerHandle,
    );
  }

  componentWillUnmount() {
    removeEventListenerBuyoo(SCREENS.AddressAdd, this.addEventListenerHandle);
    removeEventListenerBuyoo(
      'toggleMenuBottomSheetEventListener',
      this.toggleMenuBottomSheetEventListenerHandle,
    );
    clearTimeout(this.setTimeoutId);
  }

  addEventListenerHandle = () => {
    Modal.alert('', formatMessage({ id: 'success' }), [
      {
        text: formatMessage({ id: 'confirm' }),
        style: 'default',
        onPress: () => {
          router.go(-1);
        },
      },
    ]);
  };

  toggleMenuBottomSheetEventListenerHandle = ({ detail: ret }) => {
    this.setState(ret);
  };

  handleOnPressSubmit() {
    const {
      division2ndID,
      division3rdID,
      division4thID,
      submitfreeze,
    } = this.state;

    const { form, addressAddFetch } = this.props;

    form.validateFields((error, value) => {
      if (error === null) {
        // 提交
        const { address, name, phone } = value;

        if (!division4thID) {
          Modal.alert('', formatMessage({ id: 'pleaseEnterArea' }), [
            { text: formatMessage({ id: 'confirm' }), style: 'default' },
          ]);
          return false;
        }
        return submitDuplicateFreeze(submitfreeze, this, () =>
          addressAddFetch({
            msisdn: phone,
            address,
            isdefault: 'Y',
            username: name,
            division2nd: division2ndID,
            division3rd: division3rdID,
            division4th: division4thID,
            screen: SCREENS.AddressAdd,
          }),
        );
      }
      return Toast.info(error[Object.keys(error)[0]].errors[0].message, 1);
    });
  }

  render() {
    const { division2ndName, division3rdName, division4thName } = this.state;
    const {
      form: { getFieldProps },
      loading,
      openModal,
      authUser,
    } = this.props;
    return (
      <List>
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          formatMessage={formatMessage}
          router={router}
          SCREENS={SCREENS}
        />
        <ModalRoot />
        {loading && <Loader />}
        <div style={{ marginBottom: 30 }}>
          <div style={styles.item}>
            <div style={styles.title}>
              {formatMessage({ id: 'actualName' })}
            </div>
            <InputRight
              pattern={NAME_EXPR}
              getFieldProps={getFieldProps}
              styleWrap={{ flex: 1 }}
              styleInput={{ textAlign: 'right' }}
              style={styles.textInput}
              placeholder={formatMessage({ id: 'pleaseEnterYourActualName' })}
              message={formatMessage({
                id: 'pleaseEnterYourActualName',
              })}
              name="name"
              type="text"
            />
          </div>
          <div style={styles.item}>
            <div style={styles.title}>{formatMessage({ id: 'phone' })}</div>
            <InputRight
              pattern={PHONE_EXPR}
              getFieldProps={getFieldProps}
              styleWrap={{ flex: 1 }}
              styleInput={{ textAlign: 'right' }}
              style={styles.textInput}
              placeholder={formatMessage({ id: 'pleaseEnterYourPhoneNumber' })}
              message={formatMessage({
                id: 'pleaseEnterCorrectPhoneNumber',
              })}
              name="phone"
              type="number"
            />
          </div>
          <div style={styles.item}>
            <div style={styles.title}>{formatMessage({ id: 'address' })}</div>
            <InputRight
              getFieldProps={getFieldProps}
              styleWrap={{ flex: 1 }}
              styleInput={{ textAlign: 'right' }}
              style={styles.textInput}
              placeholder={formatMessage({ id: 'pleaseEnterAddress' })}
              name="address"
              type="text"
            />
          </div>
          <div style={styles.item}>
            <div style={styles.title}>
              {formatMessage({ id: 'communeDistrictCity' })}
            </div>
            <div
              style={{
                flex: 1,
                textAlign: 'right',
                paddingRight: SIDEINTERVAL,
              }}
              onClick={() =>
                openModal(MODAL_TYPES.ADDRESSADD, {
                  callback: 'toggleMenuBottomSheetEventListener',
                })
              }
            >
              {division4thName
                ? `${division4thName}, ${division3rdName}, ${division2ndName}`
                : formatMessage({ id: 'pleaseChoose' })}
            </div>
          </div>
        </div>
        <BYButton
          styleWrap={{ marginBottom: 30 }}
          styleText={styles.submit}
          text={formatMessage({ id: 'save' })}
          onClick={() => this.handleOnPressSubmit()}
        />
      </List>
    );
  }
}

export default connect(
  state => {
    const { cityInfos, addressModify, loading } = state;

    return {
      loading:
        loading.effects[`${USERADDADDR_NAMESPACE}/${ADDRESS_ADD.REQUEST}`],
      addressModifyLoaded: addressModify.loaded,
      addressModifyIsTrue: addressModify.isTrue,
      division2ndItems: cityInfos.division2nd,
      division3rdItems: cityInfos.division3rd,
      division4thItems: cityInfos.division4th,
      authUser: o(localStorageGetItem, BUYOO),
    };
  },
  {
    ...cityInfosActionCreators,
    ...addressActionCreators,
    ...addressModifyActionCreators,
    ...userAddAddrActionCreators,
    ...modalActionCreators,
  },
)(createForm()(AddressAdd));

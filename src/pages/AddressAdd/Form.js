import React from 'react';
import { List, Modal, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { i18n, View } from '@src/API';
import { connect } from 'react-redux';

import ModalRoot from '@src/containers/ModalRoot';
import Loader from '@src/components/Loader';
import router from 'umi/lib/router';
import {
  SIDEINTERVAL,
  WINDOW_HEIGHT,
  NAME_EXPR,
  PHONE_EXPR,
  MODAL_TYPES,
  SCREENS,
} from '@src/common/constants';
import { PRIMARY_COLOR } from '@src/styles/variables';

import * as cityInfosActionCreators from '@src/common/actions/cityInfos';
import * as addressActionCreators from '@src/common/actions/address';
import * as addressModifyActionCreators from '@src/common/actions/addressModify';
import * as userAddAddrActionCreators from '@src/common/actions/userAddAddr';
import * as modalActionCreators from '@src/common/actions/modal';
import {
  submitDuplicateFreeze,
  addEventListenerBuyoo,
  removeEventListenerBuyoo,
} from '@src/utils';
import InputRight from '@src/components/InputRight';
import BYButton from '@src/components/BYButton';
import MustLogin from '@src/components/MustLogin';
import { getLoginUser } from '@src/common/selectors';

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
    Modal.alert('', i18n.success, [
      {
        text: i18n.confirm,
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
          Modal.alert('', i18n.pleaseEnterArea, [
            { text: i18n.confirm, style: 'default' },
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
          i18n={i18n}
          router={router}
          SCREENS={SCREENS}
        />
        <ModalRoot />
        {loading && <Loader />}
        <View style={{ marginBottom: 30 }}>
          <View style={styles.item}>
            <View style={styles.title}>{i18n.actualName}</View>
            <InputRight
              pattern={NAME_EXPR}
              getFieldProps={getFieldProps}
              styleWrap={{ flex: 1 }}
              styleInput={{ textAlign: 'right' }}
              style={styles.textInput}
              placeholder={i18n.pleaseEnterYourActualName}
              message={i18n.pleaseEnterYourActualName}
              name="name"
              type="text"
            />
          </View>
          <View style={styles.item}>
            <View style={styles.title}>{i18n.phone}</View>
            <InputRight
              pattern={PHONE_EXPR}
              getFieldProps={getFieldProps}
              styleWrap={{ flex: 1 }}
              styleInput={{ textAlign: 'right' }}
              style={styles.textInput}
              placeholder={i18n.pleaseEnterYourPhoneNumber}
              message={i18n.pleaseEnterCorrectPhoneNumber}
              name="phone"
              type="number"
            />
          </View>
          <View style={styles.item}>
            <View style={styles.title}>{i18n.address}</View>
            <InputRight
              getFieldProps={getFieldProps}
              styleWrap={{ flex: 1 }}
              styleInput={{ textAlign: 'right' }}
              style={styles.textInput}
              placeholder={i18n.pleaseEnterAddress}
              name="address"
              type="text"
            />
          </View>
          <View style={styles.item}>
            <View style={styles.title}>{i18n.communeDistrictCity}</View>
            <View
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
                : i18n.pleaseChoose}
            </View>
          </View>
        </View>
        <BYButton
          styleWrap={{ marginBottom: 30 }}
          styleText={styles.submit}
          text={i18n.save}
          onClick={() => this.handleOnPressSubmit()}
        />
      </List>
    );
  }
}

export default connect(
  (state, props) => {
    const { cityInfos, addressModify, userAddAddr } = state;

    return {
      loading: userAddAddr.loading,
      addressModifyLoaded: addressModify.loaded,
      addressModifyIsTrue: addressModify.isTrue,
      division2ndItems: cityInfos.division2nd,
      division3rdItems: cityInfos.division3rd,
      division4thItems: cityInfos.division4th,
      authUser: getLoginUser(state, props),
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

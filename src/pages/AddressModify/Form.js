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
  NAME_EXPR,
  PHONE_EXPR,
  MODAL_TYPES,
} from '@src/common/constants';

import * as cityInfosActionCreators from '@src/common/actions/cityInfos';
import * as addressActionCreators from '@src/common/actions/address';
import * as addressModifyActionCreators from '@src/common/actions/addressModify';
import * as userAddAddrActionCreators from '@src/common/actions/userAddAddr';
import * as modalActionCreators from '@src/common/actions/modal';
import {
  submitDuplicateFreeze,
  removeEventListenerBuyoo,
  addEventListenerBuyoo,
} from '@src/utils';
import InputRight from '@src/components/InputRight';
import BYButton from '@src/components/BYButton';

import styles from './Form.less';

class AddressModify extends React.Component {
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
      isFocus: true, // 页面是否显示在前端
    };
    this.toggleMenuBottomSheetEventListenerHandle = this.toggleMenuBottomSheetEventListenerHandle.bind(
      this,
    );
  }

  componentDidMount() {
    const { addressModifyClear, query: params } = this.props;

    addressModifyClear();
    addEventListenerBuyoo(
      'toggleMenuBottomSheetEventListener',
      this.toggleMenuBottomSheetEventListenerHandle,
    );

    if (params) {
      this.setState({
        division2ndID: params.division2nd,
        division3rdID: params.division3rd,
        division4thID: params.division4th,
        division2ndName: params.division2ndName,
        division3rdName: params.division3rdName,
        division4thName: params.division4thName,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isFocus } = this.state;
    const { addressModifyLoaded, addressModifyIsTrue } = nextProps;

    if (
      addressModifyLoaded === true &&
      addressModifyIsTrue === true &&
      isFocus === true
    ) {
      Modal.alert('', i18n.success, [
        {
          text: i18n.confirm,
          style: 'default',
          onPress: () => {
            router.go(-1);
          },
        },
      ]);
    }
  }

  componentWillUnmount() {
    removeEventListenerBuyoo(
      'toggleMenuBottomSheetEventListener',
      this.toggleMenuBottomSheetEventListenerHandle,
    );
    clearTimeout(this.setTimeoutId);
  }

  toggleMenuBottomSheetEventListenerHandle = ({ detail: ret }) => {
    this.setState(ret);
  };

  callbackToggleMenuBottomSheet(ret) {
    this.setState(ret);
  }

  handleOnPressSubmit() {
    const {
      division2ndID,
      division3rdID,
      division4thID,
      submitfreeze,
    } = this.state;

    const { form, addressModifyFetch, query: params } = this.props;

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
          addressModifyFetch({
            id: params.id,
            msisdn: phone,
            address,
            isdefault: params.isdefault,
            username: name,
            division2nd: division2ndID,
            division3rd: division3rdID,
            division4th: division4thID,
          }),
        );
      }
      return Toast.info(error[Object.keys(error)[0]].errors[0].message, 1);
    });
  }

  render() {
    const {
      division2ndID,
      division3rdID,
      division4thID,
      division2ndName,
      division3rdName,
      division4thName,
    } = this.state;
    const {
      form: { getFieldProps },
      addressModifyLoading,
      openModal,
      query,
    } = this.props;
    return (
      <List>
        <ModalRoot />
        {addressModifyLoading && <Loader />}
        <View style={{ marginBottom: 30 }}>
          <View
            style={{
              paddingLeft: SIDEINTERVAL,
              paddingRight: SIDEINTERVAL,
            }}
            className={styles.item}
          >
            <View
              style={{
                paddingRight: SIDEINTERVAL / 2,
              }}
              className={styles.title}
            >
              {i18n.actualName}
            </View>
            <InputRight
              pattern={NAME_EXPR}
              getFieldProps={getFieldProps}
              styleWrap={{ flex: 1 }}
              styleInput={{ textAlign: 'right' }}
              className={styles.textInput}
              placeholder={i18n.pleaseEnterYourActualName}
              initialValue={query.username}
              message={i18n.pleaseEnterYourActualName}
              name="name"
              type="text"
            />
          </View>
          <View
            style={{
              paddingLeft: SIDEINTERVAL,
              paddingRight: SIDEINTERVAL,
            }}
            className={styles.item}
          >
            <View
              style={{
                paddingRight: SIDEINTERVAL / 2,
              }}
              className={styles.title}
            >
              {i18n.phone}
            </View>
            <InputRight
              pattern={PHONE_EXPR}
              getFieldProps={getFieldProps}
              styleWrap={{ flex: 1 }}
              styleInput={{ textAlign: 'right' }}
              className={styles.textInput}
              placeholder={i18n.pleaseEnterYourPhoneNumber}
              initialValue={query.msisdn}
              message={i18n.pleaseEnterCorrectPhoneNumber}
              name="phone"
              type="number"
            />
          </View>
          <View
            style={{
              paddingLeft: SIDEINTERVAL,
              paddingRight: SIDEINTERVAL,
            }}
            className={styles.item}
          >
            <View
              style={{
                paddingRight: SIDEINTERVAL / 2,
              }}
              className={styles.title}
            >
              {i18n.address}
            </View>
            <InputRight
              getFieldProps={getFieldProps}
              styleWrap={{ flex: 1 }}
              styleInput={{ textAlign: 'right' }}
              className={styles.textInput}
              placeholder={i18n.pleaseEnterAddress}
              initialValue={query.address}
              name="address"
              type="text"
            />
          </View>
          <View
            style={{
              paddingLeft: SIDEINTERVAL,
              paddingRight: SIDEINTERVAL,
            }}
            className={styles.item}
          >
            <View
              style={{
                paddingRight: SIDEINTERVAL / 2,
              }}
              className={styles.title}
            >
              {i18n.communeDistrictCity}
            </View>
            <View
              style={{
                flex: 1,
                textAlign: 'right',
                paddingRight: SIDEINTERVAL,
              }}
              onClick={() =>
                openModal(MODAL_TYPES.ADDRESSADD, {
                  callback: 'toggleMenuBottomSheetEventListener',
                  params: {
                    division2nd: division2ndID,
                    division3rd: division3rdID,
                    division4th: division4thID,
                    division2ndName,
                    division3rdName,
                    division4thName,
                  },
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
          styleText={{
            height: 50,
            lineHeight: 50,
            textAlign: 'center',
            color: '#fff',
            backgroundColor: '#0076F7',
          }}
          text={i18n.save}
          onClick={() => this.handleOnPressSubmit()}
        />
      </List>
    );
  }
}

export default connect(
  state => {
    const { cityInfos, userAddAddr, addressModify } = state;

    return {
      loading: userAddAddr.loading,
      addressModifyLoading: addressModify.loading,
      addressModifyLoaded: addressModify.loaded,
      addressModifyIsTrue: addressModify.isTrue,
      division2ndItems: cityInfos.division2nd,
      division3rdItems: cityInfos.division3rd,
      division4thItems: cityInfos.division4th,
    };
  },
  {
    ...cityInfosActionCreators,
    ...addressActionCreators,
    ...addressModifyActionCreators,
    ...userAddAddrActionCreators,
    ...modalActionCreators,
  },
)(createForm()(AddressModify));

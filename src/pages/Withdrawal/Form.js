/* eslint-disable camelcase */
import React from 'react';
import { Toast, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import { i18n, View } from '@src/API';
import router from 'umi/lib/router';
import { SCREENS, SIDEINTERVAL, MONETARY } from '@src/common/constants';
import InputRight from '@src/components/InputRight';
import NavBar2 from '@src/components/NavBar2';

import * as enchashmentConfigActionCreators from '@src/common/actions/enchashmentConfig';
import * as enchashmentApplyActionCreators from '@src/common/actions/enchashmentApply';
import * as userAddDetailInfoActionCreators from '@src/common/actions/userAddDetailInfo';
import * as userCertificateInfoActionCreators from '@src/common/actions/userCertificateInfo';
import * as enchashmentGetListActionCreators from '@src/common/actions/enchashmentGetList';
import MustLogin from '@src/components/MustLogin';
import { addEventListenerBuyoo, removeEventListenerBuyoo } from '@src/utils';
import Loader from '@src/components/Loader';
import { getLoginUser } from '@src/common/selectors';

import styles from './Form.less';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      actuallyReceived: 0,
    };

    // this.handlerOnPress = this.handlerOnPress.bind(this);
  }

  componentDidMount() {
    const {
      authUser,
      enchashmentConfigFetch,
      enchashmentGetListFetch,
      userCertificateInfoFetch,
    } = this.props;
    addEventListenerBuyoo(SCREENS.Withdrawal, this.addEventListenerHandle);

    if (authUser) {
      enchashmentConfigFetch();
      enchashmentGetListFetch();
      userCertificateInfoFetch();
    }
  }

  componentWillUnmount() {
    removeEventListenerBuyoo(SCREENS.Withdrawal, this.addEventListenerHandle);
  }

  addEventListenerHandle = ({ detail: { method } }) => {
    const { enchashmentApplyFetch, form } = this.props;

    switch (method) {
      case 'userAddDetailInfo':
        form.validateFields((error, value) => {
          if (error === null) {
            // 提交
            const { amount } = value;
            enchashmentApplyFetch({
              amount,
              screen: SCREENS.Withdrawal,
            });
          } else {
            Toast.info(error[Object.keys(error)[0]].errors[0].message, 1);
          }
        });
        break;

      case 'enchashmentApply':
        Modal.alert('', i18n.withdrawnSuccess, [
          {
            text: i18n.confirm,
            style: 'default',
            onPress: () => {
              router.go(-1);
            },
          },
        ]);
        break;

      default:
        break;
    }
  };

  submit = () => {
    const { form, userAddDetailInfoFetch, balance } = this.props;
    form.validateFields((error, value) => {
      if (error === null) {
        // 提交
        const {
          amount,
          bank_card_no,
          bank_deposit,
          bank_name,
          username,
        } = value;

        if (parseInt(amount, 10) <= balance) {
          userAddDetailInfoFetch({
            usernameP: username,
            bank_name,
            bank_deposit,
            bank_card_no,
            screen: SCREENS.Withdrawal,
          });
        } else {
          Modal.alert('', i18n.insufficientAmount, [
            {
              text: i18n.confirm,
              style: 'default',
              onPress: () => {},
            },
          ]);
        }
      } else {
        Toast.info(error[Object.keys(error)[0]].errors[0].message, 1);
      }
    });
  };

  render() {
    const { actuallyReceived } = this.state;
    const {
      form: { getFieldProps },
      authUser,
      enchashmentConfigLoading,
      enchashmentApplyLoading,
      enchashmentLoading,
      userCertificateInfoLoading,
      addDetailInfoLoading,
      feeRate,
    } = this.props;

    return (
      <View>
        {(enchashmentConfigLoading ||
          addDetailInfoLoading ||
          enchashmentLoading ||
          userCertificateInfoLoading ||
          enchashmentApplyLoading) && <Loader />}
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          i18n={i18n}
          router={router}
          SCREENS={SCREENS}
        />
        <View
          style={{
            paddingLeft: SIDEINTERVAL,
            paddingRight: SIDEINTERVAL,
          }}
          className={styles.main}
        >
          <View className={styles.item}>
            <View className={styles.itemTitle}>{i18n.actualName}</View>
            <InputRight
              getFieldProps={getFieldProps}
              className={styles.inputStyle}
              styleWrap={{
                paddingLeft: 0,
                paddingRight: 0,
              }}
              styleInput={{
                margin: 0,
                fontSize: 16,
                color: '#4D4D4D',
                paddingTop: 10,
                paddingBottom: 10,
              }}
              placeholder={i18n.enterHere}
              message={i18n.actualName}
              name="username"
              type="text"
            />
          </View>
          <View className={styles.item}>
            <View className={styles.itemTitle}>{i18n.bankName}</View>
            <InputRight
              getFieldProps={getFieldProps}
              className={styles.inputStyle}
              styleWrap={styles.inputStyleWrap}
              styleInput={styles.inputstyleInput}
              placeholder={i18n.enterHere}
              message={i18n.bankName}
              name="bank_name"
              type="text"
            />
          </View>
          <View className={styles.item}>
            <View className={styles.itemTitle}>{i18n.bankBranch}</View>
            <InputRight
              getFieldProps={getFieldProps}
              className={styles.inputStyle}
              styleWrap={styles.inputStyleWrap}
              styleInput={styles.inputstyleInput}
              placeholder={i18n.enterHere}
              message={i18n.bankBranch}
              name="bank_deposit"
              type="text"
            />
          </View>
          <View className={styles.item}>
            <View className={styles.itemTitle}>{i18n.accountNumber}</View>
            <InputRight
              getFieldProps={getFieldProps}
              className={styles.inputStyle}
              styleWrap={styles.inputStyleWrap}
              styleInput={styles.inputstyleInput}
              placeholder={i18n.enterHere}
              message={i18n.accountNumber}
              name="bank_card_no"
              type="number"
            />
          </View>
          <View className={styles.item}>
            <View className={styles.itemTitle}>{i18n.amountWithdrawn}</View>
            <InputRight
              onChange={e => {
                this.setState({
                  actuallyReceived: parseInt(
                    e.target.value * (1 - feeRate),
                    10,
                  ),
                });
              }}
              // value={actuallyReceived}
              inputRight={<View>{MONETARY}</View>}
              getFieldProps={getFieldProps}
              className={styles.inputStyle}
              styleWrap={styles.inputStyleWrap}
              styleInput={styles.inputstyleInput}
              placeholder={i18n.enterHere}
              message={i18n.amountWithdrawn}
              name="amount"
              type="number"
            />
          </View>
        </View>
        <View className={styles.info}>
          <NavBar2
            valueLeft={i18n.serviceFee}
            valueMiddle={`- ${feeRate * 100}%`}
            isShowRight={false}
          />
          <NavBar2
            valueLeft={i18n.amountActuallyReceived}
            valueMiddle={actuallyReceived}
            isShowRight={false}
          />
        </View>
        <View
          style={{
            paddingLeft: SIDEINTERVAL,
            paddingRight: SIDEINTERVAL,
          }}
          className={styles.submit}
          onClick={this.submit}
        >
          <View className={styles.submitButton}>{i18n.confirm}</View>
        </View>
      </View>
    );
  }
}

export default connect(
  (state, props) => {
    const {
      enchashmentConfig,
      enchashmentGetList,
      enchashmentApply,
      userAddDetailInfo,
      userCertificateInfo,
    } = state;
    return {
      enchashmentConfigLoading: enchashmentConfig.loading,
      enchashmentApplyLoading: enchashmentApply.loading,
      addDetailInfoLoading: userAddDetailInfo.loading,
      enchashmentLoading: enchashmentGetList.loading,
      userCertificateInfoLoading: userCertificateInfo.loading,
      // limit: enchashmentConfig.limit || '',
      feeRate: enchashmentConfig.feeRate
        ? parseFloat(enchashmentConfig.feeRate)
        : 0,
      authUser: getLoginUser(state, props),
      enchashmentGetList: enchashmentGetList.item,
      balance: enchashmentGetList.item ? enchashmentGetList.item.balance : 0,
    };
  },
  {
    ...enchashmentConfigActionCreators,
    ...enchashmentApplyActionCreators,
    ...userAddDetailInfoActionCreators,
    ...enchashmentGetListActionCreators,
    ...userCertificateInfoActionCreators,
  },
)(createForm()(LoginForm));

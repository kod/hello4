/* eslint-disable camelcase */
import React from 'react';
import { Toast, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
import { SCREENS, SIDEINTERVAL, MONETARY } from '@/common/constants';
import InputRight from '@/components/InputRight';
import NavBar2 from '@/components/NavBar2';

import * as enchashmentConfigActionCreators from '@/common/actions/enchashmentConfig';
import * as enchashmentApplyActionCreators from '@/common/actions/enchashmentApply';
import * as userAddDetailInfoActionCreators from '@/common/actions/userAddDetailInfo';
import * as userCertificateInfoActionCreators from '@/common/actions/userCertificateInfo';
import * as enchashmentGetListActionCreators from '@/common/actions/enchashmentGetList';
import { FONT_SIZE_FIRST, FONT_SIZE_THIRD } from '@/styles/variables';
import MustLogin from '@/components/MustLogin';
import { addEventListenerBuyoo, removeEventListenerBuyoo } from '@/utils';
import Loader from '@/components/Loader';
import { getLoginUser } from '@/common/selectors';

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
        Modal.alert('', formatMessage({ id: 'withdrawnSuccess' }), [
          {
            text: formatMessage({ id: 'confirm' }),
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
          Modal.alert('', formatMessage({ id: 'insufficientAmount' }), [
            {
              text: formatMessage({ id: 'confirm' }),
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
    const styles = {
      container: {},
      main: {
        paddingTop: 15,
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        backgroundColor: '#fff',
      },
      item: {
        marginBottom: 15,
      },
      itemTitle: {
        fontSize: FONT_SIZE_FIRST,
        color: '#9B9B9B',
      },
      inputStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
      },
      inputStyleWrap: {
        // marginBottom: 50,
        paddingLeft: 0,
        paddingRight: 0,
      },
      inputstyleInput: {
        margin: 0,
        fontSize: FONT_SIZE_THIRD,
        color: '#4D4D4D',
        paddingTop: 10,
        paddingBottom: 10,
      },
      info: {
        backgroundColor: '#fff',
      },
      submit: {
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 15,
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      },
      submitButton: {
        height: 45,
        lineHeight: '45px',
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 3,
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundImage:
          'url(https://oss.buyoo.vn/buyoo_vip/usercollect/1/20181224174458_40M.png)',
      },
    };

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
      <div style={styles.container}>
        {(enchashmentConfigLoading ||
          addDetailInfoLoading ||
          enchashmentLoading ||
          userCertificateInfoLoading ||
          enchashmentApplyLoading) && <Loader />}
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          formatMessage={formatMessage}
          router={router}
          SCREENS={SCREENS}
        />
        <div style={styles.main}>
          <div style={styles.item}>
            <div style={styles.itemTitle}>
              {formatMessage({ id: 'actualName' })}
            </div>
            <InputRight
              getFieldProps={getFieldProps}
              style={styles.inputStyle}
              styleWrap={styles.inputStyleWrap}
              styleInput={styles.inputstyleInput}
              placeholder={formatMessage({ id: 'enterHere' })}
              message={formatMessage({ id: 'actualName' })}
              name="username"
              type="text"
            />
          </div>
          <div style={styles.item}>
            <div style={styles.itemTitle}>
              {formatMessage({ id: 'bankName' })}
            </div>
            <InputRight
              getFieldProps={getFieldProps}
              style={styles.inputStyle}
              styleWrap={styles.inputStyleWrap}
              styleInput={styles.inputstyleInput}
              placeholder={formatMessage({ id: 'enterHere' })}
              message={formatMessage({ id: 'bankName' })}
              name="bank_name"
              type="text"
            />
          </div>
          <div style={styles.item}>
            <div style={styles.itemTitle}>
              {formatMessage({ id: 'bankBranch' })}
            </div>
            <InputRight
              getFieldProps={getFieldProps}
              style={styles.inputStyle}
              styleWrap={styles.inputStyleWrap}
              styleInput={styles.inputstyleInput}
              placeholder={formatMessage({ id: 'enterHere' })}
              message={formatMessage({ id: 'bankBranch' })}
              name="bank_deposit"
              type="text"
            />
          </div>
          <div style={styles.item}>
            <div style={styles.itemTitle}>
              {formatMessage({ id: 'accountNumber' })}
            </div>
            <InputRight
              getFieldProps={getFieldProps}
              style={styles.inputStyle}
              styleWrap={styles.inputStyleWrap}
              styleInput={styles.inputstyleInput}
              placeholder={formatMessage({ id: 'enterHere' })}
              message={formatMessage({ id: 'accountNumber' })}
              name="bank_card_no"
              type="number"
            />
          </div>
          <div style={styles.item}>
            <div style={styles.itemTitle}>
              {formatMessage({ id: 'amountWithdrawn' })}
            </div>
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
              inputRight={<div>{MONETARY}</div>}
              getFieldProps={getFieldProps}
              style={styles.inputStyle}
              styleWrap={styles.inputStyleWrap}
              styleInput={styles.inputstyleInput}
              placeholder={formatMessage({ id: 'enterHere' })}
              message={formatMessage({ id: 'amountWithdrawn' })}
              name="amount"
              type="number"
            />
          </div>
        </div>
        <div style={styles.info}>
          <NavBar2
            valueLeft={formatMessage({ id: 'serviceFee' })}
            valueMiddle={`- ${feeRate * 100}%`}
            isShowRight={false}
          />
          <NavBar2
            valueLeft={formatMessage({ id: 'amountActuallyReceived' })}
            valueMiddle={actuallyReceived}
            isShowRight={false}
          />
        </div>
        <div style={styles.submit} onClick={this.submit}>
          <div style={styles.submitButton}>
            {formatMessage({ id: 'confirm' })}
          </div>
        </div>
      </div>
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

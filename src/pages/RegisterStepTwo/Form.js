import React from 'react';
import { List, Toast, Checkbox } from 'antd-mobile';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { formatMessage } from 'umi/locale';
import BYButton from '@/components/BYButton';
import { LOGIN_PASSWORD_EXPR } from '@/common/constants';
import InputRight from '@/components/InputRight';

import * as loginActionCreators from '@/common/actions/login';
import * as registerActionCreators from '@/common/actions/register';
import ReadSeconds from '@/components/ReadSeconds';

@connect(
  (state, props) => {
    const { login } = state;

    const {
      query: { mail = '' },
    } = props;

    return {
      auth: login,
      loading: login.loading,
      mail,
    };
  },
  {
    ...loginActionCreators,
    ...registerActionCreators,
  },
)
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReceive: true,
    };
  }

  submit = () => {
    const { isReceive } = this.state;
    const { form, mail, registerFetch } = this.props;
    form.validateFields((error, value) => {
      if (error === null) {
        // 提交
        const { otp, password, repassword } = value;
        if (password !== repassword) {
          Toast.info(formatMessage({ id: 'theWwoPasswordsAreNotSame' }), 1);
        } else {
          // 提交
          registerFetch({
            isReceive,
            otp,
            password,
            repassword,
            mail,
          });
        }
      } else {
        Toast.info(error[Object.keys(error)[0]].errors[0].message, 1);
      }
    });
  };

  render() {
    const { isReceive } = this.state;
    const {
      form: { getFieldProps },
      mail,
    } = this.props;
    return (
      <List>
        <InputRight
          inputRight={<ReadSeconds mail={mail} />}
          getFieldProps={getFieldProps}
          // styleWrap={{ marginBottom: 75 }}
          placeholder={formatMessage({ id: 'pleaseEnterSMSVerificationCode' })}
          message={formatMessage({ id: 'pleaseEnterSMSVerificationCode' })}
          name="otp"
          type="number"
        />
        <InputRight
          pattern={LOGIN_PASSWORD_EXPR}
          // inputRight={this.renderInputRight()}
          getFieldProps={getFieldProps}
          // styleWrap={{ marginBottom: 75 }}
          placeholder={formatMessage({
            id: 'pleaseEnter820CharactersOrNumbers',
          })}
          message={formatMessage({ id: 'pleaseEnter820CharactersOrNumbers' })}
          name="password"
          type="password"
        />
        <InputRight
          pattern={LOGIN_PASSWORD_EXPR}
          // inputRight={this.renderInputRight()}
          getFieldProps={getFieldProps}
          // styleWrap={{ marginBottom: 75 }}
          placeholder={formatMessage({ id: 'pleaseEnterPasswordAgain' })}
          message={formatMessage({ id: 'pleaseEnter820CharactersOrNumbers' })}
          name="repassword"
          type="password"
        />
        <div style={{ marginBottom: 50 }}>
          <Checkbox.AgreeItem
            checked={isReceive}
            onChange={e => {
              this.setState({
                isReceive: e.target.checked,
              });
            }}
          >
            {formatMessage({ id: 'receiveServicesOffers' })}
            {/* <a
                onClick={e => {
                  e.preventDefault();
                  alert('agree it');
                }}
              >
                agreement
              </a> */}
          </Checkbox.AgreeItem>
        </div>
        <BYButton
          text={formatMessage({ id: 'register' })}
          style={{ marginBottom: 30 }}
          onClick={this.submit}
        />
      </List>
    );
  }
}

export default createForm()(LoginForm);

import React from 'react';
import { List, Toast } from 'antd-mobile';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { formatMessage } from 'umi/locale';
import BYButton from '@/components/BYButton';
import { LOGIN_PASSWORD_EXPR, SCREENS } from '@/common/constants';
import InputRight from '@/components/InputRight';
import ReadSeconds from '@/components/ReadSeconds';

import * as changePasswordActionCreators from '@/common/actions/changePassword';

@connect(
  (state, props) => {
    const {
      query: { mail = '' },
    } = props;

    return {
      mail,
    };
  },
  {
    ...changePasswordActionCreators,
  },
)
class LoginForm extends React.Component {
  submit = () => {
    const { form, mail, changePasswordFetch } = this.props;
    form.validateFields((error, value) => {
      if (error === null) {
        // 提交
        const { otp, password, repassword } = value;
        if (password !== repassword) {
          Toast.info(formatMessage({ id: 'theWwoPasswordsAreNotSame' }), 1);
        } else {
          // 提交
          changePasswordFetch(mail, password, otp, SCREENS.ForgotPasswordTwo);
        }
      } else {
        Toast.info(error[Object.keys(error)[0]].errors[0].message, 1);
      }
    });
  };

  render() {
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
          placeholder={formatMessage({ id: 'pleaseEnterVerificationCode' })}
          message={formatMessage({ id: 'pleaseEnterVerificationCode' })}
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
          styleWrap={{ marginBottom: 75 }}
          placeholder={formatMessage({ id: 'pleaseEnterPasswordAgain' })}
          message={formatMessage({ id: 'pleaseEnter820CharactersOrNumbers' })}
          name="repassword"
          type="password"
        />
        <BYButton
          text={formatMessage({ id: 'submit' })}
          style={{ marginBottom: 30 }}
          onClick={this.submit}
        />
      </List>
    );
  }
}

export default createForm()(LoginForm);

import React from 'react';
import { List, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import { i18n, View } from '@src/API';
import BYButton from '@src/components/BYButton';
import {
  LOGIN_PASSWORD_EXPR,
  SCREENS,
  SIDEINTERVAL,
} from '@src/common/constants';
import InputRight from '@src/components/InputRight';
import ReadSeconds from '@src/components/ReadSeconds';

import * as changePasswordActionCreators from '@src/common/actions/changePassword';
import { FONT_COLOR_THIRD } from '@src/styles/variables';

class LoginForm extends React.Component {
  submit = () => {
    const { form, mail, changePasswordFetch } = this.props;
    form.validateFields((error, value) => {
      if (error === null) {
        // 提交
        const { otp, password, repassword } = value;
        if (password !== repassword) {
          Toast.info(i18n.theWwoPasswordsAreNotSame, 1);
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
          // styleWrap={{ margin-bottom: 75 }}
          placeholder={i18n.pleaseEnterVerificationCode}
          message={i18n.pleaseEnterVerificationCode}
          name="otp"
          type="number"
        />
        <InputRight
          pattern={LOGIN_PASSWORD_EXPR}
          // inputRight={this.renderInputRight()}
          getFieldProps={getFieldProps}
          // styleWrap={{ margin-bottom: 75 }}
          placeholder={i18n.pleaseEnter820CharactersOrNumbers}
          message={i18n.pleaseEnter820CharactersOrNumbers}
          name="password"
          type="password"
        />
        <InputRight
          pattern={LOGIN_PASSWORD_EXPR}
          // inputRight={this.renderInputRight()}
          getFieldProps={getFieldProps}
          // styleWrap={{ margin-bottom: 75 }}
          placeholder={i18n.pleaseEnterPasswordAgain}
          message={i18n.pleaseEnter820CharactersOrNumbers}
          name="repassword"
          type="password"
        />
        <View
          style={{
            paddingTop: 10,
            paddingBottom: 5,
            paddingLeft: SIDEINTERVAL,
            paddingRight: SIDEINTERVAL,
            fontSize: 11,
            color: FONT_COLOR_THIRD,
            marginBottom: 50,
          }}
        >
          {i18n.emailCodeTips}
        </View>
        <BYButton
          text={i18n.submit}
          style={{ marginBottom: 30 }}
          onClick={this.submit}
        />
      </List>
    );
  }
}

export default connect(
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
)(createForm()(LoginForm));

import React from 'react';
import { List, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import { i18n } from '@src/API';
import BYButton from '@src/components/BYButton';
import { EMAIL_EXPR, SCREENS } from '@src/common/constants';
import InputRight from '@src/components/InputRight';
import InputCountry from '@src/components/InputCountry';

import * as loginActionCreators from '@src/common/actions/login';

class LoginForm extends React.Component {
  componentDidMount() {
    // this.autoFocusInst.focus();
  }

  submit = () => {
    const { form, loginFetch } = this.props;
    form.validateFields((error, value) => {
      if (error === null) {
        // 提交
        const { mail, password } = value;
        loginFetch({ mail, password, screen: SCREENS.Login });
      } else {
        Toast.info(error[Object.keys(error)[0]].errors[0].message, 1);
      }
    });
  };

  render() {
    const {
      form: { getFieldProps },
    } = this.props;
    return (
      <List>
        <InputCountry
          pattern={EMAIL_EXPR}
          getFieldProps={getFieldProps}
          placeholder={i18n.pleaseEnterYourEmailAddress}
          message={i18n.failedEMailPleaseReEnter}
        />
        <InputRight
          // inputRight={this.renderInputRight()}
          getFieldProps={getFieldProps}
          styleWrap={{ marginBottom: 75 }}
          placeholder={i18n.pleaseEnterThePassword}
          message={i18n.pleaseEnterThePassword}
          name="password"
          type="password"
        />
        <BYButton
          text={i18n.login}
          style={{ marginBottom: 30 }}
          onClick={this.submit}
        />
      </List>
    );
  }
}

export default connect(
  state => {
    const { login } = state;
    return {
      auth: login,
    };
  },
  {
    ...loginActionCreators,
  },
)(createForm()(LoginForm));

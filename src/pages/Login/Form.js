import React from 'react';
import { List, Toast } from 'antd-mobile';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { formatMessage } from 'umi/locale';
import BYButton from '@/components/BYButton';
import { EMAIL_EXPR, SCREENS } from '@/common/constants';
import InputRight from '@/components/InputRight';
import InputCountry from '@/components/InputCountry';

import * as loginActionCreators from '@/common/actions/login';

@connect(
  state => {
    const { login } = state;
    return {
      auth: login,
      loading: login.loading,
      // auth: state.login,
    };
  },
  {
    ...loginActionCreators,
  },
)
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
          placeholder={formatMessage({ id: 'pleaseEnterYourEmailAddress' })}
          message={formatMessage({ id: 'failedEMailPleaseReEnter' })}
        />
        <InputRight
          // inputRight={this.renderInputRight()}
          getFieldProps={getFieldProps}
          styleWrap={{ marginBottom: 75 }}
          placeholder={formatMessage({ id: 'pleaseEnterThePassword' })}
          message={formatMessage({ id: 'pleaseEnterThePassword' })}
          name="password"
          type="password"
        />
        <BYButton
          text={formatMessage({ id: 'login' })}
          style={{ marginBottom: 30 }}
          onClick={this.submit}
        />
      </List>
    );
  }
}

export default createForm()(LoginForm);

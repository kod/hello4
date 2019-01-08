import React from 'react';
import { List, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { i18n } from '@src/API';
import router from 'umi/lib/router';
import BYButton from '@src/components/BYButton';
import { EMAIL_EXPR } from '@src/common/constants';
// import InputRight from '@src/components/InputRight';
import InputCountry from '@src/components/InputCountry';

// import * as loginActionCreators from '@src/common/actions/login';

class LoginForm extends React.Component {
  componentDidMount() {
    // this.autoFocusInst.focus();
  }

  submit = () => {
    const { form } = this.props;
    form.validateFields((error, value) => {
      if (error === null) {
        // 提交
        const { mail } = value;
        router.push(`/OauthBindMailTwo?mail=${mail}`);
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
          styleWrap={{ marginBottom: 30 }}
          pattern={EMAIL_EXPR}
          getFieldProps={getFieldProps}
          placeholder={i18n.pleaseEnterYourEmailAddress}
          message={i18n.failedEMailPleaseReEnter}
        />
        {/* <InputRight
          // inputRight={this.renderInputRight()}
          getFieldProps={getFieldProps}
          styleWrap={{ marginBottom: 75 }}
          style={{ backgroundColor: '#E0E3EF', borderBottomWidth: 0 }}
          styleInput={{ backgroundColor: '#E0E3EF' }}
          placeholder={i18n.pleaseEnterInvitationCode}
          message={i18n.pleaseEnterThePassword}
          name="inviterno"
          type="text"
          required={false}
        /> */}
        <BYButton
          text={i18n.nextStep}
          style={{ marginBottom: 20 }}
          onClick={this.submit}
        />
      </List>
    );
  }
}

export default createForm()(LoginForm);

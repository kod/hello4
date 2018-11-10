import React from 'react';
import { List, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
import BYButton from '@/components/BYButton';
import { EMAIL_EXPR } from '@/common/constants';
// import InputRight from '@/components/InputRight';
import InputCountry from '@/components/InputCountry';

// import * as loginActionCreators from '@/common/actions/login';

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
        router.push(`/RegisterStepTwo?mail=${mail}`);
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
          placeholder={formatMessage({ id: 'pleaseEnterYourEmailAddress' })}
          message={formatMessage({ id: 'failedEMailPleaseReEnter' })}
        />
        {/* <InputRight
          // inputRight={this.renderInputRight()}
          getFieldProps={getFieldProps}
          styleWrap={{ marginBottom: 75 }}
          style={{ backgroundColor: '#E0E3EF', borderBottomWidth: 0 }}
          styleInput={{ backgroundColor: '#E0E3EF' }}
          placeholder={formatMessage({ id: 'pleaseEnterInvitationCode' })}
          message={formatMessage({ id: 'pleaseEnterThePassword' })}
          name="inviterno"
          type="text"
          required={false}
        /> */}
        <BYButton
          text={formatMessage({ id: 'nextStep' })}
          style={{ marginBottom: 20 }}
          onClick={this.submit}
        />
      </List>
    );
  }
}

export default createForm()(LoginForm);

import React from 'react';
import { List, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
import qs from 'qs';

import BYButton from '@src/components/BYButton';
import { EMAIL_EXPR } from '@src/common/constants';
import InputCountry from '@src/components/InputCountry';

class LoginForm extends React.Component {
  submit = () => {
    const { form, title } = this.props;
    form.validateFields((error, value) => {
      if (error === null) {
        // 提交
        const { mail } = value;
        router.push(
          `/ForgotPasswordTwo?${qs.stringify({
            mail,
            title,
          })}`,
        );
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
          styleWrap={{ marginBottom: 70 }}
          pattern={EMAIL_EXPR}
          getFieldProps={getFieldProps}
          placeholder={formatMessage({ id: 'pleaseEnterYourEmailAddress' })}
          message={formatMessage({ id: 'failedEMailPleaseReEnter' })}
        />
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

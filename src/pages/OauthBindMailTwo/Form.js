import React from 'react';
import { List, Toast, Checkbox } from 'antd-mobile';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import { i18n } from '@src/API';
import BYButton from '@src/components/BYButton';
import { SIDEINTERVAL, SCREENS } from '@src/common/constants';
import InputRight from '@src/components/InputRight';

import * as loginActionCreators from '@src/common/actions/login';
import * as registerActionCreators from '@src/common/actions/register';
import ReadSeconds from '@src/components/ReadSeconds';
import { FONT_COLOR_THIRD } from '@src/styles/variables';

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
        const pwdRandom = parseInt(Math.random() * 100000000, 10);
        const {
          otp,
          password = `buyooVip${pwdRandom}`,
          repassword = `buyooVip${pwdRandom}`,
        } = value;

        if (password !== repassword) {
          Toast.info(i18n.theWwoPasswordsAreNotSame, 1);
        } else {
          // 提交
          registerFetch({
            isReceive,
            otp,
            password,
            repassword,
            mail,
            screen: SCREENS.OauthBindMailTwo,
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
          placeholder={i18n.pleaseEnterVerificationCode}
          message={i18n.pleaseEnterVerificationCode}
          name="otp"
          type="number"
        />
        <div
          style={{
            paddingTop: 10,
            paddingBottom: 5,
            paddingLeft: SIDEINTERVAL,
            paddingRight: SIDEINTERVAL,
            fontSize: 11,
            color: FONT_COLOR_THIRD,
          }}
        >
          {i18n.emailCodeTips}
        </div>
        <div style={{ marginBottom: 50 }}>
          <Checkbox.AgreeItem
            checked={isReceive}
            onChange={e => {
              this.setState({
                isReceive: e.target.checked,
              });
            }}
          >
            {i18n.receiveServicesOffers}
          </Checkbox.AgreeItem>
        </div>
        <BYButton
          text={i18n.confirm}
          style={{ marginBottom: 30 }}
          onClick={this.submit}
        />
      </List>
    );
  }
}

export default connect(
  (state, props) => {
    const { login } = state;

    const {
      query: { mail = '' },
    } = props;

    return {
      auth: login,
      mail,
    };
  },
  {
    ...loginActionCreators,
    ...registerActionCreators,
  },
)(createForm()(LoginForm));

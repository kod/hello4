import React from 'react';
import { connect } from 'react-redux';
import { i18n, View } from '@src/API';

import * as otpActionCreators from '@src/common/actions/otp';

import { WINDOW_WIDTH, VERIFICATION_CODE_SECONDS } from '@src/common/constants';

const styles = {
  second: {
    display: 'flex',
    height: 20,
    minWidth: WINDOW_WIDTH * 0.1,
    paddingLeft: WINDOW_WIDTH * 0.02,
    paddingRight: WINDOW_WIDTH * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#0076F7',
    marginRight: 1,
  },
  secondText: {
    color: '#0076F7',
    fontSize: 11,
  },
};

class ReadSeconds extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      ing: false,
    };
  }

  componentDidMount() {
    this.readSeconds();
  }

  componentWillUnmount() {
    clearTimeout(this.setTimeoutID);
  }

  async readSeconds() {
    const { ing } = this.state;
    const { otpFetch, mail } = this.props;

    if (ing === false) {
      otpFetch(mail);
      await this.setState({
        seconds: VERIFICATION_CODE_SECONDS,
        ing: true,
      });
    }
    const { seconds } = this.state;
    if (seconds > 0) {
      this.setTimeoutID = setTimeout(async () => {
        await this.setState({
          seconds: seconds - 1,
        });
        this.readSeconds();
      }, 1000);
    } else {
      await this.setState({
        ing: false,
      });
    }
  }

  handleOnPressSeconds() {
    const { ing } = this.state;
    if (ing) return false;
    return this.readSeconds();
  }

  render() {
    const { ing, seconds } = this.state;

    const { ...restProps } = this.props;

    return (
      <View style={styles.second}>
        <View
          style={styles.secondText}
          onClick={() => this.handleOnPressSeconds()}
          {...restProps}
        >
          {ing ? seconds : i18n.sendCode}
        </View>
      </View>
    );
  }
}

export default connect(
  (state, props) => {
    const { mail } = props;
    return {
      mail,
    };
  },
  {
    ...otpActionCreators,
  },
)(ReadSeconds);

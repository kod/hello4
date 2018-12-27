import React from 'react';
import { connect } from 'react-redux';
import { formatMessage } from 'umi/locale';

import * as otpActionCreators from '@/common/actions/otp';

import { WINDOW_WIDTH } from '@/common/constants';

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
        seconds: 30,
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
      <div style={styles.second}>
        <div
          style={styles.secondText}
          onClick={() => this.handleOnPressSeconds()}
          {...restProps}
        >
          {ing ? seconds : formatMessage({ id: 'sendCode' })}
        </div>
      </div>
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

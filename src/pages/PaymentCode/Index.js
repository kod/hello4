/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import BYHeader from '@src/components/BYHeader';
import { formatMessage } from 'umi-plugin-locale';

import Loader from '@src/components/Loader';
import router from 'umi/router';
import { Modal } from 'antd-mobile';

import * as orderPayActionCreators from '@src/common/actions/orderPay';
import {
  BACKGROUND_COLOR_THIRD,
  BACKGROUND_COLOR_PRIMARY,
  FONT_SIZE_SIXTH,
  FONT_COLOR_FIFTH,
  FONT_SIZE_FIRST,
  FONT_COLOR_PRIMARY,
} from '@src/styles/variables';
import {
  SIDEINTERVAL,
  WINDOW_WIDTH,
  SCREENS,
  MONETARY,
  PAYOO_STORE_MAP,
} from '@src/common/constants';
// import SmallButton from '@src/components/SmallButton';
import priceFormat from '@src/utils/priceFormat';
import MustLogin from '@src/components/MustLogin';
import { addEventListenerBuyoo, removeEventListenerBuyoo } from '@src/utils';
import { getLoginUser } from '@src/common/selectors';

const icStore1 = 'https://oss.buyoo.vn/usercollect/1/20181121153540_gOd.jpg';
const icStore2 = 'https://oss.buyoo.vn/usercollect/1/20181121153705_f57.jpg';
const icStore3 = 'https://oss.buyoo.vn/usercollect/1/20181121153738_5u9.jpg';
const icStore4 = 'https://oss.buyoo.vn/usercollect/1/20181121153758_74g.jpg';
const icStore5 = 'https://oss.buyoo.vn/usercollect/1/20181121153818_JD3.jpg';
const icStore6 = 'https://oss.buyoo.vn/usercollect/1/20181121153849_c4D.jpg';
const icStore7 = 'https://oss.buyoo.vn/usercollect/1/20181121153908_968.jpg';
const icStore8 = 'https://oss.buyoo.vn/usercollect/1/20181121153929_4k1.jpg';
const icStore9 = 'https://oss.buyoo.vn/usercollect/1/20181121153948_212.jpg';
const icStore10 = 'https://oss.buyoo.vn/usercollect/1/20181121154006_7H4.jpg';
const icStore11 = 'https://oss.buyoo.vn/usercollect/1/20181121154022_N0g.jpg';
const icStore12 = 'https://oss.buyoo.vn/usercollect/1/20181121154050_S1q.jpg';
const icStore13 = 'https://oss.buyoo.vn/usercollect/1/20181121154110_Xk0.jpg';
const icStore14 = 'https://oss.buyoo.vn/usercollect/1/20181121154141_880.jpg';
const icStore15 = 'https://oss.buyoo.vn/usercollect/1/20181121154159_w98.jpg';
const icStore16 = 'https://oss.buyoo.vn/usercollect/1/20181121154214_L80.jpg';
const icStore17 = 'https://oss.buyoo.vn/usercollect/1/20181121154232_6Bc.jpg';
const icStore18 = 'https://oss.buyoo.vn/usercollect/1/20181121154248_182.jpg';

const styles = {
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR_THIRD,
  },
  row1: {
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    marginBottom: 10,
  },
  row2: {
    backgroundColor: BACKGROUND_COLOR_PRIMARY,
    paddingTop: 20,
    marginBottom: 15,
  },
  row2Top: {
    fontSize: FONT_SIZE_SIXTH,
    color: FONT_COLOR_FIFTH,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 5,
  },
  row2Bottom: {
    fontSize: FONT_SIZE_FIRST,
    color: FONT_COLOR_FIFTH,
    textAlign: 'center',
    paddingBottom: 35,
  },
  row3: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: SIDEINTERVAL,
  },
  row3Image: {
    width: (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3,
    height: 45,
    marginRight: SIDEINTERVAL,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  row4: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    marginBottom: 15,
    color: FONT_COLOR_PRIMARY,
  },
};

class PaymentCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        icStore1,
        icStore2,
        icStore3,
        icStore4,
        icStore5,
        icStore6,
        icStore7,
        icStore8,
        icStore9,
        icStore10,
        icStore11,
        icStore12,
        icStore13,
        icStore14,
        icStore15,
        icStore16,
        icStore17,
        icStore18,
      ],
    };
    this.addEventListenerPopstate = this.addEventListenerPopstate.bind(this);
  }

  componentDidMount() {
    const {
      orderPayFetch,
      orderPayClear,
      orderno,
      tradeno,
      payway,
      payrate,
      repaymentmonth,
      payvalue,
      authUser,
      locationPathname,
      locationSearch,
    } = this.props;

    router.push(`${locationPathname}${locationSearch}#123`);
    addEventListenerBuyoo('popstate', this.addEventListenerPopstate);

    if (authUser && orderno && tradeno) {
      orderPayClear();
      orderPayFetch({
        orderno,
        tradeno,
        payway,
        paypassword: '',
        payrate,
        repaymentmonth,
        payvalue,
        screen: SCREENS.PaymentCode,
      });
    }
  }

  componentWillUnmount() {
    removeEventListenerBuyoo('popstate', this.addEventListenerPopstate);
  }

  addEventListenerPopstate = () => {
    const { from } = this.props;
    switch (from) {
      case SCREENS.Pay:
        router.go(-3);
        break;

      default:
        router.go(-1);
        break;
    }
  };

  async handleOnPressCopy() {
    const { authUser } = this.props;

    if (authUser) {
      // Clipboard.setString(val);
      Modal.alert('', formatMessage({ id: 'successfulCopy' }), [
        {
          text: formatMessage({ id: 'confirm' }),
          style: 'default',
          onPress: () => {},
        },
      ]);
    }
  }

  renderContent() {
    const { images } = this.state;
    const { code, payvalue } = this.props;

    return (
      <div>
        <div style={styles.row1}>
          <div style={styles.row1Left}>
            {formatMessage({ id: 'payooPaymentCode' })}
          </div>
          {/* <SmallButton
            text={formatMessage({ id: 'copy' })}
            onClick={() => this.handleOnPressCopy(code)}
          /> */}
        </div>
        <div style={styles.row2}>
          <div style={styles.row2Top}>{code}</div>
          <div style={styles.row2Bottom}>
            {`${formatMessage({ id: 'orderAmount' })} ${priceFormat(
              payvalue,
            )} ${MONETARY}`}
          </div>
        </div>
        <div
          style={styles.row4}
          onClick={() => {
            window.location.href = PAYOO_STORE_MAP;
          }}
        >
          {formatMessage({ id: 'visitPayooStoreClickHere' })}
        </div>
        <div style={styles.row3}>
          {images.map((val, key) => (
            <img alt="" style={styles.row3Image} src={`${val}`} key={key} />

            // <Image style={styles.row3Image} source={val} key={key} />
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { authUser, loading } = this.props;
    return (
      <div style={styles.container}>
        <BYHeader title={formatMessage({ id: 'payooPaymentCode' })} />
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          formatMessage={formatMessage}
          router={router}
          SCREENS={SCREENS}
        />
        {loading && <Loader />}
        {this.renderContent()}
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    const { orderPay } = state;

    const {
      location: {
        pathname: locationPathname,
        search: locationSearch,
        query: {
          orderNo,
          tradeNo,
          payway,
          payrate,
          repaymentmonth,
          totalAmount,
          code,
          from,
        },
      },
    } = props;

    return {
      orderno: orderNo,
      tradeno: tradeNo,
      locationPathname,
      locationSearch,
      from,
      payway,
      payrate,
      repaymentmonth,
      code: code || orderPay.ret,
      loading: orderPay.loading,
      payvalue: totalAmount,
      authUser: getLoginUser(state, props),
    };
  },
  {
    ...orderPayActionCreators,
  },
)(PaymentCode);

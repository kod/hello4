/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import BYHeader from '@src/components/BYHeader';
import { i18n, View } from '@src/API';

import Loader from '@src/components/Loader';
import router from 'umi/lib/router';
import { Modal } from 'antd-mobile';

import * as orderPayActionCreators from '@src/common/actions/orderPay';
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

import styles from './index.less';

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
      Modal.alert('', i18n.successfulCopy, [
        {
          text: i18n.confirm,
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
      <View>
        <View
          style={{
            paddingLeft: SIDEINTERVAL,
            paddingRight: SIDEINTERVAL,
          }}
          className={styles.row1}
        >
          <View>{i18n.payooPaymentCode}</View>
          {/* <SmallButton
            text={i18n.copy}
            onClick={() => this.handleOnPressCopy(code)}
          /> */}
        </View>
        <View className={styles.row2}>
          <View className={styles.row2Top}>{code}</View>
          <View className={styles.row2Bottom}>
            {`${i18n.orderAmount} ${priceFormat(payvalue)} ${MONETARY}`}
          </View>
        </View>
        <View
          style={{
            paddingLeft: SIDEINTERVAL,
            paddingRight: SIDEINTERVAL,
          }}
          className={styles.row4}
          onClick={() => {
            window.location.href = PAYOO_STORE_MAP;
          }}
        >
          {i18n.visitPayooStoreClickHere}
        </View>
        <View
          style={{
            paddingLeft: SIDEINTERVAL,
          }}
          className={styles.row3}
        >
          {images.map((val, key) => (
            <img
              alt=""
              style={{
                width: (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3,
                marginRight: SIDEINTERVAL,
              }}
              className={styles.row3Image}
              src={`${val}`}
              key={key}
            />

            // <Image style={styles.row3Image} source={val} key={key} />
          ))}
        </View>
      </View>
    );
  }

  render() {
    const { authUser, loading } = this.props;
    return (
      <View className={styles.container}>
        <BYHeader title={i18n.payooPaymentCode} />
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          i18n={i18n}
          router={router}
          SCREENS={SCREENS}
        />
        {loading && <Loader />}
        {this.renderContent()}
      </View>
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

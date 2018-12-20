/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
import { Modal } from 'antd-mobile';

import BYHeader from '@/components/BYHeader';
import Loader from '@/components/Loader';

import * as getVoucherActionCreators from '@/common/actions/getVoucher';
import * as receiveVoucherActionCreators from '@/common/actions/receiveVoucher';
import * as modalActionCreators from '@/common/actions/modal';
import {
  SCREENS,
  RECEIVEVOUCHER_NAMESPACE,
  GETVOUCHER_NAMESPACE,
  WINDOW_HEIGHT,
  BUYOO,
  WINDOW_WIDTH,
  SIDEINTERVAL,
} from '@/common/constants';
import EmptyState from '@/components/EmptyState';

import CouponItem from '@/components/CouponItem';
import { RECEIVE_VOUCHER, GET_VOUCHER } from '@/common/constants/actionTypes';
import { o } from '@/utils/AuthEncrypt';
import { localStorageGetItem } from '@/utils';
import {
  FONT_COLOR_FIFTH,
  BACKGROUND_COLOR_THIRD,
  FONT_SIZE_FIRST,
} from '@/styles/variables';
import CustomIcon from '@/components/CustomIcon';

const ouhrigdfnjsoeijehrJpg =
  'https://oss.buyoo.vn/usercollect/1/20181101180309_67w.jpg';

class Withdraw extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.handlerOnPress = this.handlerOnPress.bind(this);
  // }

  // componentDidMount() {
  //   const { getVoucherFetch } = this.props;
  //   getVoucherFetch();
  // }

  renderBackground() {
    const { items } = this.props;
    const styles = {
      container: {
        position: 'absolute',
        zIndex: -10,
        top: 0,
        left: 0,
        right: 0,
        width: WINDOW_WIDTH,
        height: 190,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage:
          'url(https://oss.buyoo.vn/buyoo_vip/usercollect/1/20181220102322_44H.jpg)',
      },
    };

    return <div style={styles.container} />;
  }

  renderCard() {
    const { items } = this.props;
    const styles = {
      container: {
        position: 'absolute',
        top: 45,
        left: SIDEINTERVAL,
        right: SIDEINTERVAL,
      },
      main: {
        backgroundColor: BACKGROUND_COLOR_THIRD,
        borderRadius: 5,
        height: 153,
        boxShadow: '1px 0 5px rgba(0,0,0,.14), 0 6px 5px rgba(0,0,0,.14)',
      },
      row1: {
        display: 'flex',
        flexDivection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      },
      row1Icon: {
        fontSize: 24,
        marginRight: SIDEINTERVAL * 0.5,
      },
      row1Text: {
        fontSize: 16,
        fontWeight: '700',
        color: '#5E5E5E',
      },
      row2: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      },
      row2LeftTitle: {
        fontSize: FONT_SIZE_FIRST,
        color: '#9B9B9B',
        marginBottom: 5,
      },
      row2LeftPrice: {
        fontSize: FONT_SIZE_FIRST,
        color: '#FF424E',
        fontWeight: '700',
      },
    };
    return (
      <div style={styles.container}>
        <div style={styles.main}>
          <div style={styles.row1}>
            <CustomIcon type="Money" style={styles.row1Icon} />
            <div style={styles.row1Text}>Tiền hoa hồng</div>
          </div>
          <div style={styles.row2}>
            <div style={styles.row2Left}>
              <div style={styles.row2LeftTitle}>Tiền hoa hồng chưa nhận</div>
              <div style={styles.row2LeftPrice}>200.000 d</div>
            </div>
            <div style={styles.row2Right}>222</div>
          </div>
        </div>
      </div>
    );
  }

  renderContent() {
    const { items } = this.props;
    const styles = {
      container: {
        paddingTop: 190 - 45,
      },
      main: {
        backgroundColor: '#f2f2f2',
        minHeight: WINDOW_HEIGHT - 190,
      },
    };
    return (
      <div style={styles.container}>
        <div style={styles.main}>
          <div style={styles.row1}>22222</div>
        </div>
      </div>
    );
  }

  render() {
    const { items, loading, receiveVoucherLoading } = this.props;

    const styles = {
      container: {
        position: 'relative',
        // backgroundColor: '#fff',
      },
    };

    return (
      <div style={styles.container}>
        {receiveVoucherLoading && <Loader />}
        <BYHeader
          styleContainer={{
            backgroundColor: 'transparent',
            borderBottomWidth: 0,
          }}
          styleBack={{
            color: FONT_COLOR_FIFTH,
          }}
          styleTitle={{
            color: FONT_COLOR_FIFTH,
          }}
          title={formatMessage({ id: 'myBrokerage' })}
        />
        {this.renderBackground()}
        {this.renderCard()}
        {this.renderContent()}
      </div>
    );
  }
}

export default connect(
  state => {
    console.log(state);
    return {
      authUser: o(localStorageGetItem, BUYOO),
    };
  },
  {
    ...getVoucherActionCreators,
    ...receiveVoucherActionCreators,
    ...modalActionCreators,
  },
)(Withdraw);

/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { i18n, View } from '@src/API';
import router from 'umi/lib/router';
import { Modal } from 'antd-mobile';
import dayjs from 'dayjs';

import BYHeader from '@src/components/BYHeader';
import Loader from '@src/components/Loader';

import * as getInviteRecordActionCreators from '@src/common/actions/getInviteRecord';
import * as enchashmentGetListActionCreators from '@src/common/actions/enchashmentGetList';
import * as enchashmentConfigActionCreators from '@src/common/actions/enchashmentConfig';
import {
  SCREENS,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  SIDEINTERVAL,
  MONETARY,
} from '@src/common/constants';

import {
  FONT_COLOR_FIFTH,
  BACKGROUND_COLOR_THIRD,
  FONT_SIZE_FIRST,
} from '@src/styles/variables';
import CustomIcon from '@src/components/CustomIcon';
import MustLogin from '@src/components/MustLogin';
import priceFormat from '@src/utils/priceFormat';
import { getLoginUser } from '@src/common/selectors';

class Withdraw extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowIncome: true,
    };

    // this.handlerOnPress = this.handlerOnPress.bind(this);
  }

  componentDidMount() {
    const {
      getInviteRecordFetch,
      enchashmentGetListFetch,
      enchashmentConfigFetch,
      authUser,
    } = this.props;
    enchashmentConfigFetch();
    if (authUser) {
      getInviteRecordFetch();
      enchashmentGetListFetch();
    }
  }

  handleOnPressWithdraw() {
    const { limit, balance } = this.props;
    if (balance > limit) {
      router.push(`/${SCREENS.Withdrawal}`);
    } else {
      Modal.alert('', i18n.limitWithdrawnTips.replace('XXX', limit), [
        {
          text: i18n.confirm,
          style: 'default',
          // onPress: () => {},
        },
      ]);
    }
  }

  renderBackground = () => {
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

    return <View style={styles.container} />;
  };

  renderCard() {
    const { balance, enchashmentGetList } = this.props;
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
        display: 'flex',
        flexDivection: 'row',
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      },
      row2Left: {
        marginRight: WINDOW_WIDTH * 0.08,
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
        marginBottom: 10,
      },
      row2LeftButton: {
        display: 'inline-block',
        fontSize: 10,
        color: '#FF424E',
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: SIDEINTERVAL * 0.8,
        paddingRight: SIDEINTERVAL * 0.8,
        borderColor: '#FF424E',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 3,
      },
      row2RightTitle: {
        fontSize: FONT_SIZE_FIRST,
        color: '#9B9B9B',
        marginBottom: 5,
      },
      row2RightPrice: {
        fontSize: FONT_SIZE_FIRST,
        color: '#72BE20',
        fontWeight: '700',
      },
    };
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.row1}>
            <CustomIcon name="Money" type="Money" style={styles.row1Icon} />
            <View style={styles.row1Text}>{i18n.commission}</View>
          </View>
          <View style={styles.row2}>
            <View style={styles.row2Left}>
              <View style={styles.row2LeftTitle}>
                {i18n.commissionsNotReceived}
              </View>
              <View style={styles.row2LeftPrice}>
                {enchashmentGetList ? `${priceFormat(balance)} ${MONETARY}` : 0}
              </View>
              <View
                style={styles.row2LeftButton}
                onClick={() => this.handleOnPressWithdraw()}
              >
                {i18n.withdrawal}
              </View>
            </View>
            <View style={styles.row2Right}>
              <View style={styles.row2RightTitle}>
                {i18n.commissionsReceived}
              </View>
              <View style={styles.row2RightPrice}>
                {enchashmentGetList && enchashmentGetList.amountSum
                  ? `${priceFormat(enchashmentGetList.amountSum)} ${MONETARY}`
                  : 0}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderIncome() {
    const { getInviteRecord } = this.props;
    const styles = {
      incomeItem: {
        marginBottom: 5,
      },
      incomeDate: {
        paddingTop: 10,
        paddingBottom: 10,
        color: '#A6A6A6',
        fontSize: 10,
        marginBottom: 10,
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
      },
      incomeMain: {
        display: 'flex',
        flexDivection: 'row',
        justifyContent: 'space-between',
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#fff',
      },
      incomeTitle: {
        width: WINDOW_WIDTH * 0.55,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        color: '#848484',
      },
      incomePrice: {
        color: '#F55830',
      },
      noData: {
        textAlign: 'center',
        color: '#9b9b9b',
        fontSize: FONT_SIZE_FIRST,
        paddingTop: 15,
        paddingBottom: 15,
      },
    };

    const inviteRewards = getInviteRecord ? getInviteRecord.inviteRewards : [];

    return (
      <View style={styles.income}>
        {inviteRewards.map((val, key) => (
          <View style={styles.incomeItem} key={key}>
            <View style={styles.incomeDate}>
              {`${dayjs(val.createTime).format('DD-MM-YYYY')}`}
            </View>
            <View style={styles.incomeMain}>
              <View style={styles.incomeTitle}>{val.productName}</View>
              <View style={styles.incomePrice}>
                {`+ ${priceFormat(val.rewardValue)} ${MONETARY}`}
              </View>
            </View>
          </View>
        ))}
        {inviteRewards.length === 0 && (
          <View style={styles.noData}>{i18n.noData}</View>
        )}
      </View>
    );
  }

  renderExpend() {
    const { enchashmentGetList } = this.props;
    const styles = {
      incomeItem: {
        marginBottom: 5,
      },
      incomeDate: {
        paddingTop: 10,
        paddingBottom: 10,
        color: '#A6A6A6',
        fontSize: 10,
        marginBottom: 10,
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
      },
      incomeMain: {
        display: 'flex',
        flexDivection: 'row',
        justifyContent: 'space-between',
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#fff',
      },
      incomeTitle: {
        color: '#848484',
        width: WINDOW_WIDTH * 0.55,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      incomePrice: {
        color: '#72BE20',
      },
      noData: {
        textAlign: 'center',
        color: '#9b9b9b',
        fontSize: FONT_SIZE_FIRST,
        paddingTop: 15,
        paddingBottom: 15,
      },
    };

    const enchashmentInfo = enchashmentGetList
      ? enchashmentGetList.enchashmentInfo
      : [];

    return (
      <View style={styles.income}>
        {enchashmentInfo.map((val, key) => (
          <View style={styles.incomeItem} key={key}>
            <View style={styles.incomeDate}>
              {`${dayjs(val.createTime).format('DD-MM-YYYY')}`}
            </View>
            <View style={styles.incomeMain}>
              <View style={styles.incomeTitle}>{val.bankName}</View>
              <View style={styles.incomePrice}>
                {`- ${priceFormat(val.amount)} ${MONETARY}`}
              </View>
            </View>
          </View>
        ))}
        {enchashmentInfo.length === 0 && (
          <View style={styles.noData}>{i18n.noData}</View>
        )}
      </View>
    );
  }

  renderContent() {
    const { isShowIncome } = this.state;
    const styles = {
      container: {
        paddingTop: 190 - 45,
      },
      wrap: {
        backgroundColor: '#f2f2f2',
        minHeight: WINDOW_HEIGHT - 190,
      },
      main: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingTop: 20,
      },
      title: {
        display: 'flex',
        flexDivection: 'row',
      },
      titleLeft: {
        paddingRight: SIDEINTERVAL * 2,
        color: isShowIncome ? '#0076F7' : '#4B4B4B',
        fontSize: FONT_SIZE_FIRST,
        paddingTop: 10,
        paddingBottom: 10,
      },
      titleRight: {
        paddingRight: SIDEINTERVAL * 2,
        color: isShowIncome ? '#4B4B4B' : '#0076F7',
        fontSize: FONT_SIZE_FIRST,
        paddingTop: 10,
        paddingBottom: 10,
      },
    };
    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <View style={styles.main}>
            <View style={styles.title}>
              <View
                style={styles.titleLeft}
                onClick={() =>
                  this.setState({
                    isShowIncome: true,
                  })
                }
              >
                {i18n.detailedStatisticalTable}
              </View>
              <View
                style={styles.titleRight}
                onClick={() =>
                  this.setState({
                    isShowIncome: false,
                  })
                }
              >
                {i18n.moneyWithdrawalHistory}
              </View>
            </View>
            {isShowIncome ? this.renderIncome() : this.renderExpend()}
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { enchashmentLoading, getInviteRecordLoading, authUser } = this.props;

    const styles = {
      container: {
        position: 'relative',
        // backgroundColor: '#fff',
      },
    };

    return (
      <View style={styles.container}>
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          i18n={i18n}
          router={router}
          SCREENS={SCREENS}
        />
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
          title={i18n.myBrokerage}
        />
        {enchashmentLoading || getInviteRecordLoading ? (
          <Loader />
        ) : (
          <>
            {this.renderBackground()}
            {this.renderCard()}
            {this.renderContent()}
          </>
        )}
      </View>
    );
  }
}

export default connect(
  (state, props) => {
    const { enchashmentGetList, enchashmentConfig, getInviteRecord } = state;

    return {
      enchashmentLoading: enchashmentGetList.loading,
      getInviteRecordLoading: getInviteRecord.loading,
      authUser: getLoginUser(state, props),
      enchashmentGetList: enchashmentGetList.item,
      getInviteRecord: getInviteRecord.item,
      balance: enchashmentGetList ? enchashmentGetList.balance : 0,
      limit: parseInt(enchashmentConfig.limit, 10),
    };
  },
  {
    ...getInviteRecordActionCreators,
    ...enchashmentGetListActionCreators,
    ...enchashmentConfigActionCreators,
  },
)(Withdraw);

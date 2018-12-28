/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
import { Modal } from 'antd-mobile';
import dayjs from 'dayjs';

import BYHeader from '@/components/BYHeader';
import Loader from '@/components/Loader';

import * as getInviteRecordActionCreators from '@/common/actions/getInviteRecord';
import * as enchashmentGetListActionCreators from '@/common/actions/enchashmentGetList';
import * as enchashmentConfigActionCreators from '@/common/actions/enchashmentConfig';
import {
  SCREENS,
  WINDOW_HEIGHT,
  BUYOO,
  WINDOW_WIDTH,
  SIDEINTERVAL,
  MONETARY,
} from '@/common/constants';

import { o } from '@/utils/AuthEncrypt';
import { localStorageGetItem } from '@/utils';
import {
  FONT_COLOR_FIFTH,
  BACKGROUND_COLOR_THIRD,
  FONT_SIZE_FIRST,
} from '@/styles/variables';
import CustomIcon from '@/components/CustomIcon';
import MustLogin from '@/components/MustLogin';
import priceFormat from '@/utils/priceFormat';

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
      Modal.alert(
        '',
        formatMessage({ id: 'limitWithdrawnTips' }).replace('XXX', limit),
        [
          {
            text: formatMessage({ id: 'confirm' }),
            style: 'default',
            // onPress: () => {},
          },
        ],
      );
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

    return <div style={styles.container} />;
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
      <div style={styles.container}>
        <div style={styles.main}>
          <div style={styles.row1}>
            <CustomIcon type="Money" style={styles.row1Icon} />
            <div style={styles.row1Text}>
              {formatMessage({ id: 'commission' })}
            </div>
          </div>
          <div style={styles.row2}>
            <div style={styles.row2Left}>
              <div style={styles.row2LeftTitle}>
                {formatMessage({ id: 'commissionsNotReceived' })}
              </div>
              <div style={styles.row2LeftPrice}>
                {enchashmentGetList ? `${priceFormat(balance)} ${MONETARY}` : 0}
              </div>
              <div
                style={styles.row2LeftButton}
                onClick={() => this.handleOnPressWithdraw()}
              >
                {formatMessage({ id: 'withdrawal' })}
              </div>
            </div>
            <div style={styles.row2Right}>
              <div style={styles.row2RightTitle}>
                {formatMessage({ id: 'commissionsReceived' })}
              </div>
              <div style={styles.row2RightPrice}>
                {enchashmentGetList && enchashmentGetList.amountSum
                  ? `${priceFormat(enchashmentGetList.amountSum)} ${MONETARY}`
                  : 0}
              </div>
            </div>
          </div>
        </div>
      </div>
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
      <div style={styles.income}>
        {inviteRewards.map((val, key) => (
          <div style={styles.incomeItem} key={key}>
            <div style={styles.incomeDate}>
              {`${dayjs(val.createTime).format('DD-MM-YYYY')}`}
            </div>
            <div style={styles.incomeMain}>
              <div style={styles.incomeTitle}>{val.productName}</div>
              <div style={styles.incomePrice}>
                {`+ ${priceFormat(val.rewardValue)} ${MONETARY}`}
              </div>
            </div>
          </div>
        ))}
        {inviteRewards.length === 0 && (
          <div style={styles.noData}>{formatMessage({ id: 'noData' })}</div>
        )}
      </div>
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
      <div style={styles.income}>
        {enchashmentInfo.map((val, key) => (
          <div style={styles.incomeItem} key={key}>
            <div style={styles.incomeDate}>
              {`${dayjs(val.createTime).format('DD-MM-YYYY')}`}
            </div>
            <div style={styles.incomeMain}>
              <div style={styles.incomeTitle}>{val.bankName}</div>
              <div style={styles.incomePrice}>
                {`- ${priceFormat(val.amount)} ${MONETARY}`}
              </div>
            </div>
          </div>
        ))}
        {enchashmentInfo.length === 0 && (
          <div style={styles.noData}>{formatMessage({ id: 'noData' })}</div>
        )}
      </div>
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
      <div style={styles.container}>
        <div style={styles.wrap}>
          <div style={styles.main}>
            <div style={styles.title}>
              <div
                style={styles.titleLeft}
                onClick={() =>
                  this.setState({
                    isShowIncome: true,
                  })
                }
              >
                {formatMessage({ id: 'detailedStatisticalTable' })}
              </div>
              <div
                style={styles.titleRight}
                onClick={() =>
                  this.setState({
                    isShowIncome: false,
                  })
                }
              >
                {formatMessage({ id: 'moneyWithdrawalHistory' })}
              </div>
            </div>
            {isShowIncome ? this.renderIncome() : this.renderExpend()}
          </div>
        </div>
      </div>
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
      <div style={styles.container}>
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          formatMessage={formatMessage}
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
          title={formatMessage({ id: 'myBrokerage' })}
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
      </div>
    );
  }
}

export default connect(
  state => {
    const { enchashmentGetList, enchashmentConfig, getInviteRecord } = state;

    return {
      enchashmentLoading: enchashmentGetList.loading,
      getInviteRecordLoading: getInviteRecord.loading,
      authUser: o(localStorageGetItem, BUYOO),
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

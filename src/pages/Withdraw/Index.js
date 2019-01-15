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

import { FONT_COLOR_FIFTH } from '@src/styles/variables';
import CustomIcon from '@src/components/CustomIcon';
import MustLogin from '@src/components/MustLogin';
import priceFormat from '@src/utils/priceFormat';
import { getLoginUser } from '@src/common/selectors';

import styles from './index.less';
import backgroundStyles from './background.less';
import cardStyles from './card.less';
import incomeStyles from './income.less';
import expendStyles from './expend.less';
import contentStyles from './content.less';

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

  renderBackground = () => (
    <View
      style={{
        width: WINDOW_WIDTH,
      }}
      className={backgroundStyles.container}
    />
  );

  renderCard() {
    const { balance, enchashmentGetList } = this.props;
    return (
      <View
        style={{
          left: SIDEINTERVAL,
          right: SIDEINTERVAL,
        }}
        className={cardStyles.container}
      >
        <View className={cardStyles.main}>
          <View
            style={{
              paddingLeft: SIDEINTERVAL,
              paddingRight: SIDEINTERVAL,
            }}
            className={cardStyles.row1}
          >
            <CustomIcon
              name="Money"
              type="Money"
              style={{
                marginRight: SIDEINTERVAL * 0.5,
              }}
              className={cardStyles.row1Icon}
            />
            <View className={cardStyles.row1Text}>{i18n.commission}</View>
          </View>
          <View
            style={{
              paddingLeft: SIDEINTERVAL,
              paddingRight: SIDEINTERVAL,
            }}
            className={cardStyles.row2}
          >
            <View
              style={{
                marginRight: WINDOW_WIDTH * 0.08,
              }}
            >
              <View className={cardStyles.row2LeftTitle}>
                {i18n.commissionsNotReceived}
              </View>
              <View className={cardStyles.row2LeftPrice}>
                {enchashmentGetList ? `${priceFormat(balance)} ${MONETARY}` : 0}
              </View>
              <View
                style={{
                  paddingLeft: SIDEINTERVAL * 0.8,
                  paddingRight: SIDEINTERVAL * 0.8,
                }}
                className={cardStyles.row2LeftButton}
                onClick={() => this.handleOnPressWithdraw()}
              >
                {i18n.withdrawal}
              </View>
            </View>
            <View>
              <View className={cardStyles.row2RightTitle}>
                {i18n.commissionsReceived}
              </View>
              <View className={cardStyles.row2RightPrice}>
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
    const inviteRewards = getInviteRecord ? getInviteRecord.inviteRewards : [];

    return (
      <View>
        {inviteRewards.map((val, key) => (
          <View className={incomeStyles.incomeItem} key={key}>
            <View className={incomeStyles.incomeDate}>
              {`${dayjs(val.createTime).format('DD-MM-YYYY')}`}
            </View>
            <View
              style={{
                paddingLeft: SIDEINTERVAL,
                paddingRight: SIDEINTERVAL,
              }}
              className={incomeStyles.incomeMain}
            >
              <View
                style={{
                  width: WINDOW_WIDTH * 0.55,
                }}
                className={incomeStyles.incomeTitle}
              >
                {val.productName}
              </View>
              <View className={incomeStyles.incomePrice}>
                {`+ ${priceFormat(val.rewardValue)} ${MONETARY}`}
              </View>
            </View>
          </View>
        ))}
        {inviteRewards.length === 0 && (
          <View className={incomeStyles.noData}>{i18n.noData}</View>
        )}
      </View>
    );
  }

  renderExpend() {
    const { enchashmentGetList } = this.props;
    const enchashmentInfo = enchashmentGetList
      ? enchashmentGetList.enchashmentInfo
      : [];

    return (
      <View>
        {enchashmentInfo.map((val, key) => (
          <View className={expendStyles.incomeItem} key={key}>
            <View className={expendStyles.incomeDate}>
              {`${dayjs(val.createTime).format('DD-MM-YYYY')}`}
            </View>
            <View
              style={{
                paddingLeft: SIDEINTERVAL,
                paddingRight: SIDEINTERVAL,
              }}
              className={expendStyles.incomeMain}
            >
              <View
                style={{
                  width: WINDOW_WIDTH * 0.55,
                }}
                className={expendStyles.incomeTitle}
              >
                {val.bankName}
              </View>
              <View className={expendStyles.incomePrice}>
                {`- ${priceFormat(val.amount)} ${MONETARY}`}
              </View>
            </View>
          </View>
        ))}
        {enchashmentInfo.length === 0 && (
          <View className={expendStyles.noData}>{i18n.noData}</View>
        )}
      </View>
    );
  }

  renderContent() {
    const { isShowIncome } = this.state;
    return (
      <View className={contentStyles.container}>
        <View
          style={{
            minHeight: WINDOW_HEIGHT - 190,
          }}
          className={contentStyles.wrap}
        >
          <View
            style={{
              paddingLeft: SIDEINTERVAL,
              paddingRight: SIDEINTERVAL,
            }}
            className={contentStyles.main}
          >
            <View className={contentStyles.title}>
              <View
                style={{
                  paddingRight: SIDEINTERVAL * 2,
                  color: isShowIncome ? '#0076F7' : '#4B4B4B',
                }}
                className={contentStyles.titleLeft}
                onClick={() =>
                  this.setState({
                    isShowIncome: true,
                  })
                }
              >
                {i18n.detailedStatisticalTable}
              </View>
              <View
                style={{
                  paddingRight: SIDEINTERVAL * 2,
                  color: isShowIncome ? '#4B4B4B' : '#0076F7',
                }}
                className={contentStyles.titleRight}
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

    return (
      <View className={styles.container}>
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

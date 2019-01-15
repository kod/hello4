/* eslint-disable react/no-array-index-key */
import React from 'react';
import qs from 'qs';
import { connect } from 'react-redux';
import classNames from 'classnames';
import BYHeader from '@src/components/BYHeader';
import { i18n, View } from '@src/API';

import Loader from '@src/components/Loader';
import router from 'umi/lib/router';

import * as addressActionCreators from '@src/common/actions/address';
import * as addressModifyActionCreators from '@src/common/actions/addressModify';
import * as getUserInfoByIdActionCreators from '@src/common/actions/getUserInfoById';
import * as orderCreateActionCreators from '@src/common/actions/orderCreate';
import * as couponSelectActionCreators from '@src/common/actions/couponSelect';
import * as modalActionCreators from '@src/common/actions/modal';
import {
  SIDEINTERVAL,
  WINDOW_WIDTH,
  SCREENS,
  WINDOW_HEIGHT,
} from '@src/common/constants';
import { Modal } from 'antd-mobile';
import EmptyState from '@src/components/EmptyState';

import MustLogin from '@src/components/MustLogin';
import { getLoginUser } from '@src/common/selectors';
import CustomIcon from '@src/components/CustomIcon';

import styles from './index.less';

const afiasifsdhfsPng =
  'https://oss.buyoo.vn/usercollect/1/20181109084840_7R8.png';

class Address extends React.Component {
  componentDidMount() {
    const { authUser, addressFetch } = this.props;
    if (authUser) {
      addressFetch();
    }
  }

  editAddress = item =>
    item.address +
    (item.division4thName ? ', ' : '') +
    item.division4thName +
    (item.division3rdName ? ', ' : '') +
    item.division3rdName +
    (item.division2ndName ? ', ' : '') +
    item.division2ndName;

  handleOnPressAddressDefault(item) {
    const { addressModifyFetch } = this.props;
    if (item.isdefault === 'Y') return false;
    return addressModifyFetch({
      ...item,
      isdefault: 'Y',
    });
  }

  handleOnPressAddressDel(id) {
    const { addressRemoveFetch } = this.props;
    Modal.alert('', i18n.confirmDelete, [
      {
        text: i18n.cancel,
      },
      {
        text: i18n.confirm,
        style: 'default',
        onPress: () => {
          addressRemoveFetch(id);
        },
      },
    ]);
  }

  handleOnPressItem(item) {
    const { addressSelectFetch, isSelect } = this.props;
    if (isSelect) {
      addressSelectFetch(item.id);
      router.go(-1);
    }
  }

  renderMainContent() {
    const { items, loading, loaded, refreshing, isSelect } = this.props;

    console.log(isSelect);

    return (
      <View
        style={{
          height: WINDOW_HEIGHT - 45,
        }}
      >
        {loaded === true && items.length === 0 ? (
          <EmptyState
            source={afiasifsdhfsPng}
            text={i18n.pleaseAddYourShippingAddress}
            style={{ height: WINDOW_HEIGHT - 45 - 50 }}
          />
        ) : (
          <View
            style={{
              height: WINDOW_HEIGHT - 45 - 50,
            }}
            className={styles.containerMain}
          >
            {loading && !refreshing && <Loader />}
            {items.map((val, key) => (
              <View
                style={{
                  paddingLeft: SIDEINTERVAL,
                }}
                key={key}
                onClick={() => this.handleOnPressItem(val)}
              >
                <View className={styles.main}>
                  <View className={styles.namePhone}>
                    <View className={styles.name}>{val.username}</View>
                    <View className={styles.phone}>{val.msisdn}</View>
                  </View>
                  <View
                    style={{
                      paddingRight: SIDEINTERVAL,
                    }}
                    className={styles.address}
                  >
                    {this.editAddress(val)}
                  </View>
                  {!isSelect && (
                    <View className={styles.operate}>
                      <View
                        className={styles.operateLeft}
                        onClick={() => this.handleOnPressAddressDefault(val)}
                      >
                        <CustomIcon
                          name="radioboxfill"
                          type="radioboxfill"
                          style={{
                            marginRight: WINDOW_WIDTH * 0.02,
                          }}
                          className={classNames(styles.selectIcon, {
                            [styles.selected]: val.isdefault === 'Y',
                          })}
                        />
                        <View
                          className={classNames(styles.selectText, {
                            [styles.selected]: val.isdefault === 'Y',
                          })}
                        >
                          {i18n.defaultAddress}
                        </View>
                      </View>
                      <View
                        style={{
                          paddingRight: SIDEINTERVAL,
                        }}
                        className={styles.operateRight}
                      >
                        <CustomIcon
                          name="edit_light"
                          type="edit_light"
                          style={{
                            paddingLeft: WINDOW_WIDTH * 0.02,
                            paddingRight: WINDOW_WIDTH * 0.02,
                          }}
                          className={styles.editIcon}
                          onClick={
                            () =>
                              router.push(
                                `/${SCREENS.AddressModify}?${qs.stringify({
                                  id: val.id,
                                  msisdn: val.msisdn,
                                  address: val.address,
                                  username: val.username,
                                  isdefault: val.isdefault,
                                  division2nd: val.division2nd,
                                  division3rd: val.division3rd,
                                  division4th: val.division4th,
                                  division2ndName: val.division2ndName,
                                  division3rdName: val.division3rdName,
                                  division4thName: val.division4thName,
                                })}`,
                              )
                            // navigate(SCREENS.AddressModify, {
                            //   id: val.id,
                            //   msisdn: val.msisdn,
                            //   address: val.address,
                            //   username: val.username,
                            //   isdefault: val.isdefault,
                            //   division2nd: val.division2nd,
                            //   division3rd: val.division3rd,
                            //   division4th: val.division4th,
                            //   division2ndName: val.division2ndName,
                            //   division3rdName: val.division3rdName,
                            //   division4thName: val.division4thName,
                            // })
                          }
                        />
                        <CustomIcon
                          name="delete_light"
                          type="delete_light"
                          style={{
                            paddingLeft: WINDOW_WIDTH * 0.02,
                            paddingRight: WINDOW_WIDTH * 0.02,
                          }}
                          className={styles.trashIcon}
                          onClick={() => this.handleOnPressAddressDel(val.id)}
                        />
                      </View>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
        <View
          className={styles.add}
          onClick={() => router.push(`/${SCREENS.AddressAdd}`)}
        >
          {i18n.addAddress}
        </View>
      </View>
    );
  }

  render() {
    const { authUser } = this.props;

    return (
      <View
        style={{
          height: WINDOW_HEIGHT,
        }}
        className={styles.renderContainer}
      >
        <BYHeader />
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          i18n={i18n}
          router={router}
          SCREENS={SCREENS}
        />

        {this.renderMainContent()}
      </View>
    );
  }
}

export default connect(
  (state, props) => {
    const { address } = state;

    const { location } = props;

    console.log(props);
    return {
      isSelect: !!location.query.isSelect,
      authUser: getLoginUser(state, props),
      items: address.items,
      loading: address.loading,
      loaded: address.loaded,
      refreshing: address.refreshing,
    };
  },
  {
    ...addressActionCreators,
    ...addressModifyActionCreators,
    ...getUserInfoByIdActionCreators,
    ...orderCreateActionCreators,
    ...couponSelectActionCreators,
    ...modalActionCreators,
  },
)(Address);

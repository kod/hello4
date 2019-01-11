/* eslint-disable react/no-array-index-key */
import React from 'react';
import qs from 'qs';
import { connect } from 'react-redux';
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
import { PRIMARY_COLOR, BORDER_COLOR } from '@src/styles/variables';
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

    const styles = {
      container: {
        height: WINDOW_HEIGHT - 45,
      },
      containerMain: {
        height: WINDOW_HEIGHT - 45 - 50,
        overflowY: 'auto',
      },
      wrap: {},
      add: {
        height: 50,
        lineHeight: '50px',
        textAlign: 'center',
        backgroundColor: PRIMARY_COLOR,
        color: '#fff',
      },
      item: {
        paddingLeft: SIDEINTERVAL,
      },
      main: {
        marginTop: 25,
        paddingBottom: 25,
        borderBottomWidth: 1,
        borderBottomColor: BORDER_COLOR,
      },
      namePhone: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
      },
      name: {
        color: '#333',
        marginRight: 15,
        fontWeight: '700',
      },
      phone: {
        color: '#333',
        fontWeight: '700',
      },
      address: {
        color: '#999',
        paddingRight: SIDEINTERVAL,
        marginBottom: 20,
        fontSize: 14,
        lineHeight: `${14 + 14 * 0.618}px`,
      },
      operate: {
        display: 'flex',
        flexDirection: 'row',
      },
      operateLeft: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
      },
      selectIcon: {
        fontSize: 18,
        color: '#666',
        marginRight: WINDOW_WIDTH * 0.02,
        paddingTop: 1,
      },
      selectText: {
        color: '#666',
      },
      operateRight: {
        display: 'flex',
        flexDirection: 'row',
        paddingRight: SIDEINTERVAL,
      },
      editIcon: {
        fontSize: 24,
        color: '#666',
        paddingLeft: WINDOW_WIDTH * 0.02,
        paddingRight: WINDOW_WIDTH * 0.02,
      },
      trashIcon: {
        fontSize: 24,
        color: '#666',
        paddingLeft: WINDOW_WIDTH * 0.02,
        paddingRight: WINDOW_WIDTH * 0.02,
      },
      selected: {
        color: PRIMARY_COLOR,
      },
    };

    console.log(isSelect);

    return (
      <View style={styles.container}>
        {loaded === true && items.length === 0 ? (
          <EmptyState
            source={afiasifsdhfsPng}
            text={i18n.pleaseAddYourShippingAddress}
            style={{ height: WINDOW_HEIGHT - 45 - 50 }}
          />
        ) : (
          <View style={styles.containerMain}>
            {loading && !refreshing && <Loader />}
            {items.map((val, key) => (
              <View
                style={styles.item}
                key={key}
                onClick={() => this.handleOnPressItem(val)}
              >
                <View style={styles.main}>
                  <View style={styles.namePhone}>
                    <View style={styles.name}>{val.username}</View>
                    <View style={styles.phone}>{val.msisdn}</View>
                  </View>
                  <View style={styles.address}>{this.editAddress(val)}</View>
                  {!isSelect && (
                    <View style={styles.operate}>
                      <View
                        style={styles.operateLeft}
                        onClick={() => this.handleOnPressAddressDefault(val)}
                      >
                        <CustomIcon
                          name="radioboxfill"
                          type="radioboxfill"
                          style={{
                            ...styles.selectIcon,
                            ...(val.isdefault === 'Y' && styles.selected),
                          }}
                        />
                        <View
                          style={{
                            ...styles.selectText,
                            ...(val.isdefault === 'Y' && styles.selected),
                          }}
                        >
                          {i18n.defaultAddress}
                        </View>
                      </View>
                      <View style={styles.operateRight}>
                        <CustomIcon
                          name="edit_light"
                          type="edit_light"
                          style={styles.editIcon}
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
                          style={styles.trashIcon}
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
          style={styles.add}
          onClick={() => router.push(`/${SCREENS.AddressAdd}`)}
        >
          {i18n.addAddress}
        </View>
      </View>
    );
  }

  render() {
    const { authUser } = this.props;

    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        height: WINDOW_HEIGHT,
        backgroundColor: '#fff',
      },
    };
    return (
      <View style={styles.container}>
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

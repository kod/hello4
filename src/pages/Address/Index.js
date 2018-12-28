/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import BYHeader from '@/components/BYHeader';
import { formatMessage } from 'umi/locale';

import Loader from '@/components/Loader';
import router from 'umi/router';

import * as addressActionCreators from '@/common/actions/address';
import * as getUserInfoByIdActionCreators from '@/common/actions/getUserInfoById';
import * as orderCreateActionCreators from '@/common/actions/orderCreate';
import * as couponSelectActionCreators from '@/common/actions/couponSelect';
import * as modalActionCreators from '@/common/actions/modal';
import { PRIMARY_COLOR, BORDER_COLOR } from '@/styles/variables';
import {
  SIDEINTERVAL,
  WINDOW_WIDTH,
  SCREENS,
  WINDOW_HEIGHT,
} from '@/common/constants';
import { Modal } from 'antd-mobile';
import EmptyState from '@/components/EmptyState';

import MustLogin from '@/components/MustLogin';
import { getLoginUser } from '@/common/selectors';

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
    Modal.alert('', formatMessage({ id: 'confirmDelete' }), [
      {
        text: formatMessage({ id: 'cancel' }),
      },
      {
        text: formatMessage({ id: 'confirm' }),
        style: 'default',
        onPress: () => {
          addressRemoveFetch(id);
        },
      },
    ]);
  }

  handleOnPressItem(item) {
    const { addressSelectFetch } = this.props;
    addressSelectFetch(item.id);
    router.go(-1);
  }

  renderMainContent() {
    const { items, loading, loaded, refreshing } = this.props;

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

    // const isSelect = query.isSelect ? query.isSelect : false;

    return (
      <div style={styles.container}>
        {loaded === true && items.length === 0 ? (
          <EmptyState
            source={afiasifsdhfsPng}
            text={formatMessage({ id: 'pleaseAddYourShippingAddress' })}
            style={{ height: WINDOW_HEIGHT - 45 - 50 }}
          />
        ) : (
          <div style={styles.containerMain}>
            {loading && !refreshing && <Loader />}
            {items.map((val, key) => (
              <div
                style={styles.item}
                key={key}
                onClick={() => this.handleOnPressItem(val)}
              >
                <div style={styles.main}>
                  <div style={styles.namePhone}>
                    <div style={styles.name}>{val.username}</div>
                    <div style={styles.phone}>{val.msisdn}</div>
                  </div>
                  <div style={styles.address}>{this.editAddress(val)}</div>
                  {/* {!isSelect && (
                    <div style={styles.operate}>
                      <div
                        style={styles.operateLeft}
                        onClick={() => this.handleOnPressAddressDefault(val)}
                      >
                        <CustomIcon
                          type="radioboxfill"
                          style={{
                            ...styles.selectIcon,
                            ...(val.isdefault === 'Y' && styles.selected),
                          }}
                        />
                        <div
                          style={{
                            ...styles.selectText,
                            ...(val.isdefault === 'Y' && styles.selected),
                          }}
                        >
                          {formatMessage({ id: 'defaultAddress' })}
                        </div>
                      </div>
                      <div style={styles.operateRight}>
                        <CustomIcon
                          style={styles.editIcon}
                          type="edit_light"
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
                          type="delete_light"
                          style={styles.trashIcon}
                          onClick={() => this.handleOnPressAddressDel(val.id)}
                        />
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            ))}
          </div>
        )}
        <div
          style={styles.add}
          onClick={() => router.push(`/${SCREENS.AddressAdd}`)}
        >
          {formatMessage({ id: 'addAddress' })}
        </div>
      </div>
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
      <div style={styles.container}>
        <BYHeader />
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          formatMessage={formatMessage}
          router={router}
          SCREENS={SCREENS}
        />

        {this.renderMainContent()}
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    const { address } = state;

    return {
      authUser: getLoginUser(state, props),
      items: address.items,
      loading: address.loading,
      loaded: address.loaded,
      refreshing: address.refreshing,
    };
  },
  {
    ...addressActionCreators,
    ...getUserInfoByIdActionCreators,
    ...orderCreateActionCreators,
    ...couponSelectActionCreators,
    ...modalActionCreators,
  },
)(Address);

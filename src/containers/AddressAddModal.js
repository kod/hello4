import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import { connect } from 'react-redux';

import * as cityInfosActionCreators from '@src/common/actions/cityInfos';
import * as modalActionCreators from '@src/common/actions/modal';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  WINDOW_HEIGHT,
} from '@src/common/constants';
import { BORDER_COLOR, PRIMARY_COLOR } from '@src/styles/variables';
import CustomIcon from '@src/components/CustomIcon';
import Loader from '@src/components/Loader';
import { dispatchEventBuyoo } from '@src/utils';
import { View } from '@src/API';

const styles = {
  container: {
    backgroundColor: '#fff',
  },
  mask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, .3)',
  },
  closeWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 45,
    paddingRight: WINDOW_WIDTH * 0.02,
  },
  close: {
    fontSize: 24,
    color: '#666',
  },
  nav: {
    overflowY: 'auto',
  },
  navMain: {
    display: 'flex',
    flexDirection: 'row',
    width: WINDOW_WIDTH * 1.5,
    paddingLeft: SIDEINTERVAL,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
  },
  navItem: {
    height: 45,
    lineHeight: '45px',
    textAlign: 'center',
    color: '#666',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    borderBottomStyle: 'solid',
    marginRight: SIDEINTERVAL * 2,
  },
  navActive: {
    color: PRIMARY_COLOR,
    borderBottomColor: PRIMARY_COLOR,
  },
  scrollView: {
    height: WINDOW_HEIGHT * 0.6,
    overflowY: 'auto',
    display: 'none',
  },
  ScrollViewShow: {
    display: 'flex',
    flexDirection: 'column',
  },
  scrollViewItem: {
    display: 'flex',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scrollViewActive: {
    color: PRIMARY_COLOR,
  },
  scrollViewWrap: {
    position: 'relative',
  },
};

class AddressAddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressIndex: 0, // 显示哪个ScrollView
      division2ndID: null,
      division3rdID: null,
      division4thID: null,
      division2ndName: null,
      division3rdName: null,
      division4thName: null,
      visible: true,
    };
  }

  componentDidMount() {
    const {
      cityInfosFetch,
      modalProps: { params },
    } = this.props;

    cityInfosFetch(1, 'division2nd');

    // 是否进行数据初始化（常用于编辑，反之新建）
    if (params) {
      this.setState({
        addressIndex: 2,
      });

      this.handleOnPressCitySelect(
        params.division2nd,
        params.division2ndName,
        0,
      );
      this.handleOnPressCitySelect(
        params.division3rd,
        params.division3rdName,
        1,
      );
      this.handleOnPressCitySelect(
        params.division4th,
        params.division4thName,
        2,
        true,
      );
    }
  }

  handleOnModalClose = () => {
    const { closeModal } = this.props;
    this.setState({
      visible: false,
    });
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  /**
   * 选择
   * @param {number} id id
   * @param {string}} name 名称
   * @param {number} key 第几栏
   * @param {bool} init 是否为初始化
   */
  handleOnPressCitySelect(id, name, key, init = true) {
    let item;

    const {
      division2ndID,
      division3rdID,
      // division4thID,
      division2ndName,
      division3rdName,
      // division4thName,
    } = this.state;

    const {
      cityInfosFetch,
      modalProps: { callback = '' },
    } = this.props;

    switch (key) {
      case 0:
        item = {
          addressIndex: 1,
          division2ndName: name,
          division3rdName: null,
          division4thName: null,
          division2ndID: id,
          division3rdID: null,
          division4thID: null,
        };
        cityInfosFetch(id, 'division3rd');
        break;

      case 1:
        item = {
          addressIndex: 2,
          division3rdName: name,
          division4thName: null,
          // division2ndID: null,
          division3rdID: id,
          division4thID: null,
        };
        cityInfosFetch(id, 'division4th');
        break;

      case 2:
        item = {
          addressIndex: 2,
          division4thName: name,
          // division2ndID: division2nd.id,
          // division3rdID: division3rd.id,
          division4thID: id,
        };
        break;

      default:
        break;
    }
    this.setState(item, () => {
      // 是否为第三个地址
      if (key === 2) {
        // 是否为初始化
        if (init === false) {
          // 非初始化
          dispatchEventBuyoo(callback, {
            division2ndName,
            division3rdName,
            division4thName: name,
            division2ndID,
            division3rdID,
            division4thID: id,
          });
          this.handleOnModalClose();
        }
      }
    });
  }

  renderContent() {
    const renderScrollView = (item, scrollViewKey) => {
      const {
        addressIndex,
        division2ndID,
        division3rdID,
        division4thID,
      } = this.state;

      const divisionObject = key => {
        switch (key) {
          case 0:
            return division2ndID;
          case 1:
            return division3rdID;
          case 2:
            return division4thID;
          default:
            return division4thID;
        }
      };

      return (
        <View
          style={{
            ...styles.scrollView,
            ...(addressIndex === scrollViewKey && styles.ScrollViewShow),
          }}
          key={scrollViewKey}
        >
          {item.map(val => (
            <View
              style={styles.scrollViewItem}
              key={val.id}
              onClick={() =>
                this.handleOnPressCitySelect(
                  val.id,
                  val.name,
                  scrollViewKey,
                  scrollViewKey !== 2,
                )
              }
            >
              <View
                style={{
                  ...styles.scrollViewItemText,
                  ...(divisionObject(scrollViewKey) === val.id &&
                    styles.scrollViewActive),
                }}
              >
                {val.name}
              </View>
              <CustomIcon
                name="radioboxfill"
                type="radioboxfill"
                style={{
                  ...styles.scrollViewItemIcon,
                  ...(divisionObject(scrollViewKey) === val.id &&
                    styles.scrollViewActive),
                }}
              />
            </View>
          ))}
        </View>
      );
    };

    const {
      addressIndex,
      division2ndID,
      division3rdID,
      // division4thID,
      division2ndName,
      division3rdName,
      division4thName,
    } = this.state;

    const {
      loading,
      division2ndItems,
      division3rdItems,
      division4thItems,
    } = this.props;

    return (
      <View style={styles.container}>
        {/* <View style={styles.mask} /> */}
        <View style={styles.closeWrap}>
          <CustomIcon
            name="close"
            type="close"
            style={styles.close}
            onClick={() => this.handleOnModalClose()}
          />
        </View>
        <View
          style={styles.nav}
          // horizontal
          // showsHorizontalScrollIndicator={false}
        >
          <View style={styles.navMain}>
            <View
              style={{
                ...styles.navItem,
                ...(addressIndex === 0 && styles.navActive),
              }}
              onClick={() => this.setState({ addressIndex: 0 })}
            >
              {division2ndName || 'Tỉnh/Thành'}
            </View>
            {division2ndID && (
              <View
                style={{
                  ...styles.navItem,
                  ...(addressIndex === 1 && styles.navActive),
                }}
                onClick={() => this.setState({ addressIndex: 1 })}
              >
                {division3rdName || 'Quận/huyện'}
              </View>
            )}
            {division3rdID && (
              <View
                style={{
                  ...styles.navItem,
                  ...(addressIndex === 2 && styles.navActive),
                }}
                onClick={() => this.setState({ addressIndex: 2 })}
              >
                {division4thName || 'Phường, xã'}
              </View>
            )}
          </View>
        </View>
        <View style={styles.scrollViewWrap}>
          {[division2ndItems, division3rdItems, division4thItems].map(
            (val, key) => renderScrollView(val, key),
          )}
          {loading && <Loader absolutePosition />}
        </View>
      </View>
    );
  }

  render() {
    const { visible } = this.state;

    return (
      <Modal
        popup
        visible={visible}
        onClose={() => this.handleOnModalClose()}
        animationType="slide-up"
      >
        {this.renderContent()}
      </Modal>
    );
  }

  // render() {
  //   return (
  //     <Modal
  //       animationType="fade"
  //       transparent
  //       visible
  //       onRequestClose={this.handleOnModalClose}
  //     >
  //       <View style={{ flex: 1 }}>
  //         <View style={styles.mask} />
  //         {this.renderContent()}
  //       </View>
  //     </Modal>
  //   );
  // }
}

export default connect(
  state => {
    const {
      cityInfos,
      modal: { modalProps = {} },
    } = state;

    return {
      modalProps,
      loading: cityInfos.loading,
      division2ndItems: cityInfos.division2nd,
      division3rdItems: cityInfos.division3rd,
      division4thItems: cityInfos.division4th,
    };
  },
  {
    ...cityInfosActionCreators,
    ...modalActionCreators,
  },
)(AddressAddModal);

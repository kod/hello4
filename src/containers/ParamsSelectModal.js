import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';

import { BORDER_COLOR, PRIMARY_COLOR, RED_COLOR } from '@/styles/variables';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  MONETARY,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@/common/constants';

import priceFormat from '@/utils/priceFormat';
import CustomIcon from '@/components/CustomIcon';
import * as modalActionCreators from '@/common/actions/modal';
import * as productDetailInfoActionCreators from '@/common/actions/productDetailInfo';
import { xOssProcess } from '@/utils';

class ParamsSelectModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };
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

  handleOnPresschangeNumber(number) {
    const { productDetailNumberFetch, numbers } = this.props;
    if (number < 1 || number > numbers) return false;
    return productDetailNumberFetch(number);
  }

  handleOnChangeProperties(valId) {
    const {
      productDetailSelect,
      productDetailSort,
      propertiesIdsObject,
      propertiesObject,
    } = this.props;
    /**
     * 查找目标id对应的属性
     * 返回 属性Array
     */
    const findProperties = id => {
      let result = '';
      Object.keys(propertiesObject).forEach(a => {
        if (result === '') {
          propertiesObject[a].forEach(b => {
            if (result === '') {
              if (b.id === id) result = propertiesObject[a];
            }
          });
        }
      });
      return result;
    };

    const replaceProperties = propertiesArray => {
      // 找出需要被替换下的值
      const array = propertiesIdsObject.split('-');
      let replaceIndex = -1;
      array.forEach((val, index) => {
        propertiesArray.forEach(val1 => {
          if (parseInt(val, 10) === val1.id) replaceIndex = index;
        });
      });
      array[replaceIndex] = valId;
      return array.sort().join('-');
    };
    const result = replaceProperties(findProperties(valId));

    if (propertiesIdsObject !== result && productDetailSort[result])
      productDetailSelect(
        result,
        productDetailSort[result],
        'ProductDetailMain',
      );
  }

  renderPropertiesIds() {
    const styles = {
      wrap: {},
      item: {},
      title: {
        color: '#666',
        paddingLeft: SIDEINTERVAL,
        paddingTop: 15,
        marginBottom: 8,
        textAlign: 'left',
      },
      properties: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: SIDEINTERVAL,
        // marginBottom: 20,
      },
      propertiesItem: {
        // width: (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3,
        height: 35,
        lineHeight: '35px',
        textAlign: 'center',
        marginRight: SIDEINTERVAL,
        marginBottom: SIDEINTERVAL,
        color: '#999',
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderStyle: 'solid',
        paddingLeft: WINDOW_WIDTH * 0.05,
        paddingRight: WINDOW_WIDTH * 0.05,
      },
      propertiesItemAcitve: {
        borderColor: PRIMARY_COLOR,
        color: PRIMARY_COLOR,
      },
    };

    const {
      propertiesArray,
      propertiesObject,
      propertiesIdsObject,
    } = this.props;

    return (
      <div style={styles.wrap}>
        {propertiesArray.map(val => (
          <div style={styles.item} key={val}>
            <div style={styles.title}>{val}</div>
            <div style={styles.properties}>
              {propertiesObject[val].map(val1 => (
                <div
                  style={{
                    ...styles.propertiesItem,
                    ...(propertiesIdsObject.indexOf(val1.id) !== -1 &&
                      styles.propertiesItemAcitve),
                  }}
                  onClick={() => this.handleOnChangeProperties(val1.id)}
                  key={val1.value}
                >
                  {val1.value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  renderContent() {
    const {
      productDetailNumber,
      imageUrls,
      price,
      numbers,
      // propertiesIdsObject,
    } = this.props;

    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      },
      mask: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.3)',
      },
      paramClose: {
        paddingTop: WINDOW_WIDTH * 0.03,
        paddingRight: WINDOW_WIDTH * 0.03,
        textAlign: 'right',
      },
      paramCloseIcon: {
        color: '#ccc',
        fontSize: 20,
      },
      paramInfo: {
        display: 'flex',
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        flexDirection: 'row',
      },
      paramImage: {
        height: 60,
        width: 60,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderStyle: 'solid',
        marginRight: SIDEINTERVAL,
      },
      paramPrice: {
        color: RED_COLOR,
        fontSize: 18,
        paddingTop: 10,
        fontWeight: '700',
      },
      paramHave: {
        color: '#999',
        fontSize: 11,
      },
      paramNumber: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingTop: 10,
        marginBottom: 50,
      },
      paramNumberText: {
        flex: 1,
        color: '#666',
        textAlign: 'left',
      },
      paramNumberChange: {
        display: 'flex',
        flexDirection: 'row',
      },
      paramNumberRemoveIcon: {
        height: 30,
        lineHeight: '30px',
        width: 30,
        textAlign: 'center',
        fontSize: 18,
        color: '#999',
        backgroundColor: '#fff',
        fontWeight: '900',
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderStyle: 'solid',
      },
      paramNumberAddIcon: {
        height: 30,
        lineHeight: '30px',
        width: 30,
        textAlign: 'center',
        fontSize: 18,
        color: '#999',
        backgroundColor: '#fff',
        fontWeight: '900',
        borderColor: BORDER_COLOR,
        borderStyle: 'solid',
        borderWidth: 1,
      },
      paramNumberIconDisable: {
        opacity: 0.5,
      },
      paramNumberTextInput: {
        height: 30,
        lineHeight: '30px',
        width: 30,
        backgroundColor: '#fff',
        textAlign: 'center',
        fontSize: 12,
        color: '#666',
        borderTopColor: BORDER_COLOR,
        borderBottomColor: BORDER_COLOR,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopStyle: 'solid',
        borderBottomStyle: 'solid',
      },
      buttonWrap: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL * 2,
      },
      button: {
        height: 50,
        lineHeight: '50px',
        textAlign: 'center',
        color: '#fff',
        backgroundColor: PRIMARY_COLOR,
      },
      buttonDisable: {
        opacity: 0.5,
      },
    };

    return (
      <div style={styles.container}>
        <div style={styles.paramClose}>
          <CustomIcon
            type="close"
            style={styles.paramCloseIcon}
            onClick={() => this.handleOnModalClose()}
          />
        </div>
        <div style={styles.paramInfo}>
          {imageUrls[0] && (
            <img
              alt=""
              style={styles.paramImage}
              src={`${imageUrls[0].imageUrl}?${xOssProcess(
                IS_IOS,
                OSS_IMAGE_QUALITY,
              )}`}
            />
          )}
          <div style={styles.paramInfoLeft}>
            <div style={styles.paramPrice}>{`${priceFormat(
              price,
            )} ${MONETARY}`}</div>
            <div style={styles.paramHave}>
              {formatMessage({ id: 'warehouse' })}:{' '}
              {numbers > 0
                ? formatMessage({ id: 'inStock' })
                : formatMessage({ id: 'soldOut' })}
            </div>
          </div>
        </div>
        {this.renderPropertiesIds()}
        <div style={styles.paramNumber}>
          <div style={styles.paramNumberText}>
            {formatMessage({ id: 'amount' })}
          </div>
          <div style={styles.paramNumberChange}>
            <div
              onClick={() =>
                this.handleOnPresschangeNumber(productDetailNumber - 1)
              }
            >
              <CustomIcon
                type="minus"
                style={{
                  ...styles.paramNumberRemoveIcon,
                  ...(productDetailNumber === 1 &&
                    styles.paramNumberIconDisable),
                }}
              />
            </div>
            <div style={styles.paramNumberTextInput}>{productDetailNumber}</div>
            <div
              onClick={() =>
                this.handleOnPresschangeNumber(productDetailNumber + 1)
              }
            >
              <CustomIcon
                type="plus"
                style={{
                  ...styles.paramNumberAddIcon,
                  ...(parseInt(productDetailNumber, 10) === numbers &&
                    styles.paramNumberIconDisable),
                }}
              />
            </div>
          </div>
        </div>
        <div style={styles.buttonWrap}>
          <div
            style={{
              ...styles.button,
              ...(!(numbers > 0) && styles.buttonDisable),
            }}
            onClick={() => this.handleOnModalClose()}
          >
            {numbers > 0
              ? formatMessage({ id: 'confirm' })
              : formatMessage({ id: 'soldOut' })}
          </div>
        </div>
      </div>
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
}

export default connect(
  (state, props) => {
    const {
      modal: { modalProps = {} },
      productDetailInfo,
    } = state;

    const { brandId } = props;

    const brandIdUsed = brandId;
    return {
      ...productDetailInfo.item,
      visible: false,
      brandId: brandIdUsed,
      groupon: false,
      isMaster: false,
      modalProps,
    };
  },
  {
    ...productDetailInfoActionCreators,
    ...modalActionCreators,
  },
)(ParamsSelectModal);

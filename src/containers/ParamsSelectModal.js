import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import { i18n, View } from '@src/API';

import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  MONETARY,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@src/common/constants';

import priceFormat from '@src/utils/priceFormat';
import CustomIcon from '@src/components/CustomIcon';
import * as modalActionCreators from '@src/common/actions/modal';
import * as productDetailInfoActionCreators from '@src/common/actions/productDetailInfo';
import { xOssProcess } from '@src/utils';

import classNames from 'classnames';

import styles from './ParamsSelectModal.less';

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
    const {
      propertiesArray,
      propertiesObject,
      propertiesIdsObject,
    } = this.props;

    return (
      <View>
        {propertiesArray.map(val => (
          <View key={val}>
            <View
              style={{
                paddingLeft: SIDEINTERVAL,
              }}
              className={styles.title}
            >
              {val}
            </View>
            <View
              style={{
                paddingLeft: SIDEINTERVAL,
              }}
              className={styles.properties}
            >
              {propertiesObject[val].map(val1 => (
                <View
                  style={{
                    marginRight: SIDEINTERVAL,
                    marginBottom: SIDEINTERVAL,
                    paddingLeft: WINDOW_WIDTH * 0.05,
                    paddingRight: WINDOW_WIDTH * 0.05,
                  }}
                  className={classNames(styles.propertiesItem, {
                    [styles.propertiesItemAcitve]:
                      propertiesIdsObject.indexOf(val1.id) !== -1,
                  })}
                  onClick={() => this.handleOnChangeProperties(val1.id)}
                  key={val1.value}
                >
                  {val1.value}
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
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

    return (
      <View className={styles.container}>
        <View
          style={{
            paddingTop: WINDOW_WIDTH * 0.03,
            paddingRight: WINDOW_WIDTH * 0.03,
          }}
          className={styles.paramClose}
        >
          <CustomIcon
            name="close"
            type="close"
            className={styles.paramCloseIcon}
            onClick={() => this.handleOnModalClose()}
          />
        </View>
        <View
          style={{
            paddingLeft: SIDEINTERVAL,
            paddingRight: SIDEINTERVAL,
          }}
          className={styles.paramInfo}
        >
          {imageUrls[0] && (
            <img
              alt=""
              style={{
                marginRight: SIDEINTERVAL,
              }}
              className={styles.paramImage}
              src={`${imageUrls[0].imageUrl}?${xOssProcess(
                IS_IOS,
                OSS_IMAGE_QUALITY,
              )}`}
            />
          )}
          <View>
            <View className={styles.paramPrice}>{`${priceFormat(
              price,
            )} ${MONETARY}`}</View>
            <View className={styles.paramHave}>
              {i18n.warehouse}: {numbers > 0 ? i18n.inStock : i18n.soldOut}
            </View>
          </View>
        </View>
        {this.renderPropertiesIds()}
        <View
          style={{
            paddingLeft: SIDEINTERVAL,
            paddingRight: SIDEINTERVAL,
          }}
          className={styles.paramNumber}
        >
          <View className={styles.paramNumberText}>{i18n.amount}</View>
          <View className={styles.paramNumberChange}>
            <View
              onClick={() =>
                this.handleOnPresschangeNumber(productDetailNumber - 1)
              }
            >
              <CustomIcon
                name="minus"
                type="minus"
                className={classNames(styles.paramNumberRemoveIcon, {
                  [styles.paramNumberIconDisable]: productDetailNumber === 1,
                })}
              />
            </View>
            <View className={styles.paramNumberTextInput}>
              {productDetailNumber}
            </View>
            <View
              onClick={() =>
                this.handleOnPresschangeNumber(productDetailNumber + 1)
              }
            >
              <CustomIcon
                name="plus"
                type="plus"
                className={classNames(styles.paramNumberAddIcon, {
                  [styles.paramNumberIconDisable]:
                    parseInt(productDetailNumber, 10) === numbers,
                })}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            paddingLeft: SIDEINTERVAL,
            paddingRight: SIDEINTERVAL,
            paddingBottom: SIDEINTERVAL * 2,
          }}
        >
          <View
            className={classNames(styles.button, {
              [styles.buttonDisable]: !(numbers > 0),
            })}
            onClick={() => this.handleOnModalClose()}
          >
            {numbers > 0 ? i18n.confirm : i18n.soldOut}
          </View>
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

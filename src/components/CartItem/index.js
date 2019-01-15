/* eslint-disable react/no-array-index-key */
import React from 'react';
import { i18n, View } from '@src/API';
import router from 'umi/lib/router';
import { connect } from 'react-redux';

import { RED_COLOR, PRIMARY_COLOR } from '@src/styles/variables';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  CARMAXNUMBER,
  MONETARY,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@src/common/constants';
import CustomIcon from '@src/components/CustomIcon';
import priceFormat from '@src/utils/priceFormat';

import * as cartActionCreators from '@src/common/actions/cart';
import { xOssProcess } from '@src/utils';
import { getLoginUser } from '@src/common/selectors';
// import { getCartTotalMoney } from '@src/common/selectors';

import styles from './index.less';
import renderCartItemLeftStyles from './renderCartItemLeft.less';
import renderCartItemRightStyles from './renderCartItemRight.less';

class CartItem extends React.Component {
  renderCartItemLeft = (id, selected) => {
    const { isEdit } = this.props;
    const onPressHandle = () => {
      const { cartSelectRequest } = this.props;
      cartSelectRequest(id, !selected);
    };

    return (
      <View
        style={{
          width: WINDOW_WIDTH * 0.13,
        }}
        className={renderCartItemLeftStyles.container}
        onClick={() => onPressHandle()}
      >
        {selected ? (
          <CustomIcon
            name="roundcheckfill"
            type="roundcheckfill"
            style={{
              color: isEdit ? RED_COLOR : PRIMARY_COLOR,
            }}
            className={renderCartItemLeftStyles.iconSelected}
          />
        ) : (
          <CustomIcon
            name="round"
            type="round"
            className={renderCartItemLeftStyles.icon}
          />
        )}
      </View>
    );
  };

  renderCartItemRight = (id, quantity, status) => {
    id = id.toString();
    quantity = quantity.toString();
    const onChangeTextHandle = text => {
      if (text < 1 || text > CARMAXNUMBER) return false;
      const { cartNumberRequest, authUser } = this.props;
      if (authUser) cartNumberRequest(authUser.result, id, text);
      return true;
    };

    return (
      <View
        style={{
          width: WINDOW_WIDTH * 0.12,
          paddingRight: SIDEINTERVAL,
        }}
        className={renderCartItemRightStyles.container}
      >
        <View>
          <View
            onClick={() => onChangeTextHandle(parseInt(quantity, 10) - 1, id)}
          >
            <CustomIcon
              name="minus"
              type="minus"
              style={{
                ...(quantity === '1' && { opacity: 0.5 }),
              }}
              className={renderCartItemRightStyles.removeIcon}
            />
          </View>
          <View className={renderCartItemRightStyles.quantity}>{quantity}</View>

          {/* <BYTextInput
            className={renderCartItemRightStyles.textInput}
            keyboardType="numeric"
            value={quantity}
            // onChangeText={(text) => onChangeTextHandle(text, id)}
            editable={false}
          /> */}
          <View
            onClick={() => onChangeTextHandle(parseInt(quantity, 10) + 1, id)}
          >
            <CustomIcon
              name="plus"
              type="plus"
              style={{
                ...(parseInt(quantity, 10) === CARMAXNUMBER && {
                  opacity: 0.5,
                }),
              }}
              className={renderCartItemRightStyles.addIcon}
            />
          </View>
        </View>
        <View
          style={{
            left: -15 - SIDEINTERVAL,
            transform: [{ rotate: '90deg' }],
            ...(status !== 1 || {
              display: 'flex',
            }),
          }}
          className={renderCartItemRightStyles.tips}
        >
          <View
            style={{
              ...renderCartItemRightStyles.tipsText,
              ...(status !== 1 || {
                display: 'flex',
              }),
            }}
          >
            {i18n.productShelves}
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {
      data,
      style,
      styleItem,
      styleItemOpacity,
      styleItemLeft,
      itemLeft,
      itemRight,
      cartNumberRequest,
      ...restProps
    } = this.props;
    const { items, products, details, isEdit } = data;

    return (
      <View style={style} className={styles.itemWrap} {...restProps}>
        {items &&
          items.map(val => (
            <View
              style={styleItem}
              className={styles.item}
              key={details[products[val].detail].iconUrl}
            >
              {this.renderCartItemLeft(
                val,
                isEdit ? products[val].selectedDel : products[val].selected,
              )}
              <View
                style={{
                  ...styleItemLeft,
                  width: WINDOW_WIDTH * 0.15,
                  paddingLeft: SIDEINTERVAL,
                }}
                className={styles.itemLeft}
                onClick={() =>
                  router.push(
                    `/ProductDetail?brandId=${
                      details[products[val].detail].brandId
                    }`,
                  )
                }
              >
                <img
                  alt=""
                  className={styles.itemImage}
                  src={`${details[products[val].detail].iconUrl}?${xOssProcess(
                    IS_IOS,
                    OSS_IMAGE_QUALITY,
                  )}`}
                />
              </View>
              <View
                style={{
                  width: WINDOW_WIDTH * 0.6,
                  paddingLeft: SIDEINTERVAL,
                  paddingRight: SIDEINTERVAL,
                }}
                className={styles.itemRight}
              >
                <View className={styles.itemTitle}>
                  {products[val].subject}
                </View>
                {/* <Text className={styles.itemPrice}>
                  {`${priceFormat(details[products[val].detail].price)} ${MONETARY}`}
                </Text> */}
                <View className={styles.itemRightRow3}>
                  <View className={styles.itemRightRow3Price}>
                    {`${priceFormat(
                      details[products[val].detail].price,
                    )} ${MONETARY}`}
                  </View>
                </View>
              </View>
              {this.renderCartItemRight(
                val,
                products[val].quantity,
                products[val].status,
              )}
            </View>
          ))}
      </View>
    );
  }
}

export default connect(
  (state, props) => {
    const { cart } = state;

    return {
      authUser: getLoginUser(state, props),
      isEdit: cart.isEdit,
    };
  },
  {
    ...cartActionCreators,
  },
)(CartItem);

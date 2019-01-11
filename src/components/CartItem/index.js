/* eslint-disable react/no-array-index-key */
import React from 'react';
import { i18n, View } from '@src/API';
import router from 'umi/lib/router';
import { connect } from 'react-redux';

import { BORDER_COLOR, RED_COLOR, PRIMARY_COLOR } from '@src/styles/variables';
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

const styles = {
  itemWrap: {
    backgroundColor: '#fff',
  },
  item: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    borderBottomColor: BORDER_COLOR,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    zIndex: 100,
  },
  disable: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.1)',
    zIndex: 999,
  },
  itemLeft: {
    display: 'flex',
    width: WINDOW_WIDTH * 0.15,
    alignItems: 'center',
    paddingLeft: SIDEINTERVAL,
    paddingTop: 18,
    paddingBottom: 18,
  },
  itemImage: {
    width: 60,
    height: 60,
    // backgroundColor: '#0f0',
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  itemRight: {
    width: WINDOW_WIDTH * 0.6,
    // flex: 1,
    paddingTop: 18,
    // paddingBottom: 18,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  itemTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    lineHeight: '18px',

    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  itemPrice: {
    fontSize: 11,
    color: '#999',
    marginBottom: 6,
  },
  itemRightRow3: {
    display: 'flex',
    flexDirection: 'row',
  },
  itemRightRow3Price: {
    fontSize: 14,
    color: RED_COLOR,
    marginRight: 9,
  },
  itemRightRow3Number: {
    fontSize: 11,
    color: '#666',
    paddingTop: 2,
  },
};

class CartItem extends React.Component {
  renderCartItemLeft = (id, selected) => {
    const { isEdit } = this.props;
    const stylesX = {
      container: {
        display: 'flex',
        width: WINDOW_WIDTH * 0.13,
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon: {
        fontSize: 20,
        color: '#666',
      },
      iconSelected: {
        fontSize: 20,
        color: isEdit ? RED_COLOR : PRIMARY_COLOR,
      },
    };

    const onPressHandle = () => {
      const { cartSelectRequest } = this.props;
      cartSelectRequest(id, !selected);
    };

    return (
      <View style={stylesX.container} onClick={() => onPressHandle()}>
        {selected ? (
          <CustomIcon
            name="roundcheckfill"
            type="roundcheckfill"
            style={stylesX.iconSelected}
          />
        ) : (
          <CustomIcon name="round" type="round" style={stylesX.icon} />
        )}
      </View>
    );
  };

  renderCartItemRight = (id, quantity, status) => {
    id = id.toString();
    quantity = quantity.toString();
    const stylesX = {
      container: {
        position: 'relative',
        width: WINDOW_WIDTH * 0.12,
        paddingRight: SIDEINTERVAL,
      },
      number: {
        // display: 'none',
      },
      addIcon: {
        height: 30,
        lineHeight: '30px',
        width: 30,
        textAlign: 'center',
        fontSize: 18,
        color: '#999',
        backgroundColor: '#f5f5f5',
        fontWeight: '900',
      },
      removeIcon: {
        height: 30,
        lineHeight: '30px',
        width: 30,
        textAlign: 'center',
        fontSize: 18,
        color: '#999',
        backgroundColor: '#f5f5f5',
        fontWeight: '900',
      },
      removeIconDisable: {
        opacity: 0.5,
      },
      textInput: {
        height: 30,
        width: 30,
        backgroundColor: '#ccc',
        textAlign: 'center',
        fontSize: 11,
        color: '#fff',
      },
      tips: {
        position: 'absolute',
        top: 30,
        left: -15 - SIDEINTERVAL,
        backgroundColor: RED_COLOR,
        transform: [{ rotate: '90deg' }],
        display: 'none',
      },
      tipsText: {
        height: 30,
        lineHeight: '30px',
        width: 90,
        textAlign: 'center',
        fontSize: 11,
        color: '#fff',
        display: 'none',
      },
      itemDisable: {
        display: 'flex',
      },
      quantity: {
        textAlign: 'center',
        width: 30,
        height: 35,
        lineHeight: '35px',
      },
    };

    const onChangeTextHandle = text => {
      if (text < 1 || text > CARMAXNUMBER) return false;
      const { cartNumberRequest, authUser } = this.props;
      if (authUser) cartNumberRequest(authUser.result, id, text);
      return true;
    };

    return (
      <View style={stylesX.container}>
        <View style={stylesX.number}>
          <View
            onClick={() => onChangeTextHandle(parseInt(quantity, 10) - 1, id)}
          >
            <CustomIcon
              name="minus"
              type="minus"
              style={{
                ...stylesX.removeIcon,
                ...(quantity === '1' && stylesX.removeIconDisable),
              }}
            />
          </View>
          <View style={stylesX.quantity}>{quantity}</View>

          {/* <BYTextInput
            style={stylesX.textInput}
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
                ...stylesX.addIcon,
                ...(parseInt(quantity, 10) === CARMAXNUMBER &&
                  stylesX.removeIconDisable),
              }}
            />
          </View>
        </View>
        <View
          style={{ ...stylesX.tips, ...(status !== 1 || styles.itemDisable) }}
        >
          <View
            style={{
              ...stylesX.tipsText,
              ...(status !== 1 || styles.itemDisable),
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
      <View style={{ ...styles.itemWrap, ...style }} {...restProps}>
        {items &&
          items.map(val => (
            <View
              style={{ ...styles.item, ...styleItem }}
              key={details[products[val].detail].iconUrl}
            >
              {/* {products[val].status !== 1 && (
                <TouchableOpacity style={styles.disable} activeOpacity={1} />
              )} */}
              {this.renderCartItemLeft(
                val,
                isEdit ? products[val].selectedDel : products[val].selected,
              )}
              <View
                style={{ ...styles.itemLeft, ...styleItemLeft }}
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
                  style={styles.itemImage}
                  src={`${details[products[val].detail].iconUrl}?${xOssProcess(
                    IS_IOS,
                    OSS_IMAGE_QUALITY,
                  )}`}
                />
              </View>
              <View style={styles.itemRight}>
                <View style={styles.itemTitle}>{products[val].subject}</View>
                {/* <Text style={styles.itemPrice}>
                  {`${priceFormat(details[products[val].detail].price)} ${MONETARY}`}
                </Text> */}
                <View style={styles.itemRightRow3}>
                  <View style={styles.itemRightRow3Price}>
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

/* eslint-disable react/no-array-index-key */
import React from 'react';
import { formatMessage } from 'umi/locale';

import { BORDER_COLOR, RED_COLOR, PRIMARY_COLOR } from '@/styles/variables';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  SCREENS,
  CARMAXNUMBER,
  OSS_IMAGE_QUALITY,
  MONETARY,
} from '@/common/constants';
import CustomIcon from '@/components/CustomIcon';
import priceFormat from '@/utils/priceFormat';

// const itemIntervalWidth = SIDEINTERVAL;
// const itemWidth = (WINDOW_WIDTH - itemIntervalWidth * 3) / 2;

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
  },
  itemRight: {
    flex: 1,
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
  // componentDidMount() {
  //   // const { cartNumberRequest, authUser } = this.props;
  //   // authUser && cartNumberRequest(authUser.result, 297, 4);
  // }

  renderCartItemLeft = (id, selected) => {
    const { isEdit } = this.props;
    const stylesX = {
      container: {
        display: 'flex',
        width: WINDOW_WIDTH * 0.134,
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
      <div style={stylesX.container} onClick={() => onPressHandle()}>
        {selected ? (
          <CustomIcon type="roundcheckfill" style={stylesX.iconSelected} />
        ) : (
          <CustomIcon type="round" style={stylesX.icon} />
        )}
      </div>
    );
  };

  renderCartItemRight = (id, quantity, status) => {
    id = id.toString();
    quantity = quantity.toString();
    const stylesX = {
      container: {
        position: 'relative',
        width: 30 + SIDEINTERVAL,
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
    };

    const onChangeTextHandle = text => {
      if (text < 1 || text > CARMAXNUMBER) return false;
      const { cartNumberRequest, authUser } = this.props;
      if (authUser) cartNumberRequest(authUser.result, id, text);
      return true;
    };

    return (
      <div style={stylesX.container}>
        <div style={stylesX.number}>
          <div
            onClick={() => onChangeTextHandle(parseInt(quantity, 10) - 1, id)}
          >
            <CustomIcon
              type="minus"
              style={{
                ...stylesX.removeIcon,
                ...(quantity === '1' && stylesX.removeIconDisable),
              }}
            />
          </div>
          <BYTextInput
            style={stylesX.textInput}
            keyboardType="numeric"
            value={quantity}
            // onChangeText={(text) => onChangeTextHandle(text, id)}
            editable={false}
          />
          <div
            onClick={() => onChangeTextHandle(parseInt(quantity, 10) + 1, id)}
          >
            <CustomIcon
              type="plus"
              style={{
                ...stylesX.addIcon,
                ...(parseInt(quantity, 10) === CARMAXNUMBER &&
                  stylesX.removeIconDisable),
              }}
            />
          </div>
        </div>
        <div
          style={{ ...stylesX.tips, ...(status !== 1 || styles.itemDisable) }}
        >
          <div
            style={{
              ...stylesX.tipsText,
              ...(status !== 1 || styles.itemDisable),
            }}
          >
            {formatMessage({ id: 'productShelves' })}
          </div>
        </div>
      </div>
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
      navigation: { navigate },
      ...restProps
    } = this.props;
    const { items, products, details, isEdit } = data;

    return (
      <div style={{ ...styles.itemWrap, ...style }} {...restProps}>
        {items &&
          items.map(val => (
            <div
              style={{ ...styles.item, ...styleItem }}
              key={details[products[val].detail].iconUrl}
              onClick={() =>
                navigate(SCREENS.ProductDetail, {
                  brandId: details[products[val].detail].brandId,
                })
              }
            >
              {/* {products[val].status !== 1 && (
                <TouchableOpacity style={styles.disable} activeOpacity={1} />
              )} */}
              {this.renderCartItemLeft(
                val,
                isEdit ? products[val].selectedDel : products[val].selected,
              )}
              <div style={{ ...styles.itemLeft, ...styleItemLeft }}>
                <img
                  alt=""
                  style={styles.itemImage}
                  src={`${
                    details[products[val].detail].iconUrl
                  }?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}`}
                />
              </div>
              <div style={styles.itemRight}>
                <div style={styles.itemTitle} numberOfLines={1}>
                  {products[val].subject}
                </div>
                {/* <Text style={styles.itemPrice}>
                  {`${priceFormat(details[products[val].detail].price)} ${MONETARY}`}
                </Text> */}
                <div style={styles.itemRightRow3}>
                  <div style={styles.itemRightRow3Price}>
                    {`${priceFormat(
                      details[products[val].detail].price,
                    )} ${MONETARY}`}
                  </div>
                </div>
              </div>
              {this.renderCartItemRight(
                val,
                products[val].quantity,
                products[val].status,
              )}
            </div>
          ))}
      </div>
    );
  }
}

export default CartItem;

// export default connectLocalization(
//   connect(
//     state => ({
//       authUser: state.login.user,
//       isEdit: state.cart.isEdit,
//     }),
//     {
//       ...cartActionCreators,
//     },
//   )(CartItem),
// );

import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import BYHeader from '@/components/BYHeader';
import { getAddressSelectedItem } from '@/common/selectors';
import router from 'umi/router';

import Loader from '@/components/Loader';
import SeparateBar from '@/components/SeparateBar';
import Address from '@/components/Address';
import ProductItem2 from '@/components/ProductItem2';
import NavBar2 from '@/components/NavBar2';
import * as addressActionCreators from '@/common/actions/address';
import * as getUserInfoByIdActionCreators from '@/common/actions/getUserInfoById';
import * as orderCreateActionCreators from '@/common/actions/orderCreate';
import * as couponSelectActionCreators from '@/common/actions/couponSelect';
import * as modalActionCreators from '@/common/actions/modal';
import { addEventListener, removeEventListener } from '@/utils';
import { SCREENS, SIDEINTERVAL, MONETARY } from '@/common/constants';
import { Modal } from 'antd-mobile';
import priceFormat from '@/utils/priceFormat';
import { BORDER_COLOR, RED_COLOR, PRIMARY_COLOR } from '@/styles/variables';

const styles = {
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
};

@connect(
  (state, props) => {
    const {
      address,
      getUserInfoById,
      // mergeGetDetail,
      orderCreate,
      productDetailInfo,
      couponSelect,
    } = state;
    const {
      location: { query = {} },
    } = props;
    const { groupon, mergeMasterInfo, isCart, products, adverstInfo } = query;
    // const {
    //   navigation: {
    //     state: {
    //       params: {
    //         groupon,
    //         mergeMasterInfo,
    //         isCart,
    //         products,
    //         adverstInfo,
    //         // adverstInfo,
    //       },
    //     },
    //   },
    // } = props;
    // const groupon = props.navigation.state.params.groupon;
    // const mergeMasterInfo = props.navigation.state.params.mergeMasterInfo;
    const detailItem = productDetailInfo.item;
    // const isCart = props.navigation.state.params.isCart;
    // const cartProducts = props.navigation.state.params.products;
    // const cartAdverstInfo = props.navigation.state.params.adverstInfo;
    return {
      couponSelectItem: couponSelect.item,
      groupon,
      mergeMasterInfo,
      isCart,
      cartProducts: products,
      cartAdverstInfo: adverstInfo,
      detailItem,
      orderCreate,
      addressSelectedItem: getAddressSelectedItem(state, props),
      addressItems: address.items,
      addressLoaded: address.loaded,
      addressSelectedId: address.addressSelectedId,
      funid: state.login.user ? state.login.user.result : null,
      isAuthUser: !!state.login.user,
      getUserInfoById,
      getUserInfoByIdLoaded: getUserInfoById.loaded,
      userType: getUserInfoById.item.userType || null,
    };
  },
  {
    ...addressActionCreators,
    ...getUserInfoByIdActionCreators,
    ...orderCreateActionCreators,
    ...couponSelectActionCreators,
    ...modalActionCreators,
  },
)
class OrderWrite extends React.Component {
  componentDidMount() {
    const { addressFetch, getUserInfoByIdFetch } = this.props;

    addressFetch();
    getUserInfoByIdFetch();

    addEventListener(SCREENS.OrderWrite, this.addEventListenerHandle);

    // this.orderWriteCallBack = DeviceEventEmitter.addListener(
    //   SCREENS.OrderWrite,
    //   ({ type = '', params = {} }) => {
    //     let resetAction = null;
    //     const { navigation } = this.props;
    //     switch (type) {
    //       case 'orderCreateSuccess':
    //         resetAction = NavigationActions.reset({
    //           index: 2,
    //           actions: [
    //             NavigationActions.navigate({ routeName: SCREENS.Index }),
    //             NavigationActions.navigate({
    //               routeName: SCREENS.OrderDetail,
    //               params,
    //             }),
    //             NavigationActions.navigate({ routeName: SCREENS.Pay, params }),
    //           ],
    //         });

    //         navigation.dispatch(resetAction);
    //         break;

    //       default:
    //         break;
    //     }
    //   },
    // );
  }

  componentWillUnmount() {
    removeEventListener(SCREENS.OrderWrite, this.addEventListenerHandle);
  }

  addEventListenerHandle = ({ type = '', params = {} }) => {
    // const resetAction = null;
    // const { navigation } = this.props;
    switch (type) {
      case 'orderCreateSuccess':
        router.push(`/Pay?params=${params}`);
        // resetAction = NavigationActions.reset({
        //   index: 2,
        //   actions: [
        //     NavigationActions.navigate({ routeName: SCREENS.Index }),
        //     NavigationActions.navigate({
        //       routeName: SCREENS.OrderDetail,
        //       params,
        //     }),
        //     NavigationActions.navigate({ routeName: SCREENS.Pay, params }),
        //   ],
        // });
        // navigation.dispatch(resetAction);
        break;

      default:
        break;
    }
  };

  handleOnPressAddress() {
    const {
      isAuthUser,
      navigation: { navigate },
    } = this.props;

    if (!isAuthUser) return router.push('/Login');

    router.push('/Address');
    return navigate(SCREENS.Address, { isSelect: true });
  }

  handleOnPressCoupon() {
    const {
      isCart,
      cartProducts,
      isAuthUser,
      detailItem,
      navigation: { navigate },
    } = this.props;

    if (!isAuthUser) return navigate(SCREENS.Login);

    let products; // 请求judgeVoucher接口所需参数

    if (isCart) {
      products = cartProducts;
    } else {
      products = [
        {
          id: detailItem.id,
          amount: detailItem.price * detailItem.productDetailNumber,
        },
      ];
    }

    return navigate(SCREENS.CouponSelect, {
      products: JSON.stringify(products),
    });
  }

  handleOnPressSubmit() {
    const {
      addressSelectedId,
      isAuthUser,
      detailItem,
      cartAdverstInfo,
      isCart,
      orderCreateFetch,
      navigation: { navigate },
      groupon,
    } = this.props;

    if (!isAuthUser) return navigate(SCREENS.Login);

    const getGoodsdetail = () => {
      if (isCart) {
        return cartAdverstInfo.map(val => {
          // val.number = val.number
          val.rechargeaccount = '';
          val.rechargecode = '';
          val.repaymentamount = 0;
          return {
            number: val.number,
            cartitemid: val.cartitemid,
            productid: val.productid,
            rechargeaccount: '',
            rechargecode: '',
            repaymentamount: 0,
          };
        });
      }
      return [
        {
          number: detailItem.productDetailNumber,
          cartitemid: 0,
          productid: detailItem.id,
          rechargeaccount: '',
          rechargecode: '',
          repaymentamount: 0,
        },
      ];
    };

    const getSubject = () => {
      let result = '';
      if (isCart) {
        result = cartAdverstInfo.map(val => val.name).join('_');
      } else {
        result = detailItem.name;
      }
      return result;
    };

    const getCoupondetail = () => {
      const {
        couponSelectItem,
        // couponSelectItem,
      } = this.props;

      if (!couponSelectItem.id) return '';
      return JSON.stringify({
        couponcard: couponSelectItem.cardno,
        couponpassword: couponSelectItem.pincode,
        couponbrandid: couponSelectItem.brandId,
        coupontypeid: couponSelectItem.typeId,
        couponproductid: couponSelectItem.productId,
        coupontype: couponSelectItem.voucherType,
        couponvalue: couponSelectItem.voucherValue,
      });
    };

    const getObject = () => {
      let result;
      if (groupon) {
        result = {
          screen: SCREENS.OrderWrite,
          ordertype: isCart ? '3' : '2',
          addrid: addressSelectedId.toString(),
          goodsdetail: '',
          mergedetail: JSON.stringify({
            mergeorderid: '',
            mergemasterid: '',
            mergename: '',
            mergepersonnum: '',
            mergeheadimage: '',
            mergedesc: '',
            mergeusername: '',
          }),
          coupondetail: getCoupondetail(),
          subject: getSubject(isCart),
        };
      } else {
        result = {
          screen: SCREENS.OrderWrite,
          ordertype: isCart ? '3' : '2',
          addrid: addressSelectedId.toString(),
          goodsdetail: JSON.stringify(getGoodsdetail()),
          mergedetail: '',
          coupondetail: getCoupondetail(),
          subject: getSubject(isCart),
        };
      }
      return result;
    };

    if (addressSelectedId === 0) {
      Modal.alert('', formatMessage({ id: 'pleaseSelectourShippingAddress' }), [
        { text: formatMessage({ id: 'confirm' }), style: 'default' },
      ]);
      return false;
    }

    return orderCreateFetch(getObject());
  }

  calcMoney() {
    const {
      isCart,
      cartAdverstInfo,
      detailItem: { price, productDetailNumber },
      couponSelectItem,
    } = this.props;
    let money = 0;

    if (isCart) {
      // money
      if (cartAdverstInfo.length === 1) {
        money = cartAdverstInfo[0].price * cartAdverstInfo[0].number;
      } else {
        money = cartAdverstInfo.reduce((a, b, index) => {
          let result;
          if (index === 1) {
            const aTotalMoney = a.price * a.number;
            const bTotalMoney = b.price * b.number;
            result = aTotalMoney + bTotalMoney;
          } else {
            const bTotalMoney = b.price * b.number;
            result = a + bTotalMoney;
          }
          return result;
        });
      }
    } else {
      money = productDetailNumber * price;
    }

    if (couponSelectItem.id) {
      if (couponSelectItem.voucherType === 0) {
        // 打折券
        money *= couponSelectItem.voucherValue * 0.01;
      } else {
        money -= couponSelectItem.voucherValue;
      }
    }

    return priceFormat(money);
  }

  renderBottom() {
    const stylesX = {
      nav: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: BORDER_COLOR,
      },
      navLeft: {
        flex: 2,
      },
      navLeftBottom: {
        color: RED_COLOR,
        fontSize: 18,
        paddingLeft: SIDEINTERVAL,
        fontWeight: '700',
        height: 50,
        lineHeight: 50,
      },
      navRight: {
        flex: 1,
        height: 50,
        lineHeight: 50,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: PRIMARY_COLOR,
      },
    };

    return (
      <div style={stylesX.nav}>
        <div style={stylesX.navLeft}>
          <div style={stylesX.navLeftBottom}>
            {`${this.calcMoney()} ${MONETARY}`}
          </div>
        </div>
        <div
          style={stylesX.navRight}
          onPress={() => this.handleOnPressSubmit()}
        >
          {formatMessage({ id: 'submitOrder' })}
        </div>
      </div>
    );
  }

  renderContent() {
    const {
      // navigation: { navigate },
      isCart,
      cartAdverstInfo,
      addressSelectedItem,
      detailItem,
      getUserInfoById,
      orderCreate,
      couponSelectItem,
      // openModal,
      addressLoaded,
      getUserInfoByIdLoaded,
    } = this.props;
    const adverstInfo = isCart
      ? cartAdverstInfo
      : [
          {
            brandId: detailItem.brandId,
            propertiesIds: detailItem.propertiesIds,
            imageUrl:
              detailItem.imageUrls[0] && detailItem.imageUrls[0].imageUrl,
            name: detailItem.name,
            price: detailItem.price,
            number: detailItem.productDetailNumber,
            isOnPress: false,
          },
        ];

    if (addressLoaded === false || getUserInfoByIdLoaded === false)
      return <Loader />;

    return (
      <div style={styles.container}>
        {(getUserInfoById.loading || orderCreate.loading) && <Loader />}
        <div>
          <Address
            addressSelectedItem={addressSelectedItem}
            onPress={() => this.handleOnPressAddress()}
          />
          <SeparateBar />
          <ProductItem2
            data={adverstInfo}
            stylePricePrice={{ color: '#666' }}
            isShowNumber
          />
          <SeparateBar />
          <NavBar2
            onPress={() => this.handleOnPressCoupon()}
            valueLeft={formatMessage({ id: 'useVoucher' })}
            valueMiddle={
              couponSelectItem.id
                ? couponSelectItem.voucherName
                : formatMessage({ id: 'canNotUseVoucher' })
            }
          />
        </div>
        {this.renderBottom()}
      </div>
    );
  }

  render() {
    return (
      <div style={styles.container}>
        <BYHeader title={formatMessage({ id: 'fillOrder' })} />
        {this.renderContent()}
      </div>
    );
  }
}

export default OrderWrite;

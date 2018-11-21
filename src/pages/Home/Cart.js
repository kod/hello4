import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';

import * as getMenuActionCreators from '@/common/actions/getMenu';
import BYHeader from '@/components/BYHeader';
import {
  WINDOW_HEIGHT,
  APPBAR_HEIGHT,
  STATUSBAR_HEIGHT,
  WINDOW_WIDTH,
  SIDEINTERVAL,
  MONETARY,
} from '@/common/constants';
import { BORDER_COLOR, PRIMARY_COLOR, RED_COLOR } from '@/styles/variables';
import CartItem from '@/components/CartItem';
import CustomIcon from '@/components/CustomIcon';
import priceFormat from '@/utils/priceFormat';
import EmptyState from '@/components/EmptyState';
import { getCartTotalMoney } from '@/common/selectors';

const ouhrigdfnjsoeijehrJpg =
  'https://oss.buyoo.vn/usercollect/1/20181101180309_67w.jpg';

@connect(
  (state, props) => {
    const { login, cart } = state;

    return {
      cart,
      totalMoney: getCartTotalMoney(state, props),
      isAuthUser: !!login.user,
      loading: cart.loading,
      allSelected: cart.allSelected,
      allSelectedDel: cart.allSelectedDel,
      isEdit: cart.isEdit,
    };
  },
  {
    ...getMenuActionCreators,
  },
)
class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getMenuFetch } = this.props;
    getMenuFetch();
  }

  renderHeaderTitle = () => {
    const { cart } = this.props;
    const stylesX = {
      container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingLeft: cart.items.length === 0 ? 0 : 60,
        // paddingRight: cart.items.length === 0 ? 25 : 0,
        height: '100%',
      },
      title: {
        fontSize: 16,
        color: '#333',
        marginRight: 5,
      },
    };

    return (
      <div style={stylesX.container}>
        <div style={stylesX.title}>{formatMessage({ id: 'cart' })}</div>
      </div>
    );
  };

  renderHeaderRight = () => {
    const stylesX = {
      headerRight: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      },
      headerRightText: {
        fontSize: 14,
        color: '#666',
        // height: '100%',
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      },
    };

    const {
      isEdit,
      cartEditRequest,
      cartEditInitRequest,
      cart: { items },
    } = this.props;

    const onPressHandle = () => {
      cartEditRequest();
      if (items.length !== 1 && isEdit) cartEditInitRequest();
    };

    return (
      <div style={stylesX.headerRight} onClick={() => onPressHandle()}>
        <div style={stylesX.headerRightText}>
          {isEdit
            ? formatMessage({ id: 'save' })
            : formatMessage({ id: 'edit' })}
        </div>
      </div>
    );
  };

  renderScrollViewRight() {
    const stylesX = {
      scrollViewRight: {
        width: WINDOW_WIDTH * 0.75,
      },
      main: {
        paddingTop: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
      },
    };

    const { items, itemsIndex } = this.props;

    return (
      <div style={stylesX.scrollViewRight}>
        <div style={stylesX.main}>
          {items.map(
            (val, key) =>
              itemsIndex === key && this.renderScrollViewRightItem(key),
          )}
        </div>
      </div>
    );
  }

  renderScrollViewRightItem(key) {
    const stylesX = {
      rightItemTitle: {
        fontSize: 11,
        color: '#ccc',
        textAlign: 'center',
        marginBottom: 15,
      },
      rightItemMain: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      },
      rightItemSubItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: (WINDOW_WIDTH * 0.74 - SIDEINTERVAL * 2) / 3,
        minHeight: (WINDOW_WIDTH * 0.74 - SIDEINTERVAL * 2) / 3,
        marginBottom: 25,
      },
      rightItemSubItemImage: {
        resizeMode: 'contain',
        width: (WINDOW_WIDTH * 0.75 - SIDEINTERVAL * 8) / 3,
        height: (WINDOW_WIDTH * 0.75 - SIDEINTERVAL * 8) / 3,
        marginBottom: 3,
      },
      rightItemSubItemText: {
        textAlign: 'center',
        fontSize: 11,
        color: '#666',
      },
    };

    const { itemsList, itemsClassfy } = this.props;

    return (
      <div style={stylesX.rightItem} key={key}>
        <div style={stylesX.rightItemTitle} />
        <div style={stylesX.rightItemMain}>
          {itemsList.length !== 0 &&
            itemsList[key].map(val1 =>
              val1.status === '1' ? (
                <div
                  style={stylesX.rightItemSubItem}
                  key={val1.image}
                  onClick={() => {
                    // navigate(SCREENS.CateList, {
                    //   parent_id: val1.parentId,
                    //   sub_classfy_id: val1.id,
                    // });
                  }}
                >
                  <img
                    alt=""
                    style={stylesX.rightItemSubItemImage}
                    src={`${val1.image}?x-oss-process=image/format,webp`}
                  />
                  <div style={stylesX.rightItemSubItemText}>{val1.name}</div>
                </div>
              ) : null,
            )}
        </div>
        <div style={stylesX.rightItemTitle}>
          {formatMessage({ id: 'brand' })}
        </div>
        <div style={stylesX.rightItemMain}>
          {itemsClassfy.length !== 0 &&
            itemsClassfy[key].map(val1 =>
              val1.status === '1' ? (
                <div
                  style={stylesX.rightItemSubItem}
                  key={val1.imageUrl}
                  onClick={() => {
                    // navigate(SCREENS.CateList, {
                    //   parent_id: val1.parentId,
                    //   classfy_id: val1.id,
                    // })
                  }}
                >
                  <img
                    alt=""
                    style={stylesX.rightItemSubItemImage}
                    src={`${val1.imageUrl}?x-oss-process=image/format,webp`}
                  />
                  <div style={stylesX.rightItemSubItemText}>{val1.name}</div>
                </div>
              ) : null,
            )}
        </div>
      </div>
    );
  }

  renderContent() {
    const stylesX = {
      content: {
        display: 'flex',
        height: WINDOW_HEIGHT - APPBAR_HEIGHT - STATUSBAR_HEIGHT - 1,
        flexDirection: 'row',
      },
      scrollViewLeft: {
        width: WINDOW_WIDTH * 0.25,
        height: WINDOW_HEIGHT - APPBAR_HEIGHT - STATUSBAR_HEIGHT - 55,
        borderRightColor: BORDER_COLOR,
        borderRightWidth: 1,
      },
      main: {},
      item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 15,
        paddingBottom: 15,
      },
      itemImage: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
      },
      itemText: {
        fontSize: 11,
        lineHeight: `${11 * 1.618}px`,
        color: '#333',
        textAlign: 'center',
      },
      itemActive: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 5,
        backgroundColor: PRIMARY_COLOR,
      },
    };

    const {
      items,
      getMenuIndexFetch,
      itemsIndex,
      // loading,
    } = this.props;

    return (
      <div style={stylesX.content}>
        <div style={stylesX.scrollViewLeft}>
          <div style={stylesX.main}>
            {items.map((val, key) => (
              <div
                style={stylesX.item}
                key={val.image}
                onClick={() => getMenuIndexFetch(key)}
              >
                <img
                  alt=""
                  style={stylesX.itemImage}
                  src={`${val.image}?x-oss-process=image/format,webp`}
                />

                <div style={stylesX.itemText}>{val.name}</div>

                {itemsIndex === key && <div style={stylesX.itemActive} />}
              </div>
            ))}
          </div>
        </div>
        {this.renderScrollViewRight()}
      </div>
    );
  }

  render() {
    const {
      cart,
      loading,
      allSelected,
      allSelectedDel,
      isEdit,
      navigation,
      totalMoney,
    } = this.props;

    const styles = {
      container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      itemWrap: {
        backgroundColor: '#fff',
      },
      item: {
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
        // width: WINDOW_WIDTH * 0.25,
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

    const isEmptyCart = cart.items.length === 0;
    return (
      <div style={styles.container}>
        <BYHeader
          headerTitle={this.renderHeaderTitle()}
          headerRight={!isEmptyCart && this.renderHeaderRight()}
          showBackButton={false}
        />
        {!isEmptyCart && (
          <div>
            <CartItem
              data={cart}
              navigation={navigation}
              styleItem={{
                marginBottom: 25,
                borderTopColor: BORDER_COLOR,
                borderTopWidth: 1,
              }}
              styleItemLeft={{
                paddingLeft: 0,
                paddingTop: 15,
                paddingBottom: 15,
              }}
            />
          </div>
        )}
        {!isEmptyCart && (
          <div style={styles.overview}>
            <div
              style={styles.overviewSelectAll}
              onClick={() => this.onPressSelectAllHandle()}
            >
              <div style={styles.overviewIconWrap}>
                {isEdit ? (
                  <CustomIcon
                    type={allSelectedDel ? 'roundcheckfill' : 'round'}
                    style={{
                      ...styles.overviewIcon,
                      ...(allSelectedDel && styles.overviewIconSelectedDel),
                    }}
                  />
                ) : (
                  <CustomIcon
                    type={allSelected ? 'roundcheckfill' : 'round'}
                    style={{
                      ...styles.overviewIcon,
                      ...(allSelected && styles.overviewIconSelected),
                    }}
                  />
                )}
              </div>
              <div style={styles.overviewSelect}>
                {formatMessage({ id: 'selectAll' })}
              </div>
            </div>
            <div style={styles.overviewPrice}>
              {!isEdit && `${priceFormat(totalMoney)} ${MONETARY}`}
            </div>
            <div
              style={styles.overviewSubmit}
              onClick={() => this.onPressSubmitHandle()}
            >
              <div
                style={{
                  ...styles.overviewSubmitText,
                  ...(isEdit && styles.overviewSubmitTextDel),
                }}
              >
                {isEdit
                  ? formatMessage({ id: 'delete' })
                  : formatMessage({ id: 'buy' })}
              </div>
            </div>
          </div>
        )}
        {!loading && isEmptyCart && (
          <EmptyState
            source={ouhrigdfnjsoeijehrJpg}
            text={formatMessage({ id: 'noData' })}
            styleText={{ marginBottom: 0 }}
          />
        )}
      </div>
    );
  }
}

export default Index;

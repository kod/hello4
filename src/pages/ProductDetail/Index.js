import React from 'react';
import { formatMessage } from 'umi/locale';

import CustomIcon from '@/components/CustomIcon';
import BYHeader from '@/components/BYHeader';
import { SIDEINTERVAL, WINDOW_HEIGHT, WINDOW_WIDTH } from '@/common/constants';
import { BORDER_COLOR, PRIMARY_COLOR, RED_COLOR } from '@/styles/variables';

class Index extends React.Component {
  renderHeaderRight = () => {
    const styles = {
      container: {
        paddingLeft: SIDEINTERVAL / 2,
        paddingRight: SIDEINTERVAL,
        paddingTop: 10,
        paddingBottom: 10,
      },
      icon: {
        fontSize: 16,
      },
    };
    return (
      <div style={styles.container}>
        <CustomIcon type="gengduo" style={styles.icon} />
      </div>
    );
  };

  render() {
    const { numbers, isCollection } = this.props;

    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        height: WINDOW_HEIGHT,
      },
      main: {
        flex: 10,
      },
      // container: {
      //   flex: 1,
      //   position: 'relative',
      // },
      operate: {
        display: 'flex',
        flexDirection: 'row',
        borderTopColor: BORDER_COLOR,
        borderTopWidth: 1,
        borderTopStyle: 'solid',
      },
      operateIcon: {
        display: 'flex',
        width: (WINDOW_WIDTH * 9) / 24,
        backgroundColor: '#fff',
        flexDirection: 'row',
      },
      operateIconItem: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      operateIconItemIcon: {
        fontSize: 16,
      },
      operateIconItemActive: {
        color: PRIMARY_COLOR,
      },
      favoriteItem: {
        fontSize: 18,
      },
      favoriteIconActive: {
        color: PRIMARY_COLOR,
      },
      operateIconItemText: {
        fontSize: 10,
      },
      operateLeft: {
        width: (WINDOW_WIDTH * 5) / 24,
        height: 49,
        lineHeight: `${10 * 1.618}px`,
        textAlign: 'center',
        fontSize: 10,
        paddingTop: 5,
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        color: '#fff',
        backgroundColor: '#81bbf9',
        flexWrap: 'wrap',
      },
      operateRight: {
        width: (WINDOW_WIDTH * 10) / 24,
        height: 49,
        lineHeight: `${49}px`,
        textAlign: 'center',
        fontSize: 14,
        color: '#fff',
        backgroundColor: PRIMARY_COLOR,
      },
      operateGroupLeft: {
        flex: 3,
        height: 49,
        paddingTop: 5,
        backgroundColor: '#fff',
        paddingLeft: SIDEINTERVAL,
      },
      operateGroupLeftOldPrice: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: '#999',
        fontSize: 12,
      },
      operateGroupLeftPrice: {
        color: RED_COLOR,
        fontSize: 16,
      },
      operateGroupRight: {
        flex: 2,
        height: 49,
        lineHeight: `${49}px`,
        textAlign: 'center',
        fontSize: 14,
        color: '#fff',
        backgroundColor: PRIMARY_COLOR,
      },
      disable: {
        opacity: 0.5,
      },
    };

    return (
      <div style={styles.container}>
        <BYHeader
          title={formatMessage({ id: 'details' })}
          // headerTitle={this.renderheaderTitle()}
          headerRight={this.renderHeaderRight()}
        />
        <div style={styles.main}>1</div>
        <div style={styles.operate}>
          <div style={styles.operateIcon}>
            <div
              style={styles.operateIconItem}
              onPress={() => this.handleToggleShare()}
            >
              <CustomIcon
                type="share"
                style={{
                  ...styles.operateIconItemIcon,
                  ...styles.operateIconItemActive,
                }}
              />
              <div
                style={{
                  ...styles.operateIconItemText,
                  ...styles.operateIconItemActive,
                }}
              >
                {formatMessage({ id: 'share' })}
              </div>
            </div>
            <div
              style={styles.operateIconItem}
              onPress={() => this.handleToggleCollection()}
            >
              {isCollection ? (
                <CustomIcon
                  type="heart-fill"
                  style={{
                    ...styles.favoriteItem,
                    ...styles.operateIconItemActive,
                  }}
                />
              ) : (
                <CustomIcon type="heart" style={styles.favoriteItem} />
              )}
              <div
                style={{
                  ...styles.operateIconItemText,
                  ...(isCollection && styles.operateIconItemActive),
                }}
              >
                {formatMessage({ id: 'collect' })}
              </div>
            </div>
            <div
              style={styles.operateIconItem}
              onPress={() => this.handleToggleService()}
            >
              <CustomIcon type="service" style={styles.operateIconItemIcon} />

              <div style={styles.operateIconItemText}>
                {formatMessage({ id: 'service' })}
              </div>
            </div>
          </div>
          <div
            style={styles.operateLeft}
            onPress={() => this.handleOnPressAddCart()}
          >
            {formatMessage({ id: 'addToCart' })}
          </div>
          <div
            style={{
              ...styles.operateRight,
              ...(!(numbers > 0) && styles.disable),
            }}
            onPress={() => this.handleOnPressBuy()}
          >
            {numbers > 0
              ? formatMessage({ id: 'buy' })
              : formatMessage({ id: 'soldOut' })}
          </div>
        </div>
      </div>
    );
  }
}

export default Index;

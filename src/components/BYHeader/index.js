/* eslint-disable react/no-array-index-key */
import React from 'react';
import router from 'umi/lib/router';

import { SIDEINTERVAL } from '@src/common/constants';
import CustomIcon from '@src/components/CustomIcon';
import { View, Text } from '@src/API';

import styles from './index.less';
import renderHeaderTitleStyles from './renderHeaderTitle.less';

class BYHeader extends React.PureComponent {
  static defaultProps = {
    onPressBackButton: null,
    showBackButton: true,
    headerTitle: null,
    headerRight: null,
  };

  handleOnPressBackButton = () => {
    const { onPressBackButton } = this.props;
    if (onPressBackButton) {
      onPressBackButton();
    } else {
      router.go(-1);
    }
  };

  renderHeaderLeft = () => <View />;

  renderHeaderTitle = () => {
    const { headerRight, styleTitle } = this.props;
    // const stylesX = {
    //   container: {
    //     display: 'flex',
    //     flex: 1,
    //     align-items: 'center',
    //     justify-content: 'center',
    //     padding-right: headerRight ? 0 : 40,
    //     flex-direction: row,
    //   },
    //   title: {
    //     font-size: 18,
    //     color: '#3F3F3F',
    //     // margin-right: 5,
    //   },
    // };

    const { title = '' } = this.props;

    return (
      <View
        style={{
          paddingRight: headerRight ? 0 : 40,
        }}
        className={renderHeaderTitleStyles.container}
      >
        <Text style={styleTitle} className={renderHeaderTitleStyles.title}>
          {title}
        </Text>
      </View>
    );
  };

  render() {
    const {
      styleContainer,
      styleBack,
      showBackButton,
      headerTitle,
      headerRight,
      headerLeft,
    } = this.props;

    return (
      <View style={styleContainer} className={styles.container}>
        <View className={styles.subContainer}>
          {showBackButton ? (
            <CustomIcon
              name="Back"
              type="Back"
              style={{
                ...styleBack,
                paddingLeft: SIDEINTERVAL,
                paddingRight: SIDEINTERVAL,
              }}
              className={styles.headerBack}
              onClick={() => this.handleOnPressBackButton()}
            />
          ) : (
            headerLeft || this.renderHeaderLeft()
          )}
          {headerTitle || this.renderHeaderTitle()}
          {headerRight}
        </View>
      </View>
    );
  }
}
export default BYHeader;

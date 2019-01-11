import React from 'react';
import { TouchableOpacity } from 'react-native';

const BYTouchable = ({ activeOpacity = 0.7, ...props }) => (
  // if (Platform.OS === 'android' && Platform.Version >= 21) {
  //   const { style, children, backgroundColor = '#ccc', ...otherProps } = props;
  //   return (
  //     <TouchableNativeFeedback
  //       delayPressIn={0}
  //       background={TouchableNativeFeedback.SelectableBackground()}
  //       // background={TouchableNativeFeedback.Ripple(backgroundColor, false)}
  //       // useForeground={TouchableNativeFeedback.canUseNativeForeground()}
  //       style={style}
  //       {...otherProps}
  //     >
  //       {children ? <View style={style}>{children}</View> : null}
  //     </TouchableNativeFeedback>
  //   );
  // }

  <TouchableOpacity activeOpacity={activeOpacity} {...props} />
);

export default BYTouchable;

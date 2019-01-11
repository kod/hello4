import React from 'react';

export default ({ children, onPress = () => {}, ...restProps }) => (
  <div onClick={onPress} {...restProps}>
    {children}
  </div>
);

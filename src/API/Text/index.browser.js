import React from 'react';

const Text = ({ children, ...restProps }) => (
  <div {...restProps}>{children}</div>
);
export default Text;

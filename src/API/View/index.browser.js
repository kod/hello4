import React from 'react';

const View = ({ children, ...restProps }) => (
  <div {...restProps}>{children}</div>
);
export default View;

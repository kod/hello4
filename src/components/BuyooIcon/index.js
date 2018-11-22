import React from 'react';
import styles from './index.less';

const CustomIcon = ({ children, ...restProps }) => {
  let innerNode;

  const svgBaseProps = {
    width: '1em',
    height: '1em',
    fill: 'currentColor',
    'aria-hidden': 'true',
    focusable: 'false',
  };
  if (children) {
    const innerSvgProps = {
      ...svgBaseProps,
    };
    innerNode = <svg {...innerSvgProps}>{children}</svg>;
  }
  return (
    <i {...restProps} className={styles.action}>
      {innerNode}
    </i>
  );
};

export default CustomIcon;

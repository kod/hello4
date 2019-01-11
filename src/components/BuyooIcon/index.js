import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

const CustomIcon = ({ children, className, ...restProps }) => {
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
    <i {...restProps} className={classNames(styles.action, className)}>
      {innerNode}
    </i>
  );
};

export default CustomIcon;

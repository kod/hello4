import React from 'react';
import { ICON_SCRIPTURL } from '@/common/constants';
import Icon from './index';

const customCache = new Set();

// class Iconfont extends React.Component {
//   displayName = 'Iconfont';

//   render() {

//     return (
//       <i {...restProps} className={styles.action}>
//         {innerNode}
//       </i>
//     );
//   }
// }

const create = ({ scriptUrl }) => {
  /**
   * DOM API required.
   * Make sure in browser environment.
   * The Custom Icon will create a <script/>
   * that loads SVG symbols and insert the SVG Element into the document body.
   */
  if (
    typeof document !== 'undefined' &&
    typeof window !== 'undefined' &&
    typeof document.createElement === 'function' &&
    typeof scriptUrl === 'string' &&
    scriptUrl.length &&
    !customCache.has(scriptUrl)
  ) {
    const script = document.createElement('script');
    script.setAttribute('src', scriptUrl);
    script.setAttribute('data-namespace', scriptUrl);
    customCache.add(scriptUrl);
    document.body.appendChild(script);
  }

  const Iconfont = ({ type, ...restProps }) => {
    /**
     * DOM API required.
     * Make sure in browser environment.
     * The Custom Icon will create a <script/>
     * that loads SVG symbols and insert the SVG Element into the document body.
     */
    if (
      typeof document !== 'undefined' &&
      typeof window !== 'undefined' &&
      typeof document.createElement === 'function' &&
      typeof scriptUrl === 'string' &&
      ICON_SCRIPTURL.length &&
      !customCache.has(ICON_SCRIPTURL)
    ) {
      const script = document.createElement('script');
      script.setAttribute('src', ICON_SCRIPTURL);
      script.setAttribute('data-namespace', ICON_SCRIPTURL);
      customCache.add(ICON_SCRIPTURL);
      document.body.appendChild(script);
    }

    let content = null;

    if (type) {
      content = <use xlinkHref={`#${type}`} />;
    }
    return <Icon {...restProps}>{content}</Icon>;
  };
  Iconfont.displayName = 'Iconfont';
  return Iconfont;
};

export default create;

export function addEventListener(type, listener) {
  // TODO
  // 输入值：变量类型，变量必填
  // 返回值：e.detail 统一返回类型，系统默认为null
  if (type) {
    window.addEventListener(type, e => {
      listener(e.detail);
    });
  } else {
    console.warn('type is undefined');
  }
}

export function removeEventListener(type, listener) {
  // TODO
  // 输入值：变量类型，变量必填
  window.removeEventListener(type, listener);
}

export function dispatchEvent(type, params = {}) {
  // TODO
  // 输入值：变量类型判断；type必填，params选填
  window.dispatchEvent(
    new CustomEvent(type, {
      detail: params,
    }),
  );
}

export const addressJoin = item =>
  item.address +
  (item.division4thName ? ', ' : '') +
  item.division4thName +
  (item.division3rdName ? ', ' : '') +
  item.division3rdName +
  (item.division2ndName ? ', ' : '') +
  item.division2ndName;

/* 防止重复提交
- 需在当前组件state里添加submitfreeze字段(boolean)
- 需在当前组件componentWillUnmount方法里添加clearTimeout(this.setTimeoutId);
*/
export const submitDuplicateFreeze = (submitfreeze, self, callback) => {
  if (submitfreeze === false) {
    callback();
    self.setState({ submitfreeze: true });
    self.setTimeoutId = setTimeout(() => {
      self.setState({ submitfreeze: false });
    }, 2000);
  }
};

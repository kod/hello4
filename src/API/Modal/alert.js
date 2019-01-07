import alert from './alert.browser';

export default (
  title = '',
  message = '',
  actions = [],
  cancelable = true,
  platform = 'ios',
) => alert({ title, message, actions, cancelable, platform });

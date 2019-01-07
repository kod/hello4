import alert from './alert.rn';

export default (
  title = '',
  message = '',
  actions = [],
  cancelable = true,
  platform = 'ios',
) => alert({ title, message, actions, cancelable, platform });

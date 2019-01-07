import { Modal } from 'antd-mobile';

export default ({ title, message, actions, platform }) => {
  Modal.alert(title, message, actions, platform);
};

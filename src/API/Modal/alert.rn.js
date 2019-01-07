import { Alert } from 'react-native';

export default ({ title, message, actions, cancelable }) => {
  Alert.alert(title, message, actions, { cancelable });
};

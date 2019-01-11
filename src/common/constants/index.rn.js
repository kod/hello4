import { Dimensions, Platform, StatusBar } from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const SIDEINTERVAL = Dimensions.get('window').width * 0.04;

export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 44;
export const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

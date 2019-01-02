import {
  WINDOW_HEIGHT,
  APPBAR_HEIGHT,
  STATUSBAR_HEIGHT,
} from '@src/common/constants';
import { HEADER_BACKGROUND_COLOR } from './variables';

const globalStyles = {
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: HEADER_BACKGROUND_COLOR,
  },
  headerWithoutShadow: {
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
    },
    elevation: 0,
    backgroundColor: HEADER_BACKGROUND_COLOR,
  },
  scrollView: {
    height: WINDOW_HEIGHT - APPBAR_HEIGHT - STATUSBAR_HEIGHT + 1,
    backgroundColor: '#fff',
  },
};

export default globalStyles;

import { createIconSet } from 'react-native-vector-icons';
import iconfont from './iconfont';

const fontFamily = 'iconfont';

const glyphMap = {};
const NAME_REGEX = /.(.*):before {/g;
const CODE_REGEX = /content: "(.*)";/g;
const nameResult = iconfont.match(NAME_REGEX).map(val => val.slice(1, -9));
const codeResult = iconfont
  .match(CODE_REGEX)
  .map(val => parseInt(val.slice(10, -2), 16));

nameResult.forEach((val, key) => {
  glyphMap[val] = codeResult[key];
});

export default createIconSet(glyphMap, fontFamily, `${fontFamily}.ttf`);

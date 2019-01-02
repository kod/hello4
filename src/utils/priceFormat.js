/**
 * 金额格式化
 * @Author   taichiyi
 * @DateTime 2017-11-10
 * @param    {number/string}   price      待格式化的金额
 * @param    {string}          separator  分隔符/分节符, 默认为"."
 * @param    {number}          interval   间隔位数, 默认为3
 * @return   {string}                     格式化后的金额
 */
const priceFormat = (price, separator, interval) => {
  price = (~~price).toString();
  separator = separator || '.';
  interval = interval || 3;
  let i;
  let result = '';
  const priceLength = price.length;
  const quotient = parseInt(priceLength / interval, 10);
  const module = priceLength % interval;

  if (quotient) {
    for (i = quotient; i > 0; i -= 1) {
      result =
        separator +
        price.slice(module + interval * (i - 1), module + interval * i) +
        result;
    }
    if (module === 0) {
      result = result.slice(1);
    } else {
      result = price.slice(0, module) + result;
    }
  } else {
    result = price;
  }
  return result;
};

export default priceFormat;

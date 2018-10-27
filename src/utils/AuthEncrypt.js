import md5 from "blueimp-md5";

export function signTypeMD5(appId, method, charset, Key, lowerCase) {
  let md5SigntypeStrig = '';
  // 默认大写
  if (lowerCase) {
    // md5SigntypeStrig += 'appid=' + appId;
    md5SigntypeStrig += `appid=${appId}`;
  } else {
    // md5SigntypeStrig += 'appId=' + appId;
    md5SigntypeStrig += `appId=${appId}`;
  }
  md5SigntypeStrig += `&method=${method}`;
  // md5SigntypeStrig += '&method=' + method;
  md5SigntypeStrig += `&charset=${charset}`;
  // md5SigntypeStrig += '&charset=' + charset;
  md5SigntypeStrig += Key;
  return md5(md5SigntypeStrig);
}

export function encryptMD5(params, Key) {
  let i;
  let md5EncryptStrig = '';
  for (i = 0; i < params.length; i += 1) {
    md5EncryptStrig += `&${params[i].key}=${params[i].value}`;
    // md5EncryptStrig += '&' + params[i].key + '=' + params[i].value;
  }
  md5EncryptStrig = md5EncryptStrig.slice(1);
  md5EncryptStrig += Key;
  return md5(md5EncryptStrig);
}

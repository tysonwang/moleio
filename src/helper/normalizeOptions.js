import normalizeHeaderName from './normalizeHeaderName.js'
import utils from '../utils/index.js'
function normalizeOptions(url, data = {}, options = {}, that) {
  if (utils.isPlainObject(url)) {
    options = url;
    url = options.url;
  }
  utils.merge(options, that.config);
  options.engine = new that.engine;
  options.baseURL = options.baseURL.trim()||"";
  // 数据合并的问题
  options.data = utils.merge(data, options.data)
  // method的处理
  options.method = options.method.toUpperCase();
  url = (url && url.trim()) || '';
  options.url = url;
  if(!options.url&& typeof document !==undefined&&!options.baseURL){
    options.url = location.href;
  }
  if(options.url.indexOf('http')!==0){
    let isAbsolute =options.url[0] ==='/';
    if(!options.baseURL&&isAbsolute){
      let arr = location.pathname.split('/')
      if(!arr[arr.length-1]){
        arr.pop();
      }
      options.baseURL = location.protocol+'//'+location.host+(isAbsolute?'':arr.join('/'));
    }
    if(options.baseURL[options.baseURL.length-1]!=='/'){
      options.baseURL+='/';
    }
    options.realUrl =options.baseURL+(isAbsolute? options.url.substring(1):options.url); 
  }else{
    options.realUrl = options.url
  }
  // header的处理
  options.headers = options.headers || {};
  normalizeHeaderName(options.headers, 'Content-Type');
  let type = 'Content-Type';
  for (let key in options.headers) {
    if (options.headers.hasOwnProperty(key)) {
      if (type !== key && type.toLocaleLowerCase === key) {
        options.headers[type] = options.headers[key];
        delete options.headers[key];
      }
    }
  }
  if (options.headerStrong) { // 如果要增强header的功能 
    const forbidden = ["Accept-Charset", 'Accept-Encoding', 'Access-Control-Request-Headers', 'Access-Control-Request-Method', 'Connection', 'Content-Length', 'Cookie', 'Cookie2', 'Date', 'DNT', 'Expect', 'Feature-Policy', 'Host', 'Keep-Alive', 'Origin', 'Proxy-', 'Sec-', 'Referer', 'TE', 'Trailer', 'Transfer-Encoding', 'Upgrade', 'Via']
    for(let key in options.headers){
      if (options.headers.hasOwnProperty(key)) {
        if(forbidden.includes(key)){
          delete options.headers[key]
        }
      }
    }
  }
  console.log('options',options)
  return Promise.resolve(options);
}

export default normalizeOptions;
import utils from './utils';
import adapter from './adapter';
class Handler {
  constructor(status) {
    const _resolve = Symbol('resolve');
    const _reject = Symbol('reject');
    this.use = function (successHandler, errorHandler) {
      this.successHandler = successHandler;
      this.errorHandler = errorHandler;

    }

    this[status ? '_lock' : 'lock'] = () => {
      this.interceptors.p = new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
      })
    }

    function _clear() {
      interceptor.p = resolve = reject = null;
  }

  utils.merge(interceptor, {
      lock() {
          if (!resolve) {
              interceptor.p = new Promise((_resolve, _reject) => {
                  resolve = _resolve
                  reject = _reject;
              })
          }
      },
      unlock() {
          if (resolve) {
              resolve()
              _clear();
          }
      },
      clear() {
          if (reject) {
              reject("cancel");
              _clear();
          }
      }

      
    this[status ? '_unlock' : 'unlock'] = () => {
if(_resovle){

}
    }
    this[status ? '_clear' : 'clear'] = () => {

    }
    this[status ? '_cancel' : 'cancel'] = () => {

    }
  }

{
  baseURL,  //请求的基地址
    body, //请求的参数
    headers, //自定义的请求头
    method, // 请求方法
    timeout, //本次请求的超时时间
    url, // 本次请求的地址
    withCredentials //跨域请求是否发送第三方cookie
}

{
  data, //服务器返回的数据
    engine, //请求使用的http engine(见下面文档),浏览器中为本次请求的XMLHttpRequest对象
    headers, //响应头信息
    request  //本次响应对应的请求信息
}
// --------------
{
  // `data` 由服务器提供的响应
  data: { },

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

    // `statusText` 来自服务器响应的 HTTP 状态信息
    statusText: 'OK',

      // `headers` 服务器响应的头
      headers: { },

  // `config` 是为请求提供的配置信息
  config: { },
  // 'request'
  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: { }
}
class initConfig {
  constructor() {
    return {
      url: '',
      method: 'GET',
      baseURL: '',

      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {},
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'brackets' })
      },
      data: {},
      timeout: 1000,
      withCredentials: false, // 默认的
      responseType: 'json', // 默认的
      parseJson: true,
      onUploadProgress: function (progressEvent) {
      },
      onDownloadProgress: function (progressEvent) {
      },
      maxContentLength: 2000,
    }
  }
}
class EngineAdapter {
  constructor(engine) {
    return engine || XMLHttpRequest;

  }
}
class Mole {
  constructor(engine) {
    this.config = new initConfig();
    this.interceptors.request = new Handler(false);
    this.interceptors.response = new Handler(true);
    this.engine = new EngineAdapter(engine);
    // extendsPlugin(this)
    // ['all', 'race'].forEach(item => {
    //   this[item] = (promises) => Promise[item](promises)
    // })
    // ["get", "post", "put", "patch", "head", "delete"].forEach(e => {
    //   Mole.prototype[e] = function (url, data, option) {
    //     return this.request(url, data, utils.merge({ method: e }, option))
    //   }
    // })
    // ["lock", "unlock", "clear", 'cancel'].forEach(e => {
    //   Mole.prototype[e] = function () {
    //     this.interceptors.request[e]();
    //   }
    // });
    // ['_lock', '_unlock', '_clear', '_cancel'].forEach(e => {
    //   Mole.prototype[e] = function () {
    //     this.interceptors.response[e]();
    //   }
    // })

    // this.spread = (callback) => {
    //   return function (arr) {
    //     return callback.apply(null, arr);
    //   }
    // }
    this.create = (engine) => {
      return new Mole(engine);
    }
  }

  request(url, data, options) {
    return new makeRequest(url, data, options, this);
  }
}

export default new Mole;

function normalizeOptions(url, data, options, config) {
  utils.merge(options, Object.assign({}, config)); //合并options
  options.data = data || {}
  options.method = options.method.toUpperCase();
  if (url instanceof Object) {
    options = url;
    url = options.url && options.url.trim() || '';
  }
  options.url = options.url && options.url.trim() || ''
  options.headers = options.headers || {};
  normalizeHeaderName(options.headers, 'Accept');
  normalizeHeaderName(options.headers, 'Content-Type');
  if (options.headerStrong) { // 如果要增强header的功能 
    ForbiddenHeaderName(options.headers, ["Accept-Charset", 'Accept-Encoding', 'Access-Control-Request-Headers', 'Access-Control-Request-Method', 'Connection', 'Content-Length', 'Cookie', 'Cookie2', 'Date', 'DNT', 'Expect', 'Feature-Policy', 'Host', 'Keep-Alive', 'Origin', 'Proxy-', 'Sec-', 'Referer', 'TE', 'Trailer', 'Transfer-Encoding', 'Upgrade', 'Via'])
  }
  return options;
}
function settle() { } //成功的处理方案
function reject() { } //失败的处理方案
function buildUrl(options) {
  let { url, baseURL } = options;
  if (!url && isBrowser && !baseURL) url = location.href;
  if (url.indexOf("http") !== 0) {
    let isAbsolute = url[0] === "/";
    if (!baseUrl && isBrowser) {
      let arr = location.pathname.split("/");
      arr.pop();
      baseUrl = location.protocol + "//" + location.host + (isAbsolute ? "" : arr.join("/"))
    }
    if (baseUrl[baseUrl.length - 1] !== "/") {
      baseUrl += "/"
    }
    url = baseUrl + (isAbsolute ? url.substr(1) : url)
    if (isBrowser) {
      let t = document.createElement("a");
      t.href = url;
      url = t.href;
    }
  }
  return url;
}
function emitEngine(options, interceptors, resolve, reject) {
  const contentType = 'application/x-www-form-urlencoded';
  const { data, engine, baseURL, params } = options;
  const originData = Object.assign({}, data);
  const baseUrl = baseURL || ''
  let url = buildUrl(options);
  const query = ["GET", "HEAD", "DELETE", "OPTION"].includes(options.method)
  data = utils.isObject(data) || {};
  params = utils.isObject(params) || {};
  data = Object.assign({}, data, params);
  let stringData = qs.stringify(data, { arrayFormat: 'brackets' })
  if (query) {
    url += url.includes('?') ? '?' : '&' + stringData;
  }
  engine.timeout = options.timeout;
  engine.withCredentials = options.withCredentials;
  engine.open(options.method, url);
  engine.responseType = options.responseType; // 这句话要放到open初始化请求调用之后
  engine.onreadystatechange = () => {
    // xmlHttp.responseText
    type = ['document json text ms-stream array-buffer']
    let responseData = !options.responseType || options.responseType === 'text' ? request.responseText : engine.response
    let headers = {};
    let items = (engine.getAllResponseHeaders() || "").split("\r\n");
    items.pop();
    items.forEach((e) => {
      if (!e) return;
      let key = e.split(":")[0]
      headers[key] = engine.getResponseHeader(key)
    })

    let data = { data: response, headers, options, status: engine.status, statusText: engine.statusText };
    if (engine.readyState == 4 && engine.status >= 200 && engine.status < 300 || engine.status == 304) {
      if (response.getResponseHeader('Content-Type').includes('json')) {
        responseData = JSON.parse(responseData);
      }
      settle(interceptors.response.successHandler, data, resolve, reject)
    } else {
      settle(interceptors.response.errorHandler, data, resolve, reject)
    }
  }
  if (options.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    data = stringData;
  }
  if (!(originData instanceof FormData) && isObject(originData)) {
    options.headers['Content-Type'] = 'application/json;charset=utf-8';
    data = JSON.stringify(originData)
  }
  for (let key in options.headers) {
    if (key === 'Content-Type' && originData instanceof FormData) {
      delete options.headers[key];
    }
    engine.setRequestHeader(key, options.headers[key])
  }
  engine.send(query ? null : data);
  engine.onerror = () => {
    settle(interceptors.response.errorHandler, {}, resolve, reject)
  }
  engine.ontimeout = () => {
    settle(interceptors.response.errorHandler, {}, resolve, reject)
  }
  engine.onabort = () => {
  }
}

function settle(handler, data, resolve, reject) {
  if ()
}
function makeRequest(url, data, options, instance) {
  return new Promise((resolve, reject) => {
    ifLock(interceptors.request.p, () => {
      const { engine, interceptors, config } = instance;
      options.engine = engine;
      realOptions = normalizeOptions(url, data, options, config);
      interceptors.request.successHandler
      if (interceptors.request.successHandler) {
        let resultOptions = interceptors.request.successHandler && (interceptors.request.successHandler.call() || realOptions) || realOptions;
        if (!isPromise(resultOptions)) {
          resultOptions = Promise.resolve(resultOptions)
        }
        resultOptions.then(o => {
          if (o === realOptions && o.cancel === false) {
            emitEngine(options, interceptors, resolve, reject)
          } else {
            resolve(o);
          }
        }, err => {
          reject(err)
        })
      }
    })
  })
}
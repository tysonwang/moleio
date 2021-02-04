import utils from './utils';
import adapter from './adapter';
class Handler {
  constructor(status) {
    this.use = function (successHandler, errorHandler) {
      this.successHandler = successHandler;
      this.errorHandler = errorHandler;
    }
    this[status ? '_lock' : 'lock'] = () => {

    }
    this[status ? '_unlock' : 'unlock'] = () => {

    }
    this[status ? '_clear' : 'clear'] = () => {

    }
    this[status ? '_cancel' : 'cancel'] = () => {

    }
  }
}
function onresult(handler, data, type) {
  enqueueIfLocked(responseInterceptor.p, function () {
    if (handler) {
      //如果失败，添加请求信息
      if (type) {
        data.request = options;
      }
      let ret = handler.call(responseInterceptor, data, Promise)
      data = ret === undefined ? data : ret;
    }
    if (!isPromise(data)) {
      data = Promise[type === 0 ? "resolve" : "reject"](data)
    }
    data.then(d => {
      resolve(d)
    }).catch((e) => {
      reject(e)
    })
  })
}
function makeRequest(url, data, options) {
  if (utils.isObject(url)) {
    options = url;
    url = utils.trim(options.url);
  }
  let baseUrl = utils.trim(options.baseURL || "");
  if (!url && isBrowser && !baseUrl) url = location.href;
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

      // Normalize the url which contains the ".." or ".", such as
      // "http://xx.com/aa/bb/../../xx" to "http://xx.com/xx" .
      let t = document.createElement("a");
      t.href = url;
      url = t.href;
    }
  }
  let responseType = utils.trim(options.responseType || "")
  let needQuery = ["GET", "HEAD", "DELETE", "OPTION"].indexOf(options.method) !== -1;
  let dataType = utils.type(data);
  let params = options.params || {};
  options = options || {};
  options.headers = options.headers || {};


  promise = new Promsie((resolve, reject) => {
    utils.lockQueue(this.interceptors.request.p, () => {
      utils.merge(options, this.config)
      let headers = options.headers;
      headers[contentType] = headers[contentType] || headers[contentTypeLowerCase] || "";
      delete headers[contentTypeLowerCase]
      options.body = data || options.body;
      url = utils.trim(url || "");
      options.method = options.method.toUpperCase();
      options.url = url;
      let ret = options;
      if (this.interceptors.request.successHandler) {
        ret = this.interceptors.request.successHandler.call(this.interceptors.request, options, Promise) || options;
      }
      if (!isPromise(ret)) {
        ret = Promise.resolve(ret)
      }
      ret.then((d) => {
        if (d === options) {
          makeRequest(d)
        } else {
          resolve(d)
        }
      }, (err) => {
        reject(err)
      })
    })
  })
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
function emitEngine(options) {
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
  engine.responseType = options.responseType;
  engine.open(options.method, url);
  engine.onreadystatechange = () => {
    // xmlhttp.responseText
    if(engine.readyState==4 && engine.status>=200&&engine.status<300||engine.status==304){
     settle(response,data , 0)
    }else{
      settle(response,data,1)
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
    engine.setRequestHeader(key,options.headers[key])
  }
  engine.send(query ? null : data);

  engine.onerror = () => {
settle(0)
  }
  engine.ontimeout = () => {
    settle(0)

  }
  engine.onabort = () => {
  }
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
            emitEngine(options)
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
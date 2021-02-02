import utils from './utils';
import adapter from './adapter';
function handler() {
  this.use = function (successHandler, errorHandler) {
    this.successHandler = successHandler;
    this.errorHandler = errorHandler;
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
class Mole {
  constructor(engine) {
    this.config = {
      url: '',
      method: 'GET',
      baseURL: '',
      transformRequest: [function (data) {
        return data;
      }],
      transformResponse: [function (data) {
        return data;
      }],
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      params: {
        ID: 12345
      },
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      },
      data: {
      },
      timeout: 1000,
      withCredentials: false, // 默认的
      adapter: function (config) {
      },
      auth: {
        username: 'janedoe',
        password: 's00pers3cret'
      },
      responseType: 'json', // 默认的
      xsrfCookieName: 'XSRF-TOKEN', // default
      xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的
      onUploadProgress: function (progressEvent) {
      },
      onDownloadProgress: function (progressEvent) {
      },
      maxContentLength: 2000,
      validateStatus: function (status) {
        return status >= 200 && status < 300; // 默认的
      },
      maxRedirects: 5, // 默认的
      // httpAgent: new http.Agent({ keepAlive: true }),
      // httpsAgent: new https.Agent({ keepAlive: true }),
      proxy: {
        host: '127.0.0.1',
        port: 9000,
        auth: {
          username: 'mikeymike',
          password: 'rapunz3l'
        }
      },
      cancelToken: true
    }

    this.interceptors.request = new handler();
    this.interceptors.response = new handler();
    this.engine = adapter(engine) || XMLHttpRequest;
    this.all = (promises) => Promise.all(promises)
    this.race = (promises) => Promise.race(promises)
    ["get", "post", "put", "patch", "head", "delete"].forEach(e => {
      Mole.prototype[e] = function (url, data, option) {
        return this.request(url, data, utils.merge({ method: e }, option))
      }
    })
    ["lock", "unlock", "clear"].forEach(e => {
      Mole.prototype[e] = function () {
        this.interceptors.request[e]();
      }
    });

    this.spread = (callback) => {
      return function (arr) {
        return callback.apply(null, arr);
      }
    }
    this.create = (engine) => {
      return new Mole(engine);
    }
  }

  request(url, data, options) {
    return new makeRequest(url, data, options);
  }
}

export default new Mole;


function makeRequest(url,data,options){
  options = normalizeOptions(url,data,options);
  queueIfLocked((this.interceptors.p,()=>{
options,
  })
}

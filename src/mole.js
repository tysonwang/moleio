import utils from './utils';
import adapter from './adapter';
class Handler {
  use(successHandler, errorHandler) {
    this.successHandler = successHandler;
    this.errorHandler = errorHandler;
  }
}

function makeRequest(url, data, options) {
  if (utils.isObject(url)) {
    options = url;
    url = options.url;
  }
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

    this.interceptors.request = new Handler();
    this.interceptors.response = new Handler();
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
    return new MakeRequest(url, data, options);
  }
}

export default new Mole;

// 888888888888888888
// import Mole from 'mole-io';
// Mole.request()
// Mole.get()
// Mole.create('wx');
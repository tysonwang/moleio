import utils from './utils';
import adapter from './utils/Adapter';
import Handler from './Handler'
import Config from './Config'
class Mole {
  constructor(engine) {
    this.config = new Config();
    this.interceptors.request = new Handler();
    this.interceptors.response = new Handler();
    this.engine = createEngine(engine)
    initFunc(Mole).call(this,Mole);
    ['all', 'race'].forEach(item => {
      Mole.prototype[item] = (promise) => Promsie['item'](promise);
    })
    ["get", "post", "put", "patch", "head", "delete"].forEach(e => {
      Mole.prototype[e] = function (url, data, option) {
        return this.request(url, data, utils.merge({ method: e }, option))
      }
    })
    ["lock", "unlock", "clear", 'cancel'].forEach(e => {
      Mole.prototype[e] = function () {
        this.interceptors[e]();
      }
    });
    this.create = (engine) => {
      return new Mole(engine);
    }
  }
  request(url, data, options) {
    return new MakeRequest(url, data, options, this);
  }
}

export default new Mole;


function makeRequest(url, data, options) {
  if (utils.isObject(url)) {
    options = url;
    url = options.url;
  }
  options = options || {};
  options.headers = options.headers || {};
  promise = new Promise((resolve, reject) => {
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
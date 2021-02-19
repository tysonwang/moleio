import InterceptorManager from './core/InterceptorManager.js' // 拦截器
import Engine from './core/Engine.js'  // ajax引擎
import dispatchRequest from './core/dispatchRequest.js' // 触发请求包装
import utils from './utils/index.js'; // 工具库
import initConfig from './core/InitConfig' // 请求配置
class Mole {
  constructor(engine) {
    this.config = new initConfig();
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    }
    this.engine = new Engine(engine);
    this.create = (engine) => {
      return new Mole(engine);
    }
    this.request = (url, data, options) => {
      options.engine = this.engine;
      utils.merge(options, this.config);
      return new dispatchRequest.call(this, url, data, options);
    }

    ["get", "post", "put", "patch", "head", "delete"].forEach(method => {
      Mole.prototype[method] = function (url, data, option) {
        return this.request(url, data, utils.merge({ method }, option))
      }
    });
    ['lock', 'cancel', 'unlock', 'clear'].forEach(func => {
      this[func] = (config) => {
        this.interceptors.request[func](config);
      }
    })
    this.all = (promises) => {
      return Promise.all(promises)
    }
    this.race = (promises) => {
      return Promise.race(promises)
    }
    this.settled =(promises)=>{
      return Promise.allSettled(promises)
    }
    this.spread = (callback) => {
      return function (arr) {
        return callback.apply(null, arr);
      }
    }
  }

}
export default new Mole;

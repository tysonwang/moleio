import Handler from './core/Handler.js'
import Engine from './core/Engine.js'
import makeRequest from './core/makeRequest.js'
import utils from './utils/index.js';
import initConfig from './core/InitConfig'
class Mole {
  constructor(engine) {
    this.config = new initConfig();
    this.interceptors.request = new Handler(true);
    this.interceptors.response = new Handler(false);
    this.engine = new Engine(engine);
    this.create = (engine) => {
      return new Mole(engine);
    }
    this.request = (url, data, options)=> {
      return new makeRequest(url, data, options, this);
    }

    ["get", "post", "put", "patch", "head", "delete"].forEach(e => {
      Mole.prototype[e] = function (url, data, option) {
        return this.request(url, data, utils.merge({ method: e }, option))
      }
    });
    ['lock', 'cancel', 'unlock', 'clear'].forEach(e => {
      this[item] = (url) => {
        this.interceptors.request[e](url);
      }
    })
  }
  
}
export default new Mole;

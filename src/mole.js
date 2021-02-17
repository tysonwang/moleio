import Handler from './core/handler.js'
import EngineAdapter from './core/engineAdapter.js'
import makeRequest from './core/makeRequest.js'
import utils from './utils/index.js';
class Mole {
  constructor(engine) {
    this.config = new initConfig();
    this.interceptors.request = new Handler(false);
    this.interceptors.response = new Handler(true);
    this.engine = new EngineAdapter(engine);
    this.create = (engine) => {
      return new Mole(engine);
    }
    
["get", "post", "put", "patch", "head", "delete"].forEach(e => {
  Mole.prototype[e] = function (url, data, option) {
      return this.request(url, data, utils.merge({method: e}, option))
  }
});
  }
  request(url, data, options) {
    return new makeRequest(url, data, options, this);
  }
}
export default new Mole;

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

// {
//   baseURL,  //请求的基地址
//     body, //请求的参数
//     headers, //自定义的请求头
//     method, // 请求方法
//     timeout, //本次请求的超时时间
//     url, // 本次请求的地址
//     withCredentials //跨域请求是否发送第三方cookie
// }

// {
//   data, //服务器返回的数据
//     engine, //请求使用的http engine(见下面文档),浏览器中为本次请求的XMLHttpRequest对象
//     headers, //响应头信息
//     request  //本次响应对应的请求信息
// }
// --------------
// {
//   // `data` 由服务器提供的响应
//   data: { },

//   // `status` 来自服务器响应的 HTTP 状态码
//   status: 200,

//     // `statusText` 来自服务器响应的 HTTP 状态信息
//     statusText: 'OK',

//       // `headers` 服务器响应的头
//       headers: { },

//   // `config` 是为请求提供的配置信息
//   config: { },
//   // 'request'
//   // `request` is the request that generated this response
//   // It is the last ClientRequest instance in node.js (in redirects)
//   // and an XMLHttpRequest instance the browser
//   request: { }
// }
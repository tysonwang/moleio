import qs from 'qs';
import utils from '../utils';
function emitEngine(options) {
  console.log('asdf',options)
  return new Promise((res, rej) => {
    let { data, engine, params,realUrl,url,baseURL} = options;
    let query = ["GET", "HEAD", "DELETE", "OPTION"].includes(options.method)
    let newData = Object.assign({},data);
    utils.merge(newData,params);
    let stringData = qs.stringify(newData, { arrayFormat: 'brackets' })
    if (query) {
      realUrl += realUrl.includes('?') ?  '?' : '&' + stringData;
    }
    engine.timeout = options.timeout;
    engine.withCredentials = options.withCredentials;
    console.log(engine.open)
    engine.open(options.method, realUrl, true);
    engine.responseType = options.responseType; // 这句话要放到open初始化请求调用之后
    engine.onreadystatechange = () => {
      // type = ['document', 'json', 'text', 'ms-stream', 'array-buffer']
      let responseData = !options.responseType || options.responseType === 'text' ? request.responseText : engine.response
      let headers = {};
      let items = (engine.getAllResponseHeaders() || "").split("\r\n");
      items.pop();
      items.forEach((e) => {
        if (!e) return;
        let key = e.split(":")[0]
        headers[key] = engine.getResponseHeader(key)
      })

      let body = {
        data: responseData,
        headers,
        options,
        status: engine.status,
        engine: engine,
        statusText: engine.statusText
      };
      if (engine.readyState == 4 && engine.status >= 200 && engine.status < 300 || engine.status == 304) {
        if (response.getResponseHeader('Content-Type').includes('json')) {
          responseData = JSON.parse(responseData);
        }
        res(body)
      } else {
        body.msg = body.statusText
        delete body.data;
        delete body.statusText;
        rej(body);
      }
    }
    let realData;
    if (options.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      realData = stringData;
    }
    if (!(data instanceof FormData) && utils.isObject(data)) {
      options.headers['Content-Type'] = 'application/json;charset=utf-8';
      realData = JSON.stringify(data)
    }
    for (let key in options.headers) {
      if (key === 'Content-Type' && data instanceof FormData) {
        delete options.headers[key];
      }
      engine.setRequestHeader(key, options.headers[key])
    }
    engine.send(query ? null : realData);
    engine.onerror = (e) => {
      rej({msg:e.msg||'Network Error',data:{},engine,options,status:engine.status})
    }
    engine.ontimeout = (e) => {
      rej({data:{},msg:`timeout ${engine.timeout}ms`,engine,options,status:engine.status})
    }
  //     // 貌似用不上这个了
  //   engine.onabort = () => {
  //     if (!engine) {
  //       return;
  //     }
  //     reject({msg:'Request aborted', options,data:{},engine});
  //     engine = null;
  //   }
  })
}

export default emitEngine;
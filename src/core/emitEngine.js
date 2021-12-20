import qs from 'qs';
import utils from '../utils';
function emitEngine(options) {

  return new Promise((res, rej) => {
    let { data, engine, params, realUrl, url, baseURL } = options;
    let query = ["GET", "HEAD", "DELETE", "OPTION"].includes(options.method)
    let newData = Object.assign({}, data);
    utils.merge(newData, params);
    let stringData = qs.stringify(newData, { arrayFormat: 'brackets' })
    if (query) {
      realUrl += (realUrl.includes('?') ? '&' : '?') + stringData;
    }
    try {
      engine.withCredentials = !!options.withCredentials;
      engine.timeout = options.timeout;

    } catch (error) {

    }
    engine.responseType = options.responseType; // 这句话要放到open初始化请求调用之后
    engine.onreadystatechange = () => {
      if (!engine || engine.readyState !== 4) {
        return;
      }
      // type = ['document', 'json', 'text', 'ms-stream', 'array-buffer']
      let responseData = !options.responseType || options.responseType === 'text' ? request.responseText : engine.response
      let headers = {};
      try {
        let items = (engine.getAllResponseHeaders() || "").split("\r\n");
        items.pop();
        items.forEach((e) => {
          if (!e) return;
          let key = e.split(":")[0]
          headers[key] = engine.getResponseHeader(key)
        })
      } catch (error) {

      }
      let body = {
        data: responseData,
        headers,
        options,
        status: engine.status,
        engine: engine,
        statusText: engine.statusText
      };
      if (engine.readyState == 4 && engine.status >= 200 && engine.status < 300 || engine.status == 304) {

        if (engine.getResponseHeader('Content-Type').includes('json') && !utils.isPlainObject(responseData)) {
          responseData = JSON.parse(responseData);
        }
        res(body)
      } else {
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
    engine.open(options.method, realUrl, true);

    for (let key in options.headers) {
      if (key === 'Content-Type' && data instanceof FormData) {
        delete options.headers[key];
      }
      try {
        engine.setRequestHeader(key, options.headers[key])
      } catch (error) {
      }
    }

    engine.onerror = (e) => {
      rej({ msg: e.msg || 'Network Error', data: {}, engine, options, status: engine.status })
    }
    engine.ontimeout = (e) => {
      rej({ data: {}, msg: `timeout ${engine.timeout}ms`, engine, options, status: engine.status })
    }

  })
}

export default emitEngine;
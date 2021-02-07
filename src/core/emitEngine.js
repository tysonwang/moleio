function emitEngine(options, interceptors, resolve, reject) {
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
    engine.open(options.method, url);
    engine.responseType = options.responseType; // 这句话要放到open初始化请求调用之后
    engine.onreadystatechange = () => {
      // xmlHttp.responseText
      type = ['document json text ms-stream array-buffer']
      let responseData = !options.responseType || options.responseType === 'text' ? request.responseText : engine.response
      let headers = {};
      let items = (engine.getAllResponseHeaders() || "").split("\r\n");
      items.pop();
      items.forEach((e) => {
        if (!e) return;
        let key = e.split(":")[0]
        headers[key] = engine.getResponseHeader(key)
      })
  
      let data = { data: response, headers, options, status: engine.status, statusText: engine.statusText };
      if (engine.readyState == 4 && engine.status >= 200 && engine.status < 300 || engine.status == 304) {
        if (response.getResponseHeader('Content-Type').includes('json')) {
          responseData = JSON.parse(responseData);
        }
        settle(interceptors.response.successHandler, data, resolve)
      } else {
        settle(interceptors.response.errorHandler, data, reject)
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
      engine.setRequestHeader(key, options.headers[key])
    }
    engine.send(query ? null : data);
    engine.onerror = () => {
      settle(interceptors.response.errorHandler, {},reject)
    }
    engine.ontimeout = () => {
      settle(interceptors.response.errorHandler, {},reject)
    }
    engine.onabort = () => {
      settle(interceptors.response.errorHandler, {},reject)
    }
  }
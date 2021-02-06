import normalizeHeaderName from './normalizeHeaderName.js'
function normalizeOptions(url, data, options, config) {
    utils.merge(options, Object.assign({}, config)); //合并options
    options.data = data || {}
    options.method = options.method.toUpperCase();
    if (url instanceof Object) {
      options = url;
      url = options.url && options.url.trim() || '';
    }
    options.url = options.url && options.url.trim() || ''
    options.headers = options.headers || {};
    normalizeHeaderName(options.headers, 'Accept');
    normalizeHeaderName(options.headers, 'Content-Type');
    if (options.headerStrong) { // 如果要增强header的功能 
      ForbiddenHeaderName(options.headers, ["Accept-Charset", 'Accept-Encoding', 'Access-Control-Request-Headers', 'Access-Control-Request-Method', 'Connection', 'Content-Length', 'Cookie', 'Cookie2', 'Date', 'DNT', 'Expect', 'Feature-Policy', 'Host', 'Keep-Alive', 'Origin', 'Proxy-', 'Sec-', 'Referer', 'TE', 'Trailer', 'Transfer-Encoding', 'Upgrade', 'Via'])
    }
    return options;
  }
export default function buildUrl(options) {
    let { url, baseURL } = options;
    if (!url && isBrowser && !baseURL) url = location.href;
    if (url.indexOf("http") !== 0) {
      let isAbsolute = url[0] === "/";
      if (!baseUrl && isBrowser) {
        let arr = location.pathname.split("/");
        arr.pop();
        baseUrl = location.protocol + "//" + location.host + (isAbsolute ? "" : arr.join("/"))
      }
      if (baseUrl[baseUrl.length - 1] !== "/") {
        baseUrl += "/"
      }
      url = baseUrl + (isAbsolute ? url.substr(1) : url)
      if (isBrowser) {
        let t = document.createElement("a");
        t.href = url;
        url = t.href;
      }
    }
    return url;
  }
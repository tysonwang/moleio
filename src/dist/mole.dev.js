"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = _interopRequireDefault(require("./utils"));

var _env = _interopRequireDefault(require("./env"));

var _Base2 = _interopRequireDefault(require("./Base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Mole =
/*#__PURE__*/
function (_Base) {
  _inherits(Mole, _Base);

  function Mole(engine) {
    _classCallCheck(this, Mole);

    return _possibleConstructorReturn(this, _getPrototypeOf(Mole).call(this, engine));
  }

  _createClass(Mole, [{
    key: "request",
    value: function request(url, data, options) {
      var _this = this;

      var engine = new this.engine();
      var contentType = "Content-Type";
      var contentTypeLowerCase = contentType.toLowerCase();
      var interceptors = this.interceptors;
      var requestInterceptor = interceptors.request;
      var responseInterceptor = interceptors.response;
      var requestInterceptorHandler = requestInterceptor.handler;
      promise = new Promise(function (resolve, reject) {
        if (_utils["default"].type(url) === 'object') {
          options = url;
          url = options.url;
        }

        options = options || {};
        options.headers = options.headers || {};

        function makeRequest(options) {
          data = options.body;
          url = options.url.trim();

          var baseUrl = _utils["default"].trim(options.baseUrl || "");

          if (!url && isBrowser && !baseUrl) url = location.href;

          if (url.indexOf("http") !== 0) {
            var isAbsolute = url[0] === "/";

            if (!baseUrl && isBrowser) {
              var arr = location.pathname.split("/");
              arr.pop();
              baseUrl = location.protocol + "//" + location.host + (isAbsolute ? "" : arr.join("/"));
            }

            if (baseUrl[baseUrl.length - 1] !== "/") {
              baseUrl += "/";
            }

            url = baseUrl + (isAbsolute ? url.substr(1) : url);

            if (isBrowser) {
              var t = document.createElement("a");
              t.href = url;
              url = t.href;
            }
          }

          var responseType = _utils["default"].trim(options.responseType || "");

          var needQuery = ["GET", "HEAD", "DELETE", "OPTION"].indexOf(options.method) !== -1;

          var dataType = _utils["default"].type(data);

          var params = options.params || {}; // merge url params when the method is "GET" (data is object)

          if (needQuery && dataType === "object") {
            params = _utils["default"].merge(data, params);
          } // encode params to String


          params = _utils["default"].formatParams(params); // save url params

          var _params = [];

          if (params) {
            _params.push(params);
          } // Add data to url params when the method is "GET" (data is String)


          if (needQuery && data && dataType === "string") {
            _params.push(data);
          } // make the final url


          if (_params.length > 0) {
            url += (url.indexOf("?") === -1 ? "?" : "&") + _params.join("&");
          }

          engine.open(options.method, url);

          try {
            engine.withCredentials = !!options.withCredentials;
            engine.timeout = options.timeout || 0;

            if (responseType !== "stream") {
              engine.responseType = responseType;
            }
          } catch (e) {}

          var customContentType = options.headers[contentType] || options.headers[contentTypeLowerCase];

          if (_utils["default"].trim((customContentType || "").toLowerCase()) === 'application/x-www-form-urlencoded') {
            data = _utils["default"].formatParams(data);
          } else if (!_utils["default"].isFormData(data) && ["object", "array"].indexOf(_utils["default"].type(data)) !== -1) {
            _contentType = 'application/json;charset=utf-8';
            data = JSON.stringify(data);
          }

          if (!(customContentType || needQuery)) {
            options.headers[contentType] = 'application/x-www-form-urlencoded';
          }

          for (var k in options.headers) {
            if (k === contentType && _utils["default"].isFormData(data)) {
              // Delete the content-type, Let the browser set it
              delete options.headers[k];
            } else {
              try {
                engine.setRequestHeader(k, options.headers[k]);
              } catch (e) {}
            }
          }

          function onresult(handler, data, type) {
            enqueueIfLocked(responseInterceptor.p, function () {
              if (handler) {
                //如果失败，添加请求信息
                if (type) {
                  data.request = options;
                }

                var ret = handler.call(responseInterceptor, data, Promise);
                data = ret === undefined ? data : ret;
              }

              if (!isPromise(data)) {
                data = Promise[type === 0 ? "resolve" : "reject"](data);
              }

              data.then(function (d) {
                resolve(d);
              })["catch"](function (e) {
                reject(e);
              });
            });
          }

          function onerror(e) {
            e.engine = engine;
            onresult(responseInterceptor.onerror, e, -1);
          }

          function Err(msg, status) {
            this.message = msg;
            this.status = status;
          }

          engine.onload = function () {
            try {
              // The xhr of IE9 has not response field
              var response = engine.response || engine.responseText;

              if (response && options.parseJson && (engine.getResponseHeader(contentType) || "").indexOf("json") !== -1 // Some third engine implementation may transform the response text to json object automatically,
              // so we should test the type of response before transforming it
              && !_utils["default"].isObject(response)) {
                response = JSON.parse(response);
              }

              var headers = engine.responseHeaders; // In browser

              if (!headers) {
                headers = {};
                var items = (engine.getAllResponseHeaders() || "").split("\r\n");
                items.pop();
                items.forEach(function (e) {
                  if (!e) return;
                  var key = e.split(":")[0];
                  headers[key] = engine.getResponseHeader(key);
                });
              }

              var status = engine.status;
              var statusText = engine.statusText;
              var _data = {
                data: response,
                headers: headers,
                status: status,
                statusText: statusText
              }; // The _response filed of engine is set in  adapter which be called in engine-wrapper.js

              _utils["default"].merge(_data, engine._response);

              if (status >= 200 && status < 300 || status === 304) {
                _data.engine = engine;
                _data.request = options;
                onresult(responseInterceptor.handler, _data, 0);
              } else {
                var e = new Err(statusText, status);
                e.response = _data;
                onerror(e);
              }
            } catch (e) {
              onerror(new Err(e.msg, engine.status));
            }
          };

          engine.onerror = function (e) {
            onerror(new Err(e.msg || "Network Error", 0));
          };

          engine.ontimeout = function () {
            onerror(new Err("timeout [ ".concat(engine.timeout, "ms ]"), 1));
          };

          engine._options = options;
          setTimeout(function () {
            engine.send(needQuery ? null : data);
          }, 0);
        }

        enqueueIfLocked(requestInterceptor.p, function () {
          _utils["default"].merge(options, JSON.parse(JSON.stringify(_this.config)));

          var headers = options.headers;
          headers[contentType] = headers[contentType] || headers[contentTypeLowerCase] || "";
          delete headers[contentTypeLowerCase];
          options.body = data || options.body;
          url = _utils["default"].trim(url || "");
          options.method = options.method.toUpperCase();
          options.url = url;
          var ret = options;

          if (requestInterceptorHandler) {
            ret = requestInterceptorHandler.call(requestInterceptor, options, Promise) || options;
          }

          if (!isPromise(ret)) {
            ret = Promise.resolve(ret);
          }

          ret.then(function (d) {
            //if options continue
            if (d === options) {
              makeRequest(d);
            } else {
              resolve(d);
            }
          }, function (err) {
            reject(err);
          });
        });
      });
      promise.engine = engine;
      return promise;
    }
  }, {
    key: "all",
    value: function all(promises) {
      return Promise.all(promises);
    }
  }, {
    key: "race",
    value: function race() {
      return Promise.race(promises);
    }
  }]);

  return Mole;
}(_Base2["default"]);

['GET', 'POST', 'PUT', 'DELETE'].forEach(function (item) {
  Mole.prototype[item] = function (_ref) {
    var url = _ref.url,
        data = _ref.data,
        params = _ref.params,
        options = _ref.options;
    return this.request(options).then(function (data) {
      return [null, data];
    })["catch"](function (err) {
      return [err, null];
    });
  };
});
var _default = Mole;
exports["default"] = _default;